FROM node:20-alpine

ARG SFX_CONFIG=storefront-x.config.js

WORKDIR /app

COPY . .

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN yarn install

RUN yarn build --config $SFX_CONFIG

CMD yarn serve --host 0.0.0.0 --port 8080
