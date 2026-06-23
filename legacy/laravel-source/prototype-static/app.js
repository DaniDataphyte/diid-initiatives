import {
  aggregateCoverage,
  barriers,
  countries,
  drivers,
  gaps,
  methodNotes,
  patterns,
  priorities,
  recommendations,
  statusColors,
  timelineEvents,
} from "./data.js";

const sectionLinks = Array.from(document.querySelectorAll(".section-nav a"));
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const statusFilter = document.querySelector("#statusFilter");
const regionFilter = document.querySelector("#regionFilter");
const actorFilter = document.querySelector("#actorFilter");
const resetFiltersButton = document.querySelector("#resetFilters");
const markerLayer = document.querySelector("#markerLayer");
const legend = document.querySelector("#legend");
const featuredCount = document.querySelector("#featuredCount");
const visibleCount = document.querySelector("#visibleCount");
const drawerEmpty = document.querySelector("#drawerEmpty");
const drawerContent = document.querySelector("#drawerContent");
const drawerCountry = document.querySelector("#drawerCountry");
const drawerRegion = document.querySelector("#drawerRegion");
const drawerStatus = document.querySelector("#drawerStatus");
const drawerSummary = document.querySelector("#drawerSummary");
const drawerMeta = document.querySelector("#drawerMeta");
const drawerFlags = document.querySelector("#drawerFlags");
const drawerInstruments = document.querySelector("#drawerInstruments");
const drawerOpportunity = document.querySelector("#drawerOpportunity");
const drawerEvidence = document.querySelector("#drawerEvidence");
const coverageChart = document.querySelector("#coverageChart");
const timelineChart = document.querySelector("#timelineChart");
const patternGrid = document.querySelector("#patternGrid");
const gapAccordion = document.querySelector("#gapAccordion");
const driversList = document.querySelector("#driversList");
const barriersList = document.querySelector("#barriersList");
const recommendationTabs = document.querySelector("#recommendationTabs");
const recommendationPanel = document.querySelector("#recommendationPanel");
const priorityMatrix = document.querySelector("#priorityMatrix");
const priorityInspectorTitle = document.querySelector("#priorityTitle");
const priorityInspectorBody = document.querySelector("#priorityBody");
const methodAccordion = document.querySelector("#methodAccordion");

const statusLabels = {
  binding: "Binding COP instrument",
  draft: "Draft pathway",
  strategy: "Strategy or guidelines only",
  general: "General legal coverage",
  none: "No identifiable framework",
};

const currentFilters = {
  status: "All statuses",
  region: "All regions",
  actor: "All actors",
};

let currentCountry = null;

function uniqueValues(list, key) {
  return Array.from(new Set(list.map((item) => item[key]))).sort();
}

function createOption(label) {
  const option = document.createElement("option");
  option.value = label;
  option.textContent = label;
  return option;
}

function populateFilters() {
  const statuses = ["All statuses", ...Object.values(statusLabels)];
  const regions = ["All regions", ...uniqueValues(countries, "region")];
  const actors = ["All actors", ...uniqueValues(countries, "actor")];

  statuses.forEach((label) => statusFilter.append(createOption(label)));
  regions.forEach((label) => regionFilter.append(createOption(label)));
  actors.forEach((label) => actorFilter.append(createOption(label)));
}

function renderLegend() {
  legend.innerHTML = "";
  Object.entries(statusLabels).forEach(([key, label]) => {
    const item = document.createElement("div");
    item.className = "legend__item";
    item.innerHTML = `
      <span class="legend__swatch" style="background:${statusColors[key]}"></span>
      <span>${label}</span>
    `;
    legend.append(item);
  });
}

function passesFilters(country) {
  const statusLabel = statusLabels[country.status];
  const statusMatch =
    currentFilters.status === "All statuses" ||
    currentFilters.status === statusLabel;
  const regionMatch =
    currentFilters.region === "All regions" ||
    currentFilters.region === country.region;
  const actorMatch =
    currentFilters.actor === "All actors" ||
    currentFilters.actor === country.actor;

  return statusMatch && regionMatch && actorMatch;
}

function getVisibleCountries() {
  return countries.filter(passesFilters);
}

