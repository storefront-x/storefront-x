FROM node:16-alpine AS base

WORKDIR /app

# Copy required files
COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

# Copy source code of Storefront-X
# We don't need all of the source code, but we need all of the package.json files to build a full dependency tree.
COPY modules/ modules/

# Remove every file that is not package.json
RUN find modules \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

# Second stage
FROM node:16-alpine

ARG SFX_CONFIG=storefront-x.config.js

WORKDIR /app

# Coppy all of the files from first stage to the second one.
# Because we are only copying required files and package.json files of all packages, docker will use old cache layer.
COPY --from=base /app ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
# This step is theoretically not needed because everything gets later replaced by volume,
# but because it's needed for prod build, we will leave it here.
COPY . .

RUN yarn build --config $SFX_CONFIG

CMD yarn serve
