FROM node:19 AS build

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY frontend .

FROM build AS frontend-auth

RUN yarn build auth --prod

FROM build AS frontend

RUN yarn build --prod

FROM caddy:2-alpine

COPY deployment/caddy/entrypoint.sh /entrypoint.sh

COPY mainframe /srv/mainframe

COPY --from=frontend-auth /app/dist/apps/auth /srv/auth
COPY --from=frontend /app/dist/apps/frontend /srv/frontend

ENV DOMAIN_NAME=synopsis.localhost
ENV TLS_EMAIL=""
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["/entrypoint.sh"]
