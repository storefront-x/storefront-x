FROM node:16-alpine

ARG SFX_CONFIG=storefront-x.config.js

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build --config $SFX_CONFIG

CMD yarn serve
