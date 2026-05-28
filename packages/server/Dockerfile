FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

ENV CI=true

WORKDIR /repo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/server/package.json ./packages/server/

RUN pnpm install --frozen-lockfile --filter server

COPY packages/server ./packages/server

WORKDIR /repo/packages/server

EXPOSE ${SERVER_PORT}

CMD ["pnpm", "dev"]
