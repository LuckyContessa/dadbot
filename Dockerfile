FROM denoland/deno:latest as base
RUN apt-get update \
    && apt-get install -y make sqlite3 python3

# Bot
FROM base as bot
WORKDIR /app/bot
COPY bot/deno.jsonc bot/deno.lock bot/package.json .
RUN deno ci --prod --skip-types

COPY bot .
CMD ["deno", "task", "start"]

# Dashboard
FROM base as build
WORKDIR /app/dashboard
COPY dashboard/deno.lock dashboard/package.json .
RUN deno ci --prod --skip-types

COPY dashboard .
RUN deno task build

FROM caddy as dashboard
COPY --from=build /app/dashboard/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
