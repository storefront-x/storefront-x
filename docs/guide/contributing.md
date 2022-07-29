# Contributing

## Setup using local environment

Local environment is recommended for development.

### Requirements

- [Git](https://git-scm.com/)
- [Node.js v16](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

:::tip
You can install Yarn using `npm i -g yarn` command.
:::

1. Clone the repository

```sh
git clone git@git.magexo.cz:magexo-projects-v2/storefront-x.git
cd storefront-x
```

2. Install dependencies

```sh
yarn install
```

3. Start the development server

```sh
yarn dev
```

## Setup using Docker

### Requirements

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

:::tip
Docker is recommended when you want to simply start up SFX and maybe explore it a litte bit. For development or testing, setup using local environment is better suited.
:::

1. Clone the repository

```sh
git clone git@git.magexo.cz:magexo-projects-v2/storefront-x.git
cd storefront-x
```

2. Start the development server

```sh
docker-compose up
```

## Production build

1. Build the production bundle

```sh
yarn build
```

2. Start the production server

```sh
yarn serve
```
