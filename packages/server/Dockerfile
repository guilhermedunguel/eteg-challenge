# syntax=docker/dockerfile:1.7

# ---------- Stage 1: install all deps (incl. dev for build) ----------
FROM node:24-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate
ENV CI=true
WORKDIR /repo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/server/package.json ./packages/server/

RUN pnpm install --frozen-lockfile --filter server

# ---------- Stage 2: compile TypeScript ----------
FROM deps AS build
COPY packages/server ./packages/server
WORKDIR /repo/packages/server
RUN pnpm build

# ---------- Stage 3: install prod-only deps ----------
FROM node:24-alpine AS prod-deps
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate
ENV CI=true
WORKDIR /repo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/server/package.json ./packages/server/

RUN pnpm install --frozen-lockfile --filter server --prod

# ---------- Stage 4: runtime ----------
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /repo/packages/server

COPY --from=prod-deps /repo/node_modules /repo/node_modules
COPY --from=prod-deps /repo/packages/server/node_modules ./node_modules
COPY --from=build /repo/packages/server/dist ./dist
COPY packages/server/drizzle ./drizzle
COPY packages/server/package.json ./

EXPOSE ${SERVER_PORT}

CMD ["sh", "-c", "node dist/src/database/migrate.js && node dist/src/database/seed.js && node dist/src/server.js"]
