# Laravel Static Export Architecture

This project can be authored in Laravel and deployed as a zero-install static bundle, but Laravel must be treated as a build environment only.

## Deployment target

The final server should only need static files in the web root:

- `index.html`
- `assets/app.css`
- `assets/app.js`
- `assets/vendor.css` if needed
- `assets/vendor.js` if needed
- `assets/fonts/*`
- `assets/images/*`
- `assets/data/*.json`

No runtime dependency should remain on:

- `php artisan`
- Laravel routes
- controllers
- Blade rendering on request
- Composer packages on the server
- Node packages on the server

## Recommended local architecture

Use Laravel only to author the site:

```text
diid/
  app/
  bootstrap/
  config/
  public/
    export/
  resources/
    views/
      pages/
        child-online-safety.blade.php
    css/
      app.css
    js/
      app.js
      vendor/
        alpine.js
        aos.js
        charts.js
    data/
      countries.json
      metrics.json
      timeline.json
      recommendations.json
  routes/
    web.php
  vite.config.js
  package.json
```

## Frontend package policy

You can use these safely:

- Tailwind CSS
- Alpine.js
- AOS
- Chart.js, ApexCharts, ECharts, or Nivo-equivalent browser bundles
- D3 or map libraries

But for final export:

- import them locally
- compile them into built assets
- do not rely on CDN links

## Blade strategy

Create one Blade page for authoring:

`resources/views/pages/child-online-safety.blade.php`

That page can use:

- Blade partials
- loops over local JSON data
- Tailwind utility classes
- Alpine component attributes

Example partial breakdown:

```text
resources/views/components/policy/
  hero.blade.php
  map-stage.blade.php
  metrics.blade.php
  patterns.blade.php
  gaps.blade.php
  recommendations.blade.php
  priorities.blade.php
  methodology.blade.php
```

## Asset strategy

All assets should be imported into Vite entry files.

`resources/js/app.js`

- import Alpine
- import AOS
- import chart library
- import any map helpers
- import local JSON if needed

`resources/css/app.css`

- import Tailwind layers
- import AOS CSS
- include component utility classes

## Static export process

Use Laravel for page composition, then export the rendered HTML after build.

### Build steps

1. Install locally:
   - `composer install`
   - `npm install`

2. Build production assets:
   - `npm run build`

3. Serve Laravel locally and render the final page once:
   - `php artisan serve`

4. Save the fully rendered HTML output into:
   - `public/export/index.html`

5. Copy Vite-built assets into:
   - `public/export/assets/`

6. Copy local fonts, images, and JSON into:
   - `public/export/assets/...`

7. Rewrite asset paths in the exported HTML to relative static paths.

## Export command design

Add an Artisan command later for deterministic exports:

```text
php artisan export:static-policy-brief
```

That command should:

1. render the target Blade view
2. write the HTML to `public/export/index.html`
3. copy manifest-resolved Vite assets into `public/export/assets`
4. copy local data and media assets
5. rewrite paths to static relative URLs

## Runtime rules for the final bundle

The exported bundle must work if the server only does this:

- serves `index.html`
- serves `/assets/*`

No dynamic endpoint should be required.

If interactivity exists, it must read from:

- embedded HTML
- bundled JS
- local JSON files

## Recommended library usage

### Tailwind

Use Tailwind normally in Laravel, but ship only compiled CSS.

### Alpine.js

Use for:

- tabs
- accordions
- inspector state
- map drawer toggle

Good fit because it keeps interactions inside exported HTML and bundled JS.

### AOS

Use only for simple reveal motion.

Do not make layout depend on AOS.

### Chart library

Use one chart library only.

Recommended:

- `Chart.js` for simpler bars and timelines
- `ECharts` if you want denser policy graphics

### Map

Best export-safe options:

- SVG Africa map with embedded paths
- D3 + local GeoJSON

Avoid map stacks that expect tokens, tiles, or server services for this project.

## Export-safe interaction model

These are safe in a static bundle:

- accordions
- tabs
- scrollspy
- animated counters
- static or local-data charts
- SVG map hover and click interactions
- drawer panels

These are not safe unless separately hosted:

- API-backed search
- database filters
- server-rendered form submissions
- authenticated dashboards

## Final delivery checklist

Before deployment, confirm:

- no CDN references remain
- no absolute localhost URLs remain
- no Laravel route links remain
- all fonts are local
- all JS and CSS are local
- all JSON files are local
- the site works by opening `index.html` from the export directory under a simple static server

## Recommendation

For this project:

- author in Laravel if you want Blade structure and editorial maintainability
- export as a static bundle
- keep all map, chart, and recommendation content local
- use Alpine for UI state and one chart library for all chart modules

That gives you a fully bundled deliverable with no server-side install requirement.
