# Future-Proof Personal Portfolio

A static-first, Azure Static Web Apps-ready portfolio built with Vite, React, TypeScript, and Tailwind CSS. Content is JSON-driven and validated with Zod to keep future API or CMS integrations straightforward. The site emphasizes accessibility, performance, and cloud-native deployability.

## Architecture
- **Static-first delivery**: Vite build outputs pre-rendered assets suitable for Azure Static Web Apps, with navigation fallback configured in `staticwebapp.config.json`.
- **Typed content layer**: JSON in `src/content/` is validated by Zod schemas (`src/lib/schema.ts`) to ensure predictable data when scaling to APIs or headless CMS.
- **Design system**: Reusable layout components (`Header`, `Section`, `Card`, `ButtonLink`) and Tailwind-powered theming with CSS variables for light/dark support.
- **Future-ready hooks**: Feature flag constants anticipate Azure Functions-backed APIs and Entra ID-protected views without blocking static rendering.
- **Accessibility-first**: Semantic sections, ARIA labels, and keyboard-friendly navigation baked into components.

## Project structure
```
src/
 ├── components/        # Reusable UI building blocks
 ├── pages/             # Page-level composition (Home)
 ├── content/           # JSON content (skills, projects, learning, site metadata)
 ├── styles/            # Global Tailwind and theme tokens
 ├── lib/               # Zod schemas, constants
 └── main.tsx           # App entry
```

## Local development
```bash
npm install
npm run dev
```
Visit `http://localhost:5173`.

### Quality checks
```bash
npm run lint
npm run build
```

## Deployment (Azure Static Web Apps)
- CI/CD via `.github/workflows/azure-static-web-app.yml` builds on pushes to `main` and deploys with `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- Output directory: `dist`.
- Navigation fallback and security headers defined in `staticwebapp.config.json`.
- PRs automatically create/close preview environments.

## Future extensions
- Connect content to Azure Functions or Storage and reuse Zod schemas for runtime validation.
- Add Entra ID authentication for gated dashboards while keeping public sections static.
- Introduce feature flags backed by configuration storage for runtime toggles without redeploying the UI.
