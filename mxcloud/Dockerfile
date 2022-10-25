FROM node:16 AS base

ARG SFX_CONFIG

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

COPY modules/ modules/

RUN find modules \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

FROM node:16

WORKDIR /app

COPY --from=base /app ./

RUN yarn install

COPY . .

RUN yarn build --config $SFX_CONFIG

CMD yarn serve --host 0.0.0.0
