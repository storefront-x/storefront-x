FROM node:18-alpine

ARG SFX_CONFIG=storefront-x.aero.config

WORKDIR /app

COPY . .

RUN yarn install --immutable

RUN yarn build --config $SFX_CONFIG

CMD yarn serve
