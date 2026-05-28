# syntax=docker/dockerfile:1.7

# ---------- Stage 1: install deps ----------
FROM node:24-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate
ENV CI=true
WORKDIR /repo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/web/package.json ./packages/web/

RUN pnpm install --frozen-lockfile --filter web

# ---------- Stage 2: build (vite) ----------
FROM deps AS build
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL

COPY packages/web ./packages/web
WORKDIR /repo/packages/web
RUN pnpm build

# ---------- Stage 3: runtime (nginx serving static dist/) ----------
FROM nginx:alpine AS runtime
COPY --from=build /repo/packages/web/dist /usr/share/nginx/html
EXPOSE 80
