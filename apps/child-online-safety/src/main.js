import Alpine from 'alpinejs';
import AOS from 'aos';
import logoUrl from '../../../packages/brand/logos/diid_logo.svg?url';
import { escapeHtml, severityBars } from '@policy-ui/dom.js';
import { mercatorProjection, geometryToPath, geometryCentroid } from '@policy-ui/geo.js';
import { bindScrollSpy } from '@policy-ui/scrollspy.js';
import './styles/app.css';
import africaBoundariesUrl from './data/africa-boundaries.geo.json?url';
import statusTaxonomy from './data/status-taxonomy.json';
import countries from './data/countries.json';
import countryMentionsData from './data/country-mentions.json';
import metricsData from './data/metrics.json';
import timelineData from './data/timeline.json';
import patternsData from './data/patterns.json';
import gapsData from './data/gaps.json';
import driversBarriers from './data/drivers-barriers.json';
import recommendationsData from './data/recommendations.json';
import prioritiesData from './data/priorities.json';
import methodNotesData from './data/method-notes.json';

window.Alpine = Alpine;

const taxonomy = statusTaxonomy || [];
const statusMap = Object.fromEntries(
    taxonomy.map((item) => [item.key, { label: item.label, color: item.color }]),
);
const namedCountries = countries || [];
const countryMentions = countryMentionsData || [];
const metrics = metricsData || {};
const timeline = timelineData || [];
const patterns = patternsData || [];
const gaps = gapsData || [];
const drivers = driversBarriers?.drivers || [];
const barriers = driversBarriers?.barriers || [];
const recommendations = recommendationsData || [];
const priorities = prioritiesData || [];
const methodNotes = methodNotesData || [];
let africaBoundaries = { features: [] };

const sectionAnchors = Array.from(document.querySelectorAll('.sidenav a, .topbar__nav a'));
const trackedSections = Array.from(document.querySelectorAll('section[id]'));

const countryByIso = Object.fromEntries(namedCountries.map((item) => [item.iso3, item]));
const countryByName = Object.fromEntries(namedCountries.map((item) => [item.name, item]));
const mentionByIso = Object.fromEntries(countryMentions.map((item) => [item.iso3, item]));

const neutralColor = '#d7e2f3';
const unmappedColor = '#edf3fb';
const mapSelectionColor = '#141c25';

