# Contributing

Thank you for investing your time in contributing to Storefront X! Come and join our [Slack](https://join.slack.com/t/storefront-xworkspace/shared_invite/zt-1dwz7npyd-xjW5y02qUJvznFdnNtqN1Q) where we can chat and give you more help about Storefront X 🙂

## Repo setup

To hack on Storefront X, you will need to have working local version of the repository.

### 1. Requirements

- [Git](https://git-scm.com/)
- [Node.js v16+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

> You can install Yarn using `npm i -g yarn` command.

### 2. Clone the repository

```sh
git clone git@github.com:storefront-x/storefront-x.git
cd storefront-x
```

### 3. Install dependencies

```sh
yarn install
```

### 4. Start the development server

```sh
yarn dev
```

You can now view Storefront X on localhost. Development server has hot-module-reloading, so you don't have to reload the browser for changes in source code to take effect.

#### Choosing an integration

Storefront X uses different sets of modules for different integrations. They are specified in different `storefront-x.xxx.config.js` config files. To use different config file other than the default `storefront-x.config.js`, use the `--config` flag like this:

`yarn dev --config storefront-x.magento.config.js`

## Running tests

For most of the tests to work, Storefront X has to be bootstrapped. This is done automatically when starting the development server or you can run the bootstrap manually using this command:

```
yarn build --onlyBootstrap
```

### COre tests

Storefront X uses [Playwright](https://playwright.dev) for its core functionalities. These tests can be found inside `tests/playwright` directories inside Storefront X modules.

You can run integrations tests using this command:

```
yarn test:playwright
```

### Unit tests

Storefront X uses [Vitest](https://vitest.dev) for its unit tests. These tests can be found inside `tests/unit` directories inside Storefront X modules.

You can run unit tests using this command:

```
yarn test:unit
```

### Cypress tests

Storefront X uses [Cypress](https://www.cypress.io) for its E2E integration tests. These tests can be found inside `cypress` directories inside Storefront X modules.

Before you running Cypress tests, you need to either run the development server (`yarn dev`) or build the application (`yarn build`) so that the cypress directory in the root of the project is generated.

To open the Cypress GUI, run this command:

```
yarn cypress open
```

## Pull request guidelines

- Checkout a branch from the `main` branch, and merge back against that branch.

- If working on Storefront X core or any core package (`base`, `vue`, `vue-router`, ...):

  - Add accompanying Playwright test.

  - Add documentation.

- It's OK to have multiple small commits in your PR. PRs are squashed before merging.

- Make sure pipelines pass!
