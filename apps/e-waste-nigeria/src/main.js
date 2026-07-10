import Alpine from 'alpinejs';
import AOS from 'aos';
import logoUrl from '../../../packages/brand/logos/diid_logo.svg?url';
import { escapeHtml } from '@policy-ui/dom.js';
import { mercatorProjection, geometryToPath, geometryCentroid } from '@policy-ui/geo.js';
import { sectionIcons, cardIcons } from './section-icons.js';
import './styles/app.css';
import heroIllustrationUrl from './assets/images/e-waste-hero.svg?url';
import impactIllustrationUrl from './assets/images/e-waste-impact.svg?url';
import nigeriaAdm0Url from './data/nigeria-adm0.geo.json?url';
import nigeriaAdm1Url from './data/nigeria-adm1.geo.json?url';
import summary from './data/summary.json';
import africaRanking from './data/africa-ranking.json';
import dependencyLoop from './data/dependency-loop.json';
import hazards from './data/hazards.json';
import sites from './data/sites.json';
import regulations from './data/regulations.json';
import rights from './data/rights.json';
import recommendations from './data/recommendations.json';
import limitations from './data/limitations.json';

window.Alpine = Alpine;
let nigeriaAdm0 = { features: [] };
let nigeriaAdm1 = { features: [] };
const hazardIconKeys = ['brominated', 'lead', 'cadmium', 'mercury'];
const healthIconKeys = ['neonatal', 'infant', 'lag'];

