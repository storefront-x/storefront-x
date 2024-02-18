FROM node:20-alpine

WORKDIR /app

COPY . .

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN yarn install

RUN yarn build --config storefront-x.magento.config.js

CMD yarn serve --host 0.0.0.0 --port 8080
