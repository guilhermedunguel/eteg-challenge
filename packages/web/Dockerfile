FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

ENV CI=true

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--host"]