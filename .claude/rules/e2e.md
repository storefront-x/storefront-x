---
alwaysApply: false
description: E2E testing with Playwright — Storefront X framework
globs:
  - "tests/**/*.spec.ts"
  - "modules/*/tests/**/*.spec.ts"
---

# E2E Testing with Playwright — Storefront X Framework

The framework has its own Playwright tests to verify bootstrap functionality, concepts, and integrations.

## Test Structure

```
tests/                              # Global playwright tests for the framework
modules/core/src/playwright/        # Playwright utilities for the framework
playwright.config.js                # Main Playwright configuration
```

## Running Tests

```bash
yarn test:playwright                # All tests
npx playwright test --ui            # UI mode
npx playwright test path/to/test    # Specific test
npx playwright show-report          # HTML report after testing
```

## Writing Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature name', () => {
  test('description of what the test verifies', async ({ page }) => {
    await page.goto('/')

    await test.step('Step 1 — description', async () => {
      // action
    })

    await test.step('Step 2 — verification', async () => {
      await expect(page.locator('[data-cy=element]')).toBeVisible()
    })
  })
})
```

## Selectors — Priority

1. `data-cy` attributes (preferred)
2. Role-based: `page.getByRole('button', { name: '...' })`
3. Text: `page.getByText('...')`
4. CSS selectors (last resort)

## Rules

- **Don't use `page.waitForTimeout()`** — use web-first assertions
- **Isolate tests** — each test must be independent
- **Prefer `await expect(locator).toBeVisible()`** — auto-retry
- **Organize with `test.step()`** — clear structure
