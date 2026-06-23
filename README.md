# DIID Platform

This repository is a static multi-app workspace for DIID policy experiences.

## Structure

- `apps/*` article-specific apps
- `packages/brand/*` shared DIID logos, tokens, and visual identity
- `packages/policy-ui/*` reusable Alpine, map, and interface utilities
- `packages/schemas/*` shared JSON schema contracts
- `dist/*` built static exports for deployment
- `legacy/laravel-source/*` migration source from the original Laravel project

## Current apps

- `apps/child-online-safety`

## Build

```bash
npm install
npm run build:child-online-safety
```

The build output is written to `dist/child-online-safety`.

## Deployment

Each app is intended to deploy independently as a static site on Vercel or Cloudflare Pages.