function renderMarkers() {
  const visible = getVisibleCountries();
  markerLayer.innerHTML = "";
  featuredCount.textContent = String(countries.length);
  visibleCount.textContent = String(visible.length);

  countries.forEach((country) => {
    const isVisible = visible.includes(country);
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("marker-group");
    if (!isVisible) group.classList.add("is-muted");
    if (currentCountry?.name === country.name) group.classList.add("is-selected");

    const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    halo.setAttribute("cx", country.x);
    halo.setAttribute("cy", country.y);
    halo.setAttribute("r", 18);
    halo.setAttribute("class", "marker-halo");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", country.x);
    circle.setAttribute("cy", country.y);
    circle.setAttribute("r", 8);
    circle.setAttribute("fill", statusColors[country.status]);
    circle.setAttribute("class", "marker-dot");

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", country.x + 14);
    label.setAttribute("y", country.y + 4);
    label.setAttribute("class", "marker-label");
    label.textContent = country.name;

    group.append(halo, circle, label);
    group.addEventListener("click", () => {
      currentCountry = country;
      renderMarkers();
      renderDrawer(country);
    });
    markerLayer.append(group);
  });

  if (currentCountry && !visible.includes(currentCountry)) {
    currentCountry = null;
    renderDrawer(null);
  }
}

function renderDrawer(country) {
  if (!country) {
    drawerEmpty.classList.remove("hidden");
    drawerContent.classList.add("hidden");
    return;
  }

  drawerEmpty.classList.add("hidden");
  drawerContent.classList.remove("hidden");
  drawerCountry.textContent = country.name;
  drawerRegion.textContent = country.region;
  drawerStatus.textContent = statusLabels[country.status];
  drawerStatus.style.backgroundColor = statusColors[country.status];
  drawerSummary.textContent = country.summary;
  drawerMeta.innerHTML = `
    <div class="meta-chip">${country.actor}</div>
    <div class="meta-chip">${statusLabels[country.status]}</div>
  `;
  drawerFlags.innerHTML = country.flags
    .map((flag) => `<span class="flag-chip">${flag}</span>`)
    .join("");
  drawerInstruments.innerHTML = country.instruments
    .map((instrument) => `<li>${instrument}</li>`)
    .join("");
  drawerOpportunity.textContent = country.opportunity;
  drawerEvidence.textContent = country.evidence;
}

function renderCoverageChart() {
  const total = aggregateCoverage.reduce((sum, item) => sum + item.count, 0);
  const segments = aggregateCoverage
    .map((item) => {
      const width = (item.count / total) * 100;
      return `
        <div class="coverage-segment" style="width:${width}%;background:${statusColors[item.key]}">
          <span>${item.count}</span>
        </div>
      `;
    })
    .join("");

  const labels = aggregateCoverage
    .map(
      (item) => `
        <div class="coverage-label">
          <div class="coverage-label__top">
            <span class="legend__swatch" style="background:${statusColors[item.key]}"></span>
            <strong>${item.label}</strong>
            <span>${item.count}</span>
          </div>
          <p>${item.detail}</p>
        </div>
      `,
    )
    .join("");

  coverageChart.innerHTML = `
    <div class="coverage-bar">${segments}</div>
    <div class="coverage-labels">${labels}</div>
  `;
}

function renderTimeline() {
  timelineChart.innerHTML = timelineEvents
    .map(
      (event) => `
        <div class="timeline-event">
          <span class="timeline-event__dot" style="background:${statusColors[event.accent]}"></span>
          <div>
            <strong>${event.year}</strong>
            <p>${event.title}</p>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderPatterns() {
  patternGrid.innerHTML = patterns
    .map(
      (pattern, index) => `
        <article class="pattern-card pattern-card--${index + 1}">
          <p class="eyebrow">${pattern.eyebrow}</p>
          <h3>${pattern.title}</h3>
          <p>${pattern.body}</p>
        </article>
      `,
    )
    .join("");
}

function createSeverityScale(level) {
  return `
    <div class="severity-scale" aria-label="Severity level ${level} of 5">
      ${Array.from({ length: 5 }, (_, index) => {
        const active = index < level ? "is-active" : "";
        return `<span class="${active}"></span>`;
      }).join("")}
    </div>
  `;
}

function renderAccordion(root, items, kind = "single") {
  root.innerHTML = items
    .map(
      (item, index) => `
        <article class="accordion-item ${index === 0 ? "is-open" : ""}">
          <button class="accordion-trigger" type="button">
            <span>${item.title}</span>
            ${item.severity ? createSeverityScale(item.severity) : '<span class="accordion-plus">+</span>'}
          </button>
          <div class="accordion-panel">
            <div class="accordion-panel__content">
              ${
                item.body
                  ? `<p><strong>Why this matters.</strong> ${item.body}</p>`
                  : ""
              }
              ${item.where ? `<p><strong>Where it appears.</strong> ${item.where}</p>` : ""}
              ${item.test ? `<p><strong>What stronger policy requires.</strong> ${item.test}</p>` : ""}
              ${!item.where && !item.test ? `<p>${item.body}</p>` : ""}
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  root.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      if (kind === "single") {
        root
          .querySelectorAll(".accordion-item")
          .forEach((other) => other.classList.remove("is-open"));
      }
      item.classList.toggle("is-open", !isOpen);
    });
  });
}

