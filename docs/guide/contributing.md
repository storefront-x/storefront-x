# Storefront X Contributing guide

## Repo setup

### Requirements

- [Git](https://git-scm.com/)
- [Node.js v16+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

> You can install Yarn using `npm i -g yarn` command.

1. Clone the repository

```sh
git clone git@github.com:storefront-x/storefront.git storefront-x
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

## Running tests

For most of the tests to work, Storefront X has to be bootstrapped. This is done automatically when starting the development server or you can run the bootstrap manually using this command:

```
yarn build --onlyBootstrap
```

## Integration tests

Storefront X uses [Playwright](https://playwright.dev) for its integration tests. These tests can be found inside `tests/playwright` directories inside Storefront X modules.

You can run integrations tests using this command:

```
yarn test:playwright
```

## Unit tests

Storefront X uses [Vitest](https://vitest.dev) for its unit tests. These tests can be found inside `tests/unit` directories inside Storefront X modules.

You can run unit tests using this command:

```
yarn test:unit
```

## Pull request guidelines

- Checkout a branch from the `main` branch, and merge back against that branch.

- If working on Storefront X core or any core package (`base`, `vue`, `vue-router`, ...):

  - Add accompanying Playwright test.

  - Add documentation.

- It's OK to have multiple small commits in your PR. PRs are squashed before merging.

- Make sure pipelines pass!
