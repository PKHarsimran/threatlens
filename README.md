# ThreatLens

This repository hosts a React frontend built with Vite. The app displays threat intelligence data from the `threat-intel` directory.

## Development

Install dependencies and run the dev server:

```bash
npm ci --prefix frontend
npm run dev --prefix frontend
```

Preview the production build locally:

```bash
npm run build --prefix frontend
npm run preview --prefix frontend
```

Lint and build the project:

```bash
npm run lint --prefix frontend
npm run build --prefix frontend
```

Before each build, the `threat-intel` directory at the repository root is copied into `frontend/public`. The deployment workflow also runs this step automatically.

When running `npm run dev --prefix frontend`, the copy step runs automatically via the predev script.
## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`. The workflow builds the frontend and deploys the `frontend/dist` directory to GitHub Pages.