function renderStacks() {
  driversList.innerHTML = drivers
    .map(
      (item) => `
        <article class="stack-card">
          <h4>${item.title}</h4>
          <p>${item.body}</p>
        </article>
      `,
    )
    .join("");

  barriersList.innerHTML = barriers
    .map(
      (item) => `
        <article class="stack-card">
          <h4>${item.title}</h4>
          <p>${item.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderRecommendationPanel(id) {
  const active = recommendations.find((item) => item.id === id);
  recommendationPanel.innerHTML = active.items
    .map(
      (item) => `
        <article class="recommendation-card">
          <h3>${item.title}</h3>
          <p><strong>Rationale.</strong> ${item.rationale}</p>
          <p><strong>Expected outcome.</strong> ${item.outcome}</p>
        </article>
      `,
    )
    .join("");
}

function renderRecommendationTabs() {
  recommendationTabs.innerHTML = recommendations
    .map(
      (tab, index) => `
        <button class="tab-button ${index === 0 ? "is-active" : ""}" data-tab="${tab.id}" role="tab" aria-selected="${index === 0}">
          ${tab.label}
        </button>
      `,
    )
    .join("");

  renderRecommendationPanel(recommendations[0].id);

  recommendationTabs.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      recommendationTabs
        .querySelectorAll(".tab-button")
        .forEach((tab) => {
          tab.classList.remove("is-active");
          tab.setAttribute("aria-selected", "false");
        });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      renderRecommendationPanel(button.dataset.tab);
    });
  });
}

function renderPriorityMatrix() {
  priorityMatrix.innerHTML = `
    <div class="matrix__axes">
      <span class="matrix__label matrix__label--x">Feasibility</span>
      <span class="matrix__label matrix__label--y">Impact</span>
      <div class="matrix__grid"></div>
    </div>
    ${priorities
      .map(
        (priority, index) => `
          <button
            class="priority-node priority-node--${priority.ring} ${index === 0 ? "is-active" : ""}"
            style="left:${priority.x}%; top:${priority.y}%; width:${priority.size * 2}px; height:${priority.size * 2}px"
            data-title="${priority.title}"
            data-body="${priority.body}"
          >
            <span>${priority.title}</span>
          </button>
        `,
      )
      .join("")}
  `;

  priorityInspectorTitle.textContent = priorities[0].title;
  priorityInspectorBody.textContent = priorities[0].body;

  priorityMatrix.querySelectorAll(".priority-node").forEach((node) => {
    node.addEventListener("click", () => {
      priorityMatrix
        .querySelectorAll(".priority-node")
        .forEach((other) => other.classList.remove("is-active"));
      node.classList.add("is-active");
      priorityInspectorTitle.textContent = node.dataset.title;
      priorityInspectorBody.textContent = node.dataset.body;
    });
  });
}

function handleFilterChanges() {
  currentFilters.status = statusFilter.value;
  currentFilters.region = regionFilter.value;
  currentFilters.actor = actorFilter.value;
  renderMarkers();
}

function resetFilters() {
  currentFilters.status = "All statuses";
  currentFilters.region = "All regions";
  currentFilters.actor = "All actors";
  statusFilter.value = currentFilters.status;
  regionFilter.value = currentFilters.region;
  actorFilter.value = currentFilters.actor;
  renderMarkers();
}

function updateActiveSection() {
  const offset = window.scrollY + 120;
  let activeId = "overview";

  sections.forEach((section) => {
    if (section.offsetTop <= offset) activeId = section.id;
  });

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
}

function init() {
  populateFilters();
  renderLegend();
  renderMarkers();
  renderDrawer(null);
  renderCoverageChart();
  renderTimeline();
  renderPatterns();
  renderAccordion(gapAccordion, gaps, "single");
  renderStacks();
  renderRecommendationTabs();
  renderPriorityMatrix();
  renderAccordion(methodAccordion, methodNotes, "multiple");

  statusFilter.addEventListener("change", handleFilterChanges);
  regionFilter.addEventListener("change", handleFilterChanges);
  actorFilter.addEventListener("change", handleFilterChanges);
  resetFiltersButton.addEventListener("click", resetFilters);
  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();
}

init();