Alpine.data('ewastePage', () => ({
  activeRight: rights[0]?.key || 'environmental-justice',

  async init() {
    document.querySelectorAll('[data-brand-logo]').forEach((node) => {
      node.setAttribute('src', logoUrl);
    });
    this.renderSectionIcons();
    document.getElementById('heroIllustration')?.setAttribute('src', heroIllustrationUrl);
    document.getElementById('impactIllustration')?.setAttribute('src', impactIllustrationUrl);

    AOS.init({
      duration: 500,
      once: true,
      offset: 24
    });

    [nigeriaAdm0, nigeriaAdm1] = await Promise.all([
      fetch(nigeriaAdm0Url).then((response) => response.json()),
      fetch(nigeriaAdm1Url).then((response) => response.json())
    ]);

    this.renderHeroStats();
    this.renderAfricaRanking();
    this.renderBurdenMetrics();
    this.renderDependencyStats();
    this.renderDependencyLoop();
    this.renderHazards();
    this.renderHealthFindings();
    this.renderSites();
    this.renderRegulations();
    this.renderRightsTabs();
    this.renderRightsPanel(this.activeRight);
    this.renderRecommendations();
    this.renderLimitations();
    this.initScrollSpy();
  },

  renderSectionIcons() {
    document.querySelectorAll('[data-section-icon]').forEach((node) => {
      const key = node.getAttribute('data-section-icon');
      node.innerHTML = sectionIcons[key] || '';
    });
  },

  initScrollSpy() {
    const links = Array.from(document.querySelectorAll('[data-nav-link]'));
    const sections = links
      .map((link) => {
        const id = link.getAttribute('href')?.slice(1);
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean);

    if (!links.length || !sections.length) return;

    const activate = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', active);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) activate(visible.target.id);
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.2, 0.45, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));
    activate('scale');
  },

  renderHeroStats() {
    const root = document.querySelector('#heroStats');
    if (!root) return;

    root.innerHTML = summary.heroStats
      .map(
        (item) => `
          <article class="hero-stat hero-stat--${escapeHtml(item.tone)}">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </article>
        `
      )
      .join('');
  },

  renderAfricaRanking() {
    const root = document.querySelector('#africaRanking');
    if (!root) return;

    const max = Math.max(...africaRanking.map((item) => item.tonnes));

    root.innerHTML = africaRanking
      .map(
        (item, index) => `
          <article class="rank-row ${index === 2 ? 'is-featured' : ''}">
            <div class="rank-row__label">
              <span>${escapeHtml(item.country)}</span>
              <strong>${escapeHtml(item.tonnes.toLocaleString())} tonnes</strong>
            </div>
            <div class="rank-row__bar">
              <i style="width:${(item.tonnes / max) * 100}%"></i>
            </div>
          </article>
        `
      )
      .join('');
  },

  renderBurdenMetrics() {
    const root = document.querySelector('#burdenMetrics');
    if (!root) return;

    root.innerHTML = summary.burdenMetrics
      .map(
        (item) => `
          <article class="burden-card">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `
      )
      .join('');
  },

  renderDependencyStats() {
    const root = document.querySelector('#dependencyStats');
    if (!root) return;

    root.innerHTML = summary.dependencyStats
      .map(
        (item) => `
          <article class="dependency-evidence__item">
            <strong>${escapeHtml(item.value)}</strong>
            <div>
              <span>${escapeHtml(item.label)}</span>
              <p>${escapeHtml(item.note)}</p>
            </div>
          </article>
        `
      )
      .join('');
  },

  renderDependencyLoop() {
    const root = document.querySelector('#dependencyLoop');
    if (!root) return;

    root.innerHTML = dependencyLoop
      .map(
        (item, index) => `
          <article class="loop-step" data-aos="fade-up" data-aos-delay="${index * 40}">
            <span class="loop-step__index">0${index + 1}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
      )
      .join('');
  },

  renderHazards() {
    const root = document.querySelector('#hazardGrid');
    if (!root) return;

    const [lead, ...rest] = hazards.releases;

    root.innerHTML = `
      <article class="hazard-card hazard-card--feature">
        <div class="hazard-card__head">
          <i class="impact-card__icon" aria-hidden="true">${cardIcons[hazardIconKeys[0]]}</i>
          <div>
            <span>${escapeHtml(lead.value)}</span>
            <strong>${escapeHtml(lead.label)}</strong>
          </div>
        </div>
        <p>${escapeHtml(lead.note)}</p>
      </article>
      <div class="hazard-grid__rest">
        ${rest
          .map(
            (item, index) => `
              <article class="hazard-card">
                <div class="hazard-card__head">
                  <i class="impact-card__icon" aria-hidden="true">${cardIcons[hazardIconKeys[index + 1]]}</i>
                  <div>
                    <span>${escapeHtml(item.value)}</span>
                    <strong>${escapeHtml(item.label)}</strong>
                  </div>
                </div>
                <p>${escapeHtml(item.note)}</p>
              </article>
            `
          )
          .join('')}
      </div>
    `;
  },

  renderHealthFindings() {
    const root = document.querySelector('#healthFindings');
    if (!root) return;

    root.innerHTML = hazards.healthFindings
      .map(
        (item, index) => `
          <article class="health-card ${index === 0 ? 'health-card--feature' : ''}">
            <div class="health-card__metric">
              <i class="impact-card__icon impact-card__icon--health" aria-hidden="true">${cardIcons[healthIconKeys[index]]}</i>
              <strong>${escapeHtml(item.value)}</strong>
            </div>
            <div>
              <span>${escapeHtml(item.label)}</span>
              <p>${escapeHtml(item.note)}</p>
            </div>
          </article>
        `
      )
      .join('');
  },

  renderSites() {
    const mapRoot = document.querySelector('#siteMap');
    const svgRoot = document.querySelector('#nigeriaStateMap');
    const listRoot = document.querySelector('#siteList');
    if (!mapRoot || !listRoot || !svgRoot) return;

    const mapWidth = 520;
    const mapHeight = 620;
    const allFeatures = [...nigeriaAdm0.features, ...nigeriaAdm1.features];
    const project = mercatorProjection(allFeatures, mapWidth, mapHeight, 28);

    svgRoot.innerHTML = `
      <g class="nigeria-map__states">
        ${nigeriaAdm1.features
          .map((feature) => {
            const path = geometryToPath(feature.geometry, project);
            const [cx, cy] = geometryCentroid(feature.geometry, project);
            const name = feature.properties.shapeName;
            const highlighted =
              name === 'Lagos' || name === 'Kano' || name === 'Abuja Federal Capital Territory';

            return `
              <path
                class="nigeria-map__state ${highlighted ? 'is-highlighted' : ''}"
                d="${path}"
              >
                <title>${escapeHtml(name)}</title>
              </path>
              ${highlighted ? `<text class="nigeria-map__label" x="${cx.toFixed(1)}" y="${(cy + 6).toFixed(1)}">${escapeHtml(name === 'Abuja Federal Capital Territory' ? 'FCT' : name)}</text>` : ''}
            `;
          })
          .join('')}
      </g>
      <path
        class="nigeria-map__outline"
        d="${geometryToPath(nigeriaAdm0.features[0].geometry, project)}"
      ></path>
    `;

    mapRoot.querySelectorAll('.site-pin').forEach((node) => node.remove());

    mapRoot.innerHTML += sites
      .map(
        (item) => {
          const [x, y] = project([item.lon, item.lat]);

          return `
          <button
            class="site-pin ${item.tone ? `site-pin--${escapeHtml(item.tone)}` : ''}"
            style="left:${((x / mapWidth) * 100).toFixed(2)}%;top:${((y / mapHeight) * 100).toFixed(2)}%"
            type="button"
            data-site-target="site-note-${escapeHtml(item.key)}"
          >
            <span>${escapeHtml(item.label)}</span>
          </button>
        `;
        }
      )
      .join('');

    listRoot.innerHTML = sites
      .map(
        (item) => `
          <article class="site-note" id="site-note-${escapeHtml(item.key)}">
            <h4>${escapeHtml(item.label)}</h4>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `
      )
      .join('');

    mapRoot.querySelectorAll('[data-site-target]').forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-site-target');
        document.getElementById(targetId || '')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      });
    });
  },

  renderRegulations() {
    const timelineRoot = document.querySelector('#regulationTimeline');
    const gapRoot = document.querySelector('#enforcementGaps');
    if (!timelineRoot || !gapRoot) return;

    timelineRoot.innerHTML = regulations.instruments
      .map(
        (item) => `
          <article class="timeline-item">
            <span>${escapeHtml(item.year)}</span>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
      )
      .join('');

    gapRoot.innerHTML = regulations.gaps
      .map(
        (item) => `
          <article class="gap-card">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
      )
      .join('');
  },

  renderRightsTabs() {
    const root = document.querySelector('#rightsTabs');
    if (!root) return;

    root.innerHTML = rights
      .map(
        (item) => `
          <button
            class="${item.key === this.activeRight ? 'is-active' : ''}"
            type="button"
            data-right-tab="${escapeHtml(item.key)}"
          >
            ${escapeHtml(item.label)}
          </button>
        `
      )
      .join('');

    root.querySelectorAll('[data-right-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-right-tab') || rights[0]?.key;
        this.activeRight = key;
        this.renderRightsTabs();
        this.renderRightsPanel(key);
      });
    });
  },

  renderRightsPanel(key) {
    const root = document.querySelector('#rightsPanel');
    if (!root) return;

    const item = rights.find((entry) => entry.key === key) || rights[0];

    root.innerHTML = `
      <span class="rights-panel__eyebrow">${escapeHtml(item.label)}</span>
      <h3>${escapeHtml(item.headline)}</h3>
      <p>${escapeHtml(item.body)}</p>
      <ul>
        ${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
      </ul>
    `;
  },

  renderRecommendations() {
    const root = document.querySelector('#recommendationGrid');
    if (!root) return;

    root.innerHTML = recommendations
      .map(
        (item) => `
          <article class="recommendation-card">
            <span>${escapeHtml(item.kicker)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
            <strong>${escapeHtml(item.action)}</strong>
          </article>
        `
      )
      .join('');
  },

  renderLimitations() {
    const root = document.querySelector('#limitationsAccordion');
    if (!root) return;

    root.innerHTML = limitations
      .map(
        (item, index) => `
          <article class="limit-item ${index === 0 ? 'is-open' : ''}">
            <button class="limit-item__head" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
              <h3>${escapeHtml(item.title)}</h3>
              <span>${index === 0 ? 'In focus' : 'Open detail'}</span>
            </button>
            <div class="limit-item__body">
              <p>${escapeHtml(item.body)}</p>
            </div>
          </article>
        `
      )
      .join('');

    root.querySelectorAll('.limit-item').forEach((item) => {
      const button = item.querySelector('.limit-item__head');
      const label = item.querySelector('.limit-item__head span');

      button?.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        root.querySelectorAll('.limit-item').forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.limit-item__head')?.setAttribute('aria-expanded', 'false');
          const otherLabel = other.querySelector('.limit-item__head span');
          if (otherLabel) otherLabel.textContent = 'Open detail';
        });

        item.classList.toggle('is-open', !isOpen);
        button.setAttribute('aria-expanded', String(!isOpen));
        if (label) label.textContent = isOpen ? 'Open detail' : 'In focus';
      });
    });
  }
}));

Alpine.start();
