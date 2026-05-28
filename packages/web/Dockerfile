FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

ENV CI=true

WORKDIR /repo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/web/package.json ./packages/web/

RUN pnpm install --frozen-lockfile --filter web

COPY packages/web ./packages/web

WORKDIR /repo/packages/web

EXPOSE 3000

CMD ["pnpm", "dev", "--host"]
