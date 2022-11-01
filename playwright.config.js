//@ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  globalSetup: './tests/playwright/globalSetup.js',
  globalTeardown: './tests/playwright/globalTeardown.js',
  retries: 2,
  testMatch: 'modules/**/tests/playwright/*.spec.js',
}

export default config
