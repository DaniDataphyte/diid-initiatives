<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Policy Insight: Child Online Safety Legislation Across Africa</title>
    <meta
      name="description"
      content="Interactive policy brief on child online safety legislation across Africa, based on DIID’s May 2026 analysis."
    />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
  </head>
  <body
    data-policy-page
    x-data="policyPage()"
    x-init="init()"
    :class="{
      'sidebar-collapsed': sidebarCollapsed,
      'sidebar-open': !sidebarCollapsed,
      'sidebar-mobile': !isDesktop,
      'sidebar-desktop': isDesktop
    }"
  >
    <header class="topbar">
      <button
        class="topbar__sidebar-toggle"
        :class="{ 'is-open': !sidebarCollapsed }"
        type="button"
        data-sidebar-toggle
        @click="toggleSidebar()"
        :aria-expanded="String(!sidebarCollapsed)"
        aria-controls="policySidebar"
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="topbar__brand">
        <span class="topbar__brand-mark">DIID</span>
        <span class="topbar__brand-copy">Digital Initiative for Innovation &amp; Development</span>
      </div>
      <nav class="topbar__nav" aria-label="Primary">
        <a class="is-active" href="#overview">Analysis</a>
        <a href="#state-of-play">Data Explorer</a>
        <a href="#method">Method</a>
      </nav>
      <a class="topbar__cta" href="#method">Download Report</a>
    </header>
    <button
      class="sidebar-backdrop"
      type="button"
      aria-label="Close sidebar"
      x-show="!isDesktop && !sidebarCollapsed"
      x-transition.opacity
      @click="closeSidebar()"
    ></button>

    <aside class="sidenav" id="policySidebar" aria-label="Section tracker">
      <div class="sidenav__inner">
        <div class="sidenav__header">
          <p class="sidenav__eyebrow">Child Online Safety Legislation Across Africa</p>
          <span class="sidenav__version">Policy Brief / May 2026</span>
        </div>
        <nav class="sidenav__nav" aria-label="Policy sections" @click="if (!isDesktop) closeSidebar()">
          <a class="is-active" href="#overview">
            <span class="sidenav__icon">◎</span>
            <span class="sidenav__label">Overview</span>
          </a>
          <a href="#state-of-play">
            <span class="sidenav__icon">◫</span>
            <span class="sidenav__label">State of Play</span>
          </a>
          <a href="#numbers">
            <span class="sidenav__icon">◧</span>
            <span class="sidenav__label">Numbers</span>
          </a>
          <a href="#patterns">
            <span class="sidenav__icon">⌘</span>
            <span class="sidenav__label">Patterns</span>
          </a>
          <a href="#gaps">
            <span class="sidenav__icon">✱</span>
            <span class="sidenav__label">Gaps</span>
          </a>
          <a href="#drivers">
            <span class="sidenav__icon">⇢</span>
            <span class="sidenav__label">Drivers/Barriers</span>
          </a>
          <a href="#recommendations">
            <span class="sidenav__icon">☑</span>
            <span class="sidenav__label">Recommendations</span>
          </a>
          <a href="#priorities">
            <span class="sidenav__icon">!</span>
            <span class="sidenav__label">Priorities</span>
          </a>
          <a href="#method">
            <span class="sidenav__icon">◍</span>
            <span class="sidenav__label">Method</span>
          </a>
        </nav>
      </div>
    </aside>

    <main class="page">
      <section class="hero" id="overview">
        <div class="hero__grid">
          <div class="hero__rule"></div>
          <div class="hero__copy">
            <p class="kicker">Policy Brief / May 2026 / DIID</p>
            <h1>
              Child Online Safety
              <span>Legislation Across Africa</span>
            </h1>
            <p class="hero__summary">
              A continent-wide policy interface on legislative progress,
              institutional architecture, and the protection gaps shaping child
              online safety across Africa.
            </p>
            <div class="hero__actions">
              <a class="button button--solid" href="#state-of-play"
                >Explore the map</a
              >
              <a class="button button--outline" href="#priorities"
                >See strategic priorities</a
              >
            </div>
          </div>
          <div class="hero__stats">
            <div class="hero-stat hero-stat--blue">
              <strong>54</strong>
              <span>AU states reviewed</span>
            </div>
            <div class="hero-stat hero-stat--orange">
              <strong>5</strong>
              <span>Enacted frameworks</span>
            </div>
            <div class="hero-stat hero-stat--sand">
              <strong>2023–25</strong>
              <span>Acceleration period</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--map" id="state-of-play">
        <div class="section__header section__header--split">
          <div>
            <h2>02 / State of Play</h2>
            <p>Continental legislative heatmap</p>
          </div>
          <div class="control-row">
            <label>
              <span>Region</span>
              <select disabled>
                <option>All Regions</option>
              </select>
            </label>
            <label>
              <span>Year</span>
              <select disabled>
                <option>2026</option>
              </select>
            </label>
          </div>
        </div>

        <div class="map-layout">
          <div class="map-sidebar">
            <div class="panel panel--tint">
              <h3>Legend</h3>
              <ul class="legend-list">
                <li><i class="swatch swatch--blue"></i> Enacted law</li>
                <li><i class="swatch swatch--orange"></i> Advanced draft</li>
                <li><i class="swatch swatch--amber"></i> Strategy / draft</li>
                <li><i class="swatch swatch--sand"></i> General law</li>
                <li><i class="swatch swatch--red"></i> No framework</li>
              </ul>
            </div>
            <div class="panel">
              <h3>Reading Note</h3>
              <p>
                The brief names some countries directly and groups the rest in
                aggregate categories. The map reflects those explicit country
                references while preserving the brief’s continental totals.
              </p>
            </div>
            <div class="panel panel--drawer">
              <p class="panel__eyebrow">Selected country</p>
              <div class="country-drawer" id="countryDrawer">
                <div class="country-drawer__head">
                  <div>
                    <h3 id="drawerCountry">Kenya</h3>
                    <span id="drawerRegion">East Africa</span>
                  </div>
                  <b id="drawerStatus">Binding guideline layer</b>
                </div>
                <p class="country-drawer__body" id="drawerSummary">
                  Kenya is identified in the brief as a jurisdiction with
                  binding child online protection guidelines effective from
                  October 2025, alongside wider data protection and regulatory
                  activity.
                </p>
                <div class="country-drawer__group">
                  <label>Instruments</label>
                  <ul id="drawerInstruments">
                    <li>Industry Guidelines for Child Online Protection and Safety</li>
                    <li>ODPC enforcement actions on children’s data</li>
                  </ul>
                </div>
                <div class="country-drawer__group">
                  <label>Key provisions</label>
                  <div class="country-drawer__tags" id="drawerFlags">
                    <span>Age verification</span>
                    <span>Provider obligations</span>
                    <span>Data protection</span>
                  </div>
                </div>
                <div class="country-drawer__group">
                  <label>Advocacy opportunity</label>
                  <p id="drawerOpportunity">
                    Consolidate existing protections into primary child online
                    protection legislation.
                  </p>
                </div>
                <div class="country-drawer__group">
                  <label>Article evidence</label>
                  <p id="drawerEvidence">
                    The brief places Kenya in the top-tier binding group while
                    also noting that its framework remains a consolidation case
                    rather than a standalone COP statute.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="map-stage">
            <div class="map-stage__surface">
              <div class="map-svg-shell">
                <svg
                  id="africaMap"
                  class="africa-map"
                  viewBox="0 0 820 680"
                  role="img"
                  aria-label="Africa child online protection legislative map"
                ></svg>
                <div class="map-region-label region-label--north">North Africa</div>
                <div class="map-region-label region-label--west">West Africa</div>
                <div class="map-region-label region-label--east">East Africa</div>
                <div class="map-region-label region-label--central">Central Africa</div>
                <div class="map-region-label region-label--south">Southern Africa</div>
              </div>
              <div class="map-note">
                <strong>Coverage note</strong>
                <p>
                  Country colour is applied only where the brief itself names a
                  jurisdiction or cites it as a direct example.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--metrics" id="numbers">
        <div class="section__header">
          <h2>03 / Key Metrics</h2>
          <p>Quantifying the continental deficit</p>
        </div>

        <div class="metrics-grid">
          <article class="metric-block">
            <h3>Legal Coverage Across AU States</h3>
            <div id="coverageChart">
              <div class="stacked-bar">
                <span class="segment segment--blue" style="width: 10%"></span>
                <span class="segment segment--orange" style="width: 15%"></span>
                <span class="segment segment--amber" style="width: 25%"></span>
                <span class="segment segment--sand" style="width: 40%"></span>
                <span class="segment segment--red" style="width: 10%"></span>
              </div>
            </div>
          </article>

          <article class="metric-block">
            <h3>Regional Readiness Comparison</h3>
            <div id="readinessChart">
                <div class="progress-list">
                  <div class="progress-row">
                  <div class="progress-row__label"><span>Regional scorecard not published in brief</span><span>0%</span></div>
                  <div class="progress"><i style="width: 0%"></i></div>
                </div>
              </div>
            </div>
          </article>

          <article class="metric-block metric-block--timeline">
            <h3>Legislative Timeline 2020–2026</h3>
            <div class="timeline" id="timelineChart"></div>
          </article>
        </div>
      </section>

      <section class="section section--patterns" id="patterns">
        <div class="section__header">
          <h2>04 / Emergent Patterns</h2>
        </div>
        <div class="pattern-grid" id="patternGrid">
          <article class="pattern-card pattern-card--sand">
            <p>Technological convergence</p>
            <h3>Integration with general data privacy frameworks</h3>
            <span>
              The strongest models connect child safety obligations to broader
              privacy, platform, and regulator mandates.
            </span>
          </article>
          <article class="pattern-card pattern-card--blue">
            <p>Regional harmonization</p>
            <h3>REC-led standardization in southern and western Africa</h3>
            <span>
              Sub-regional instruments are positioned as a route to reducing
              fragmentation and regulatory arbitrage.
            </span>
          </article>
          <article class="pattern-card pattern-card--amber">
            <p>Enforcement gaps</p>
            <h3>Statutory existence versus operational efficacy</h3>
            <span>
              The brief repeatedly distinguishes formal legal adoption from the
              institutional capacity needed to investigate, prosecute, and
              enforce online harms.
            </span>
          </article>
          <article class="pattern-card pattern-card--white">
            <p>Stakeholder resistance</p>
            <h3>Platform neutrality and liability disputes</h3>
            <span>
              Global platform incentives remain misaligned with local safety and
              accountability expectations.
            </span>
          </article>
        </div>
      </section>

      <section class="section section--gaps" id="gaps">
        <div class="gaps-layout">
          <div class="gaps-intro">
            <h2>05 / Structural Gaps</h2>
            <p>
              Identification of institutional and legal deficits that remain
              unresolved across most reviewed jurisdictions.
            </p>
            <div class="callout" id="gapCallout">
              <strong>Critical deficit</strong>
              <span>
                Budget allocation for child-specialized digital enforcement
                remains a structural implementation constraint.
              </span>
            </div>
          </div>
          <div class="gaps-list" id="gapAccordion">
            <article class="gap-item gap-item--open">
              <div class="gap-item__top">
                <h3>Definition of “Digital Harm”</h3>
                <span>Expanded</span>
              </div>
              <p>
                Lacking precise legal definitions for grooming, cyberbullying,
                and non-consensual image sharing in much of the mapped
                landscape.
              </p>
              <div class="severity">
                <label>Prevalence</label>
                <div class="severity__bars">
                  <i class="is-hot"></i><i class="is-hot"></i><i class="is-hot"></i
                  ><i class="is-hot"></i><i></i>
                </div>
                <strong>High</strong>
              </div>
            </article>
            <article class="gap-item">
              <div class="gap-item__top">
                <h3>Platform Accountability Scales</h3>
                <span>Collapsed</span>
              </div>
            </article>
            <article class="gap-item">
              <div class="gap-item__top">
                <h3>Cross-Border Judicial Cooperation</h3>
                <span>Collapsed</span>
              </div>
            </article>
            <article class="gap-item">
              <div class="gap-item__top">
                <h3>Participation and Evidence</h3>
                <span>Collapsed</span>
              </div>
            </article>
            <article class="gap-item">
              <div class="gap-item__top">
                <h3>Digital Literacy and Prevention</h3>
                <span>Collapsed</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section section--forces" id="drivers">
        <div class="section__header section__header--center">
          <h2>06 / Force Multipliers</h2>
        </div>
        <div class="force-grid">
          <article class="force-column force-column--driver">
            <div class="force-column__heading">
              <span>↑</span>
              <h3>Drivers of Progress</h3>
            </div>
            <ul id="driversList">
              <li>
                <strong>01</strong>
                <div>
                  <h4>Civil society pressure</h4>
                  <p>
                    Coalition pressure and local advocacy remain core accelerants
                    for draft progression and reform visibility.
                  </p>
                </div>
              </li>
              <li>
                <strong>02</strong>
                <div>
                  <h4>International treaties</h4>
                  <p>
                    Regional and international instruments continue to act as
                    catalysts for domestic policy alignment.
                  </p>
                </div>
              </li>
            </ul>
          </article>
          <article class="force-column force-column--barrier">
            <div class="force-column__heading">
              <span>↓</span>
              <h3>Structural Barriers</h3>
            </div>
            <ul id="barriersList">
              <li>
                <strong>01</strong>
                <div>
                  <h4>Technical knowledge gap</h4>
                  <p>
                    Drafting quality suffers when committees lack specialized
                    understanding of platform, encryption, and algorithmic risk.
                  </p>
                </div>
              </li>
              <li>
                <strong>02</strong>
                <div>
                  <h4>Lobbying inertia</h4>
                  <p>
                    Soft-regulation preferences from major firms can slow the
                    transition to enforceable statutory obligations.
                  </p>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section section--recommendations" id="recommendations">
        <div class="section__header">
          <h2>07 / Strategic Recommendations</h2>
        </div>
        <div class="tabs tabs--static" id="recommendationTabs">
          <button class="is-active" type="button">African Union</button>
          <button type="button">National Governments</button>
          <button type="button">Civil Society</button>
          <button type="button">Platforms</button>
        </div>
        <div class="recommendation-grid" id="recommendationPanel">
          <article class="recommendation-card">
            <span>REC-01 / Harmonization</span>
            <h3>Regional model law diffusion</h3>
            <p>
              Develop a unified African Union model law for child online safety
              to reduce legal fragmentation across borders.
            </p>
            <div>
              <label>Implementation note</label>
              <p>
                Align with the African Charter on the Rights and Welfare of the
                Child and the AU COP policy.
              </p>
            </div>
          </article>
          <article class="recommendation-card">
            <span>REC-02 / Funding</span>
            <h3>Mandatory safety levies</h3>
            <p>
              Establish sustainable financing routes for specialist online
              safety regulation, investigation, and enforcement capacity.
            </p>
            <div>
              <label>Implementation note</label>
              <p>
                The brief calls for sustained financing of digital forensics,
                investigator training, prosecutorial capacity, and judicial
                readiness.
              </p>
            </div>
          </article>
        </div>
        <div class="tab-state-grid" id="tabStateGrid">
          <article class="tab-state">
            <div class="tab-state__head">
              <span>Recommendation audience</span>
              <h3>National Governments</h3>
            </div>
            <ul>
              <li>Adopt child-specific design obligations in primary law.</li>
              <li>Assign regulator roles across telecom, DPA, and justice systems.</li>
              <li>Fund specialist implementation capacity before enforcement starts.</li>
            </ul>
          </article>
          <article class="tab-state">
            <div class="tab-state__head">
              <span>Recommendation audience</span>
              <h3>Civil Society</h3>
            </div>
            <ul>
              <li>Translate AU policy language into country domestication roadmaps.</li>
              <li>Use coalition pressure to shape drafts before enactment.</li>
              <li>Press for rights-respecting safeguards and child participation.</li>
            </ul>
          </article>
          <article class="tab-state">
            <div class="tab-state__head">
              <span>Recommendation audience</span>
              <h3>Platforms</h3>
            </div>
            <ul>
              <li>Apply strongest child-safety standards consistently across markets.</li>
              <li>Invest in African-language moderation and trust-and-safety capacity.</li>
              <li>Expose accountability hooks for regulator review and audits.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section section--priorities" id="priorities">
        <div class="section__header section__header--split">
          <div>
            <h2>08 / Priority Matrix</h2>
            <p>
              Mapping impact against feasibility for the article’s advocacy
              focus points.
            </p>
          </div>
        </div>
        <div class="priority-layout">
          <div class="matrix" id="priorityMatrix">
            <span class="matrix__axis matrix__axis--y">Impact (Protective Capacity)</span>
            <span class="matrix__axis matrix__axis--x">Feasibility (Resource Readiness)</span>
            <div class="matrix__grid"></div>
            <div class="matrix__quadrant quadrant--one">High impact / high feasibility</div>
            <div class="matrix__quadrant quadrant--two">High impact / medium feasibility</div>
            <div class="matrix__quadrant quadrant--three">Long-term / structural</div>
            <div class="matrix__quadrant quadrant--four">Lower immediate leverage</div>
            <div class="matrix__node node--blue" style="top: 18%; left: 82%">
              <span>South Africa</span>
            </div>
            <div class="matrix__node node--orange" style="top: 34%; left: 46%">
              <span>Kenya</span>
            </div>
            <div class="matrix__node node--blue" style="top: 21%; left: 66%">
              <span>Nigeria</span>
            </div>
            <div class="matrix__node node--orange" style="top: 52%; left: 40%">
              <span>Rwanda</span>
            </div>
            <div class="matrix__node node--red" style="top: 74%; left: 20%">
              <span>Gap state</span>
            </div>
          </div>
          <aside class="matrix-side">
            <div class="matrix-legend">
              <h3>Legend</h3>
              <ul>
                <li><i class="swatch swatch--blue"></i> High-opportunity consolidation target</li>
                <li><i class="swatch swatch--orange"></i> Emerging legislative pathway</li>
                <li><i class="swatch swatch--red"></i> High-risk or low-coverage jurisdiction</li>
                <li><span class="size-dot"></span> Larger node = higher urgency</li>
              </ul>
            </div>
            <div class="matrix-inspector">
              <p class="panel__eyebrow">Inspector</p>
              <h3 id="priorityTitle">Nigeria</h3>
              <b id="priorityRingLabel">High impact / high feasibility</b>
              <p id="priorityBody">
                HB.244 already has legislative movement, coalition
                infrastructure exists, and the policy window remains open for
                enforceable law.
              </p>
              <div>
                <label>Article-exact action cue</label>
                <p id="priorityAction">Push Senate passage and early implementation design.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section section--method" id="method">
        <div class="method-wrap">
          <div class="section__header">
            <h2>09 / Methodology &amp; Resources</h2>
          </div>
          <div class="method-grid">
            <div class="method-list" id="methodAccordion">
              <article><span>Classification note</span><i>+</i></article>
              <article><span>Scope note</span><i>+</i></article>
              <article><span>Map note</span><i>+</i></article>
              <article><span>Source note</span><i>+</i></article>
            </div>
            <aside class="contact-card">
              <h3>Contact DIID</h3>
              <p>
                For the companion mapping, country notes, or follow-up policy
                engagement, contact the policy desk.
              </p>
              <a href="mailto:policy@diid.africa">policy@diid.africa</a>
            </aside>
          </div>
          <div class="pending-grid">
            <article class="pending-card">
              <strong>Executive summary</strong>
              <p>Only five of Africa’s 55 countries are identified as having enacted dedicated, enforceable child online safety laws or binding instruments.</p>
            </article>
            <article class="pending-card">
              <strong>Continental trigger</strong>
              <p>The African Union adopted the Child Online Safety and Empowerment Policy in February 2024, which the brief treats as the main continental policy trigger.</p>
            </article>
            <article class="pending-card">
              <strong>Core risk</strong>
              <p>The brief warns that continental policy without national domestication risks repeating the slow implementation path seen under the Malabo Convention.</p>
            </article>
            <article class="pending-card">
              <strong>Advocacy test</strong>
              <p>The immediate challenge is to secure rights-respecting law, enforcement capacity, and stronger accountability for global platforms operating across African markets.</p>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer__top">
        <div>
          <h3>Digital Initiative for Innovation and Development</h3>
          <p>
            Policy research, digital rights, and legislative analysis on child
            online safety across Africa.
          </p>
        </div>
        <nav aria-label="Footer">
          <a href="#overview">Overview</a>
          <a href="#method">Methodology</a>
          <a href="#numbers">Data signals</a>
          <a href="#recommendations">Recommendations</a>
        </nav>
      </div>
      <div class="footer__bottom">
        <span>© 2026 DIID. Policy Brief Interface.</span>
        <span>Child Online Safety Legislation Across Africa</span>
      </div>
    </footer>
    <script id="policyData" type="application/json">@json($policyData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)</script>
  </body>
</html>
