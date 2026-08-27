FROM denoland/deno:latest as base
RUN apt-get update \
    && apt-get install -y make sqlite3 python3

WORKDIR /app
COPY deno.jsonc deno.lock .
COPY bot/deno.jsonc bot/package.json bot/
COPY common/deno.jsonc common/
COPY dashboard/package.json dashboard/

# Bot
FROM base as bot
WORKDIR /app/bot
RUN deno ci --prod --skip-types

COPY bot .
COPY common ../common
CMD ["deno", "task", "start"]

# Dashboard
FROM base as build
WORKDIR /app/dashboard
RUN deno ci --prod --skip-types

COPY dashboard .
COPY common ../common
RUN deno task build

FROM caddy as dashboard
COPY --from=build /app/dashboard/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
