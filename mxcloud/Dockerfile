FROM node:16 AS base

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

RUN yarn build --config storefront-x.magento.config.js

CMD yarn serve --host 0.0.0.0
