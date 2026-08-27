FROM ghcr.io/pnpm/pnpm:11 as base
RUN pnpm runtime set node 24 -g
RUN apt-get update \
    && apt-get install -y make sqlite3 python3

FROM denoland/deno:latest as denobase
RUN apt-get update \
    && apt-get install -y make sqlite3 python3

# Bot
FROM denobase as bot
WORKDIR /app/bot
COPY bot/deno.jsonc bot/deno.lock bot/package.json ./
RUN deno ci --prod --skip-types

COPY bot .
CMD ["deno", "task", "start"]

# Dashboard
FROM base as build
WORKDIR /app/dashboard
COPY dashboard/package.json dashboard/pnpm-lock.yaml ./
RUN pnpm fetch --prod --frozen-lockfile

COPY dashboard .
# This is necessary because of the shared dependency on config.ts
# TODO: Swap to monorepo and move to a common library
# COPY bot ../bot
RUN pnpm run build

FROM caddy as dashboard
COPY --from=build /app/dashboard/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
