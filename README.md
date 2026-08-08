# AI FinOps + Governança

Multi-tenant SaaS foundation for consolidating AI provider costs, usage, governance metadata, corporate licenses and recommendations.

## Quick start

1. Copy `.env.example` to `.env` and provide local PostgreSQL and Redis endpoints.
2. Install dependencies with `npm install`.
3. Generate the Prisma client: `npm run db:generate`.
4. Start the applications: `npm run dev`.

The web dashboard runs on `http://localhost:3000`; the API health endpoint is `http://localhost:3001/v1/health`.

See [docs/architecture.md](docs/architecture.md) and [docs/product.md](docs/product.md) for the MVP boundaries and design decisions.
