# Page Form Collections

## About

Page Form Collections is an event registration application. Visitors can browse upcoming events and register their attendance, including their arrival time and an optional guest. Authenticated administrators can create events and review registrations.

## Technology stack

- SvelteKit 2, Svelte 5, TypeScript, and Vite
- Tailwind CSS 4 with Bits UI, Formsnap, and Lucide Svelte
- `sveltekit-superforms` and Zod-based form validation
- Drizzle ORM and Drizzle Kit with MySQL through `mysql2`
- Custom session authentication using Oslo crypto and encoding utilities
- Paraglide JS for English and German localization
- Vitest with the Playwright browser provider for unit and component tests
- Playwright for end-to-end tests
- Storybook for component development and documentation
- Azure Static Web Apps deployment using the SvelteKit Azure adapter

## Getting Started

The repository includes a VS Code Dev Container based on the Microsoft Universal image. Open the repository in VS Code, choose **Reopen in Container**, and then run the following commands in the container terminal:

```sh
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

The development server is available at <http://localhost:5173>.

The devcontainer provides the development tooling but does not start a MySQL server. Set `DATABASE_URL` to a MySQL database that is reachable from the container before running the migration command. The database schema and migrations are stored in `src/lib/server/db/schema.ts` and `drizzle/`.

To inspect or update the database during development, use:

```sh
npm run db:push
npm run db:generate
```

## Environment variables

Create `.env` from `.env.example` and set these values:

| Variable            | Required | Description                                                                                                                           |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`      | Yes      | MySQL connection string used by Drizzle Kit and the application database pool, for example `mysql://user:password@host:3307/db-name`. |
| `PUBLIC_GITHUB_URL` | Yes       | Repository URL shown by the application header and footer. It is exposed to client-side code because it uses the `PUBLIC_` prefix.    |

Do not commit `.env`; it is ignored by Git. `.env.example` contains safe placeholder values only.

## Useful commands

```sh
npm run check       # Svelte and TypeScript checks
npm run lint        # Prettier and ESLint checks
npm test            # Unit tests followed by Playwright end-to-end tests
npm run build       # Production build
npm run preview     # Preview the production build
npm run storybook   # Start Storybook on port 6006
```

## Deployment

The GitHub Actions workflow deploys the application to Azure Static Web Apps when changes are pushed to `main` or a pull request targeting `main` is updated. The workflow expects these GitHub secrets:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_SWA_NAME`
- `CONFIG_DATABASE_URL`

`GITHUB_TOKEN` is supplied by GitHub Actions. The workflow sets `DATABASE_URL` in Azure from `CONFIG_DATABASE_URL` and sets `PUBLIC_GITHUB_URL` to the repository URL during the build.