function mapFeatureState(feature) {
    const iso = feature.properties.iso_a3;
    const country = countryByIso[iso];
    const mention = mentionByIso[iso];

    if (country) {
        return {
            kind: 'classified',
            title: country.name,
            iso,
            color: statusMap[country.status]?.color || neutralColor,
            data: country,
        };
    }

    if (mention) {
        return {
            kind: 'mentioned',
            title: mention.name,
            iso,
            color: '#cfd7e6',
            data: mention,
        };
    }

    return {
        kind: 'unmapped',
        title: feature.properties.name,
        iso,
        color: unmappedColor,
        data: null,
    };
}
Alpine.data('policyPage', () => ({
    isDesktop: true,
    sidebarCollapsed: false,
    drawerOpen: false,
    priorityInspectorOpen: false,
    selectedCountryIso: 'KEN',
    mapFeatures: [],
    desktopQuery: null,

    async init() {
        document.querySelectorAll('[data-brand-logo]').forEach((node) => {
            node.setAttribute('src', logoUrl);
        });

        AOS.init({
            duration: 500,
            once: true,
            offset: 32,
        });

        this.desktopQuery = window.matchMedia('(min-width: 1201px)');
        this.syncSidebarMode();
        this.desktopQuery.addEventListener('change', () => this.syncSidebarMode());

        africaBoundaries = await fetch(africaBoundariesUrl).then((response) => response.json());
        this.buildMap();
        this.renderCoverageChart();
        this.renderReadinessChart();
        this.renderTimeline();
        this.renderPatterns();
        this.renderGaps();
        this.renderForceList('#driversList', drivers);
        this.renderForceList('#barriersList', barriers);
        this.renderRecommendationTabs();
        this.renderPriorityMatrix();
        this.renderMethodNotes();
        this.renderDrawer(this.selectedCountryIso);
        this.bindScrollSpy();
    },

    syncSidebarMode() {
        this.isDesktop = this.desktopQuery?.matches ?? window.innerWidth > 1200;
        this.sidebarCollapsed = !this.isDesktop;
    },

    toggleSidebar() {
        this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    closeSidebar() {
        this.sidebarCollapsed = true;
    },

    closeDrawer() {
        this.drawerOpen = false;
        this.selectedCountryIso = '';

        document.querySelectorAll('.africa-map__country').forEach((path) => {
            path.classList.remove('is-selected');
            path.setAttribute('stroke', '#ffffff');
        });
    },

    closePriorityInspector() {
        this.priorityInspectorOpen = false;

        document.querySelectorAll('#priorityMatrix [data-priority]').forEach((node) => {
            node.classList.remove('is-active');
        });
    },

    bindScrollSpy() {
        bindScrollSpy(sectionAnchors, trackedSections);
    },

    buildMap() {
        const svg = document.querySelector('#africaMap');

        if (!svg) {
            return;
        }

        const project = mercatorProjection(africaBoundaries.features, 820, 680, 20);
        this.mapFeatures = africaBoundaries.features.map((feature) => {
            const state = mapFeatureState(feature);
            const [cx, cy] = geometryCentroid(feature.geometry, project);

            return {
                ...state,
                path: geometryToPath(feature.geometry, project),
                centroidX: cx,
                centroidY: cy,
            };
        });

        svg.innerHTML = `
            <g class="africa-map__layer">
                ${this.mapFeatures
                    .map((feature) => {
                        const named = feature.kind === 'classified' || feature.kind === 'mentioned';
                        const label =
                            feature.kind === 'classified'
                                ? feature.data.name
                                : feature.kind === 'mentioned'
                                  ? feature.data.name
                                  : feature.title;

                        return `
                            <path
                                class="africa-map__country ${named ? 'is-named' : 'is-context'} ${feature.iso === this.selectedCountryIso ? 'is-selected' : ''}"
                                data-iso="${feature.iso}"
                                d="${feature.path}"
                                fill="${feature.color}"
                            >
                                <title>${escapeHtml(label)}</title>
                            </path>
                        `;
                    })
                    .join('')}
            </g>
        `;

        svg.querySelectorAll('[data-iso]').forEach((path) => {
            path.addEventListener('click', () => {
                this.renderDrawer(path.dataset.iso || '');
            });
        });
    },

    renderDrawer(iso) {
        const drawerCountry = document.querySelector('#drawerCountry');
        const drawerRegion = document.querySelector('#drawerRegion');
        const drawerStatus = document.querySelector('#drawerStatus');
        const drawerSummary = document.querySelector('#drawerSummary');
        const drawerInstruments = document.querySelector('#drawerInstruments');
        const drawerFlags = document.querySelector('#drawerFlags');
        const drawerOpportunity = document.querySelector('#drawerOpportunity');
        const drawerEvidence = document.querySelector('#drawerEvidence');

        const country = countryByIso[iso];
        const mention = mentionByIso[iso];
        const feature = this.mapFeatures.find((item) => item.iso === iso);

        if (country) {
            this.selectedCountryIso = iso;
            this.drawerOpen = true;
            const status = statusMap[country.status];

            drawerCountry.textContent = country.name;
            drawerRegion.textContent = country.region;
            drawerStatus.textContent = status?.label || country.status;
            drawerStatus.style.backgroundColor = `${status?.color || neutralColor}1a`;
            drawerStatus.style.color = status?.color || '#1d63d5';
            drawerSummary.textContent = country.summary;
            drawerInstruments.innerHTML = country.instruments
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join('');
            drawerFlags.innerHTML = country.flags
                .map((item) => `<span>${escapeHtml(item)}</span>`)
                .join('');
            drawerOpportunity.textContent = country.opportunity;
            drawerEvidence.textContent = `${country.evidence} Sources: ${country.articleRefs.join('; ')}.`;
        } else if (mention) {
            this.selectedCountryIso = iso;
            this.drawerOpen = true;

            drawerCountry.textContent = mention.name;
            drawerRegion.textContent = 'Article mention';
            drawerStatus.textContent = 'Mention only';
            drawerStatus.style.backgroundColor = 'rgba(79, 95, 121, 0.12)';
            drawerStatus.style.color = '#4f5f79';
            drawerSummary.textContent = mention.summary;
            drawerInstruments.innerHTML = '<li>No state-of-play classification is assigned in the supplied brief text.</li>';
            drawerFlags.innerHTML = '<span>Rights-risk precedent</span><span>Not counted in classification totals</span>';
            drawerOpportunity.textContent = 'Use this mention as a cautionary annotation rather than a state-of-play classification.';
            drawerEvidence.textContent = `Article references: ${mention.articleRefs.join('; ')}.`;
        } else if (feature) {
            this.selectedCountryIso = iso;
            this.drawerOpen = true;

            drawerCountry.textContent = feature.title;
            drawerRegion.textContent = 'Aggregate-only coverage';
            drawerStatus.textContent = 'Not individually classified';
            drawerStatus.style.backgroundColor = 'rgba(191, 210, 239, 0.44)';
            drawerStatus.style.color = '#4f5f79';
            drawerSummary.textContent =
                'This country appears in the continental map view, but the brief text available here does not name it individually in the state-of-play classification.';
            drawerInstruments.innerHTML = '<li>No country-specific instrument is quoted in the supplied brief text.</li>';
            drawerFlags.innerHTML = '<span>Aggregate category only</span><span>Falls inside continental totals</span>';
            drawerOpportunity.textContent =
                'Use the companion country mapping referenced by the brief to add a country-specific classification.';
            drawerEvidence.textContent =
                'The brief refers to a companion mapping document for full country-by-country coverage, but that source text is not included here.';
        }

        document.querySelectorAll('.africa-map__country').forEach((path) => {
            const active = path.getAttribute('data-iso') === this.selectedCountryIso;
            path.classList.toggle('is-selected', active);
            path.setAttribute('stroke', active ? mapSelectionColor : '#ffffff');
        });
    },

    renderCoverageChart() {
        const root = document.querySelector('#coverageChart');
        const coverage = metrics.aggregateCoverage || [];
        const total = coverage.reduce((sum, item) => sum + item.count, 0);

        if (!root) {
            return;
        }

        root.innerHTML = `
            <div class="stacked-bar">
                ${coverage
                    .map((item) => {
                        const width = total ? (item.count / total) * 100 : 0;

                        return `<span class="segment" style="width:${width}%;background:${statusMap[item.key]?.color || neutralColor}"></span>`;
                    })
                    .join('')}
            </div>
            <div class="coverage-detail-grid">
                ${coverage
                    .map(
                        (item) => `
                            <article class="coverage-detail">
                                <span class="coverage-detail__kicker">
                                    <i style="background:${statusMap[item.key]?.color || neutralColor}"></i>
                                    ${escapeHtml(item.label)}
                                </span>
                                <strong>${item.count}</strong>
                                <p>${escapeHtml(item.detail)}</p>
                            </article>
                        `,
                    )
                    .join('')}
            </div>
        `;
    },

    renderReadinessChart() {
        const root = document.querySelector('#readinessChart');
        const readiness = metrics.regionalReadiness || {};

        if (!root) {
            return;
        }

        if (!readiness.available) {
            root.innerHTML = `
                <div class="metric-empty">
                    <strong>Regional readiness values not published in article</strong>
                    <p>The supplied brief text does not include regional score outputs.</p>
                </div>
            `;

            return;
        }

        root.innerHTML = `
            <div class="progress-list">
                ${readiness.values
                    .map(
                        (item) => `
                            <div class="progress-row">
                                <div class="progress-row__label">
                                    <span>${escapeHtml(item.region)}</span>
                                    <span>${item.score}%</span>
                                </div>
                                <div class="progress"><i style="width:${item.score}%"></i></div>
                                <p class="progress-row__note">Article-named countries in this regional sample: ${item.sampleSize}</p>
                            </div>
                        `,
                    )
                    .join('')}
            </div>
            <p class="template-flag">${escapeHtml(readiness.methodology || '')}</p>
            <div class="method-chip-list">
                ${readiness.dimensions
                    .map((item) => `<span>${escapeHtml(item)}</span>`)
                    .join('')}
            </div>
            <p class="template-flag">${escapeHtml(readiness.sourceNote || '')}</p>
        `;
    },

    renderTimeline() {
        const root = document.querySelector('#timelineChart');

        if (!root || timeline.length < 6) {
            return;
        }

        const [start, au, acceleration, dpa, later, end] = timeline;
        const accelerationLabel = metrics.summary?.accelerationPeriod?.label || '2023-2025';

        root.innerHTML = `
            <div class="timeline__line"></div>
            <article class="timeline__item">
                <strong class="timeline__eyebrow">${escapeHtml(start.year)}</strong>
                <p class="timeline__title">${escapeHtml(start.title)}</p>
            </article>
            <article class="timeline__item">
                <strong class="timeline__eyebrow">${escapeHtml(au.year)}</strong>
                <p class="timeline__detail">${escapeHtml(au.detail || au.title)}</p>
            </article>
            <article class="timeline__item timeline__item--accent">
                <div class="timeline__card">
                    <strong>${escapeHtml(accelerationLabel)}</strong>
                    <p class="timeline__detail">${escapeHtml(acceleration.detail || acceleration.title)}</p>
                </div>
            </article>
            <article class="timeline__item">
                <strong class="timeline__eyebrow">${escapeHtml(dpa.year)}</strong>
                <p class="timeline__detail">${escapeHtml(dpa.detail || dpa.title)}</p>
            </article>
            <article class="timeline__item">
                <strong class="timeline__eyebrow">${escapeHtml(later.year)}</strong>
                <p class="timeline__detail">${escapeHtml(later.detail || later.title)}</p>
            </article>
            <article class="timeline__item">
                <strong class="timeline__eyebrow">${escapeHtml(end.year)}</strong>
                <p class="timeline__detail">${escapeHtml(end.detail || end.title)}</p>
            </article>
        `;
    },

    renderPatterns() {
        const root = document.querySelector('#patternGrid');
        const variants = ['sand', 'blue', 'amber', 'white'];

        if (!root) {
            return;
        }

        root.innerHTML = patterns
            .map(
                (item, index) => `
                    <article class="pattern-card pattern-card--${variants[index % variants.length]}">
                        <p>${escapeHtml(item.eyebrow)}</p>
                        <h3>${escapeHtml(item.title)}</h3>
                        <span>${escapeHtml(item.body)}</span>
                    </article>
                `,
            )
            .join('');
    },

    renderGaps() {
        const callout = document.querySelector('#gapCallout');
        const root = document.querySelector('#gapAccordion');
        const severityLabels = {
            3: 'Elevated',
            4: 'Severe',
            5: 'Critical',
        };

        if (!root) {
            return;
        }

        const critical = [...gaps].sort((a, b) => b.severity - a.severity)[0];

        if (callout && critical) {
            callout.innerHTML = `
                <strong>Critical deficit</strong>
                <span>${escapeHtml(critical.title)}: ${escapeHtml(critical.body)}</span>
            `;
        }

        root.innerHTML = gaps
            .map(
                (item, index) => `
                    <article class="gap-item ${index === 0 ? 'gap-item--open' : ''}">
                        <button class="gap-item__top" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                            <h3>${escapeHtml(item.title)}</h3>
                            <span>${index === 0 ? 'Expanded' : 'Collapsed'}</span>
                        </button>
                        <div class="gap-item__panel">
                            <p>${escapeHtml(item.body)}</p>
                            <p><strong>Where it appears.</strong> ${escapeHtml(item.where)}</p>
                            <p><strong>What stronger policy requires.</strong> ${escapeHtml(item.test)}</p>
                            <div class="severity">
                                <label>Prevalence</label>
                                <div class="severity__bars">${severityBars(item.severity)}</div>
                                <strong>${severityLabels[item.severity] || 'Rated'}</strong>
                            </div>
                        </div>
                    </article>
                `,
            )
            .join('');

        root.querySelectorAll('.gap-item').forEach((item) => {
            const button = item.querySelector('.gap-item__top');
            const state = item.querySelector('.gap-item__top span');

            button?.addEventListener('click', () => {
                const isOpen = item.classList.contains('gap-item--open');

                root.querySelectorAll('.gap-item').forEach((other) => {
                    other.classList.remove('gap-item--open');
                    other.querySelector('.gap-item__top')?.setAttribute('aria-expanded', 'false');
                    const label = other.querySelector('.gap-item__top span');
                    if (label) {
                        label.textContent = 'Collapsed';
                    }
                });

                item.classList.toggle('gap-item--open', !isOpen);
                button.setAttribute('aria-expanded', String(!isOpen));
                if (state) {
                    state.textContent = isOpen ? 'Collapsed' : 'Expanded';
                }
            });
        });
    },

    renderForceList(selector, items) {
        const root = document.querySelector(selector);

        if (!root) {
            return;
        }

        root.innerHTML = items
            .map(
                (item, index) => `
                    <li>
                        <strong>${String(index + 1).padStart(2, '0')}</strong>
                        <div>
                            <h4>${escapeHtml(item.title)}</h4>
                            <p>${escapeHtml(item.body)}</p>
                        </div>
                    </li>
                `,
            )
            .join('');
    },

    renderRecommendationTabs() {
        const tabs = document.querySelector('#recommendationTabs');
        const panel = document.querySelector('#recommendationPanel');
        const states = document.querySelector('#tabStateGrid');
        let active = recommendations[0]?.id || null;

        if (!tabs || !panel || !states) {
            return;
        }

        const paint = () => {
            const audience = recommendations.find((item) => item.id === active) || recommendations[0];

            tabs.innerHTML = recommendations
                .map(
                    (item) => `
                        <button class="${item.id === active ? 'is-active' : ''}" type="button" data-tab="${item.id}">
                            ${escapeHtml(item.label)}
                        </button>
                    `,
                )
                .join('');

            panel.innerHTML = audience.items
                .map(
                    (item, index) => `
                        <article class="recommendation-card">
                            <span>REC-${String(index + 1).padStart(2, '0')} / ${escapeHtml(audience.label)}</span>
                            <h3>${escapeHtml(item.title)}</h3>
                            <p>${escapeHtml(item.rationale)}</p>
                            <div>
                                <label>Implementation note</label>
                                <p>${escapeHtml(item.outcome)}</p>
                            </div>
                        </article>
                    `,
                )
                .join('');

            states.innerHTML = recommendations
                .map(
                    (item) => `
                        <article class="tab-state">
                            <div class="tab-state__head">
                                <span>Recommendation audience</span>
                                <h3>${escapeHtml(item.label)}</h3>
                            </div>
                            <ul>
                                ${item.items
                                    .slice(0, 3)
                                    .map((entry) => `<li>${escapeHtml(entry.title)}</li>`)
                                    .join('')}
                            </ul>
                        </article>
                    `,
                )
                .join('');

            tabs.querySelectorAll('[data-tab]').forEach((button) => {
                button.addEventListener('click', () => {
                    active = button.dataset.tab || active;
                    paint();
                });
            });
        };

        paint();
    },

    renderPriorityMatrix() {
        const root = document.querySelector('#priorityMatrix');
        const title = document.querySelector('#priorityTitle');
        const ring = document.querySelector('#priorityRingLabel');
        const body = document.querySelector('#priorityBody');
        const action = document.querySelector('#priorityAction');

        if (!root || !priorities.length) {
            return;
        }

        const ringLabels = {
            blue: 'High-opportunity consolidation target',
            orange: 'Emerging legislative pathway',
            red: 'High-risk or low-coverage priority',
        };

        const paintInspector = (item) => {
            this.priorityInspectorOpen = true;
            title.textContent = item.title;
            ring.textContent = ringLabels[item.ring] || item.ring;
            ring.style.backgroundColor = item.ring === 'red' ? 'rgba(240, 6, 20, 0.12)' : item.ring === 'orange' ? 'rgba(252, 105, 6, 0.12)' : 'rgba(29, 99, 213, 0.12)';
            ring.style.color = item.ring === 'red' ? '#f00614' : item.ring === 'orange' ? '#b74e0b' : '#1d63d5';
            body.textContent = item.body;
            action.textContent = item.action;
        };

        root.innerHTML = `
            <span class="matrix__axis matrix__axis--y">Impact (Protective Capacity)</span>
            <span class="matrix__axis matrix__axis--x">Feasibility (Resource Readiness)</span>
            <div class="matrix__grid"></div>
            <div class="matrix__quadrant quadrant--one">High impact / high feasibility</div>
            <div class="matrix__quadrant quadrant--two">High impact / medium feasibility</div>
            <div class="matrix__quadrant quadrant--three">Long-term / structural</div>
            <div class="matrix__quadrant quadrant--four">Lower immediate leverage</div>
            ${priorities
                .map(
                    (item, index) => `
                        <button
                            class="matrix__node node--${item.ring} ${index === 0 ? 'is-active' : ''}"
                            type="button"
                            data-priority="${escapeHtml(item.title)}"
                            style="top:${item.y}%;left:${item.x}%;width:${item.size}px;height:${item.size}px;"
                        >
                            <span>${escapeHtml(item.title)}</span>
                        </button>
                    `,
                )
                .join('')}
        `;

        root.querySelectorAll('[data-priority]').forEach((button) => {
            button.addEventListener('click', () => {
                const item = priorities.find((entry) => entry.title === button.dataset.priority);

                root.querySelectorAll('[data-priority]').forEach((node) => {
                    node.classList.remove('is-active');
                });

                button.classList.add('is-active');
                if (item) {
                    paintInspector(item);
                }
            });
        });
    },

    renderMethodNotes() {
        const root = document.querySelector('#methodAccordion');

        if (!root) {
            return;
        }

        root.innerHTML = methodNotes
            .map(
                (item, index) => `
                    <article class="method-item ${index === 0 ? 'method-item--open' : ''}">
                        <button class="method-item__trigger" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                            <span>${escapeHtml(item.title)}</span>
                            <i>${index === 0 ? '−' : '+'}</i>
                        </button>
                        <div class="method-item__panel">
                            <p>${escapeHtml(item.body)}</p>
                        </div>
                    </article>
                `,
            )
            .join('');

        root.querySelectorAll('.method-item').forEach((item) => {
            const trigger = item.querySelector('.method-item__trigger');
            const icon = item.querySelector('i');

            trigger?.addEventListener('click', () => {
                const isOpen = item.classList.contains('method-item--open');
                item.classList.toggle('method-item--open', !isOpen);
                trigger.setAttribute('aria-expanded', String(!isOpen));
                if (icon) {
                    icon.textContent = isOpen ? '+' : '−';
                }
            });
        });
    },
}));

Alpine.start();
