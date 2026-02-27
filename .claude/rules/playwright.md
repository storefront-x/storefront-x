---
alwaysApply: false
description: Playwright E2E Testing Rules - SUPPLO Project
globs:
  - "**/playwright/**/*.ts"
  - "**/playwright/**/*.spec.ts"
  - "**/*.spec.ts"
---
# E2E Testing with Playwright - SUPPLO Project Rules

## Framework Overview

This project uses **Playwright** for end-to-end smoke testing alongside Cypress.
- **Version**: Playwright 1.48+
- **Pattern**: Page Object Model (POM)
- **Location**: `modules/supplo-common/tests/playwright/`
- **Language**: TypeScript
- **Documentation**: [playwright.dev](https://playwright.dev/)

### Key Playwright Features Used

- **Auto-wait**: Playwright waits for elements to be actionable before performing actions
- **Web-first assertions**: Assertions retry until conditions are met
- **Tracing**: Capture execution trace, videos, screenshots on failure
- **Browser contexts**: Full test isolation with zero overhead
- **Multiple browsers**: Chromium, Firefox, WebKit support
- **Cross-platform**: Windows, Linux, macOS

## Project Structure

```
modules/supplo-common/tests/playwright/
├── playwright.config.ts       # Main configuration
├── auth.setup.ts              # Authentication setup (runs before tests)
├── data/
│   └── environment.ts         # Environment configurations (CZ, SK, SI, HR)
├── e2e/
│   └── smoke/
│       ├── checkout-flow.spec.ts        # Single-section checkout
│       └── multi-section-checkout.spec.ts # Multi-section checkout
├── helpers/
│   ├── retry.ts               # Retry utility
│   ├── sectionCheckoutFlow.ts # Reusable checkout flow
│   └── graphql/
│       ├── graphqlClient.ts   # GraphQL client
│       ├── clearCustomerCart.ts
│       ├── clearCustomerWishlist.ts
│       └── getCustomerOrders.ts
└── pages/                     # Page Object Model
    ├── BasePage.ts
    ├── CategoryPage.ts
    ├── CheckoutPage.ts
    ├── ProductDetailPage.ts
    └── SearchPage.ts

# Output directories (gitignored)
modules/supplo-common/tests/
├── playwright-report/         # HTML reports
└── test-results/              # Screenshots, videos, traces
```

## Page Object Model (POM)

### BasePage Pattern

```typescript
import { Page, Locator, expect } from '@playwright/test'

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' })
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.waitForFunction(() =>
      (window as any).$router !== undefined,
      { timeout: 10000 }
    )
    await this.page.evaluate((p) =>
      (window as any).$router.push(p),
      path
    )
    await expect.poll(
      async () => await this.page.evaluate(() =>
        (window as any).$pinia?.magento?.isNavigating?.value
      ),
      { timeout: 20000, intervals: [500, 1000, 2000] }
    ).toBe(false)
  }

  getNotification(type: 'SUCCESS' | 'ERROR'): Locator {
    return this.page.locator(`[data-cy=notification-type-${type}]`)
  }

  async closeAnyModal(): Promise<void> {
    const modalSelectors = [
      '[data-cy="modal-close-button"]',
      '[data-cy="close-modal"]',
      '[role="dialog"] button[aria-label*="close" i]',
    ]

    for (const selector of modalSelectors) {
      const closeButton = this.page.locator(selector).first()
      if (await closeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeButton.click()
        await this.page.waitForTimeout(500)
        return
      }
    }

    const dialog = this.page.locator('[role="dialog"]').first()
    if (await dialog.isVisible({ timeout: 500 }).catch(() => false)) {
      await this.page.keyboard.press('Escape')
    }
  }
}
```

### Page Object Example

```typescript
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  private get placeOrderButton() {
    return this.page.getByRole('button', { name: 'Odeslat objednavku' }).first()
  }

  private get minOrderAmountError() {
    return this.page.locator('[data-cy=min_order_amount-error]')
  }

  private get thankYouMessage() {
    return this.page.locator('[data-cy=thank-you]')
  }

  async goToCheckout(checkoutPath: string): Promise<void> {
    await this.goto(checkoutPath)
    await this.closeAnyModal()

    await expect.poll(
      async () => await this.page.evaluate(() =>
        (window as any).$pinia?.checkout?.isLoaded?.value
      ),
      { timeout: 30000, intervals: [500, 1000, 2000] }
    ).toBe(true)
  }

  async placeOrder(): Promise<void> {
    await expect(this.placeOrderButton).toBeEnabled({ timeout: 10000 })
    await this.placeOrderButton.click()
  }

  async verifyOrderPlaced(): Promise<void> {
    await expect(this.thankYouMessage).toBeVisible({ timeout: 60000 })
  }
}
```

## Test Structure

### Basic Test Suite

```typescript
import { test, expect } from '@playwright/test'
import { ProductDetailPage } from '../../pages/ProductDetailPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { getEnvironment } from '../../data/environment'
import { clearCustomerCart } from '../../helpers/graphql/clearCustomerCart'

const env = getEnvironment()

test.describe('Smoke Test: Checkout Flow', () => {
  let productPage: ProductDetailPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ page }) => {
    productPage = new ProductDetailPage(page)
    checkoutPage = new CheckoutPage(page)

    await clearCustomerCart(
      env.magentoUrl,
      env.magentoStore,
      env.user.email,
      env.user.password
    )
  })

  test('Complete checkout flow', async ({ page }) => {
    test.slow()

    await test.step('Add product to cart', async () => {
      await productPage.goToProduct(env.testProduct.url)
      await productPage.addToCart()
    })

    await test.step('Go to checkout', async () => {
      await checkoutPage.goToCheckout(env.urls.checkout)
      expect(await checkoutPage.isCartEmpty()).toBe(false)
    })

    await test.step('Place order', async () => {
      await checkoutPage.placeOrder()
      await checkoutPage.verifyOrderPlaced()
    })
  })
})
```

## Selectors Strategy

### Priority Order (Best to Worst)

1. **data-cy attributes** (Preferred)
```typescript
page.locator('[data-cy=submit-button]')
page.locator('[data-cy=cart-item-quantity-inc]')
```

2. **Role-based selectors** (Accessible, semantic)
```typescript
page.getByRole('button', { name: 'Odeslat objednavku' })
page.getByRole('textbox', { name: 'Email' })
```

3. **Text content** (User-facing, may change with i18n)
```typescript
page.getByText('Pridat do kosiku')
page.getByLabel('Heslo')
```

4. **CSS selectors** (Last resort)
```typescript
page.locator('input[name=email]')
page.locator('.product-tile').first()
```

## Assertions

### Web-First Assertions (Auto-Retry)

```typescript
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()
await expect(button).toBeEnabled()
await expect(button).toBeDisabled()
await expect(locator).toHaveText('Expected text')
await expect(locator).toContainText('partial text')
await expect(locator).toBeVisible({ timeout: 30000 })
```

## Running Tests

### NPM Scripts

```bash
yarn test:pw                # CZ localhost
yarn test:pw:cz:stage       # CZ stage
yarn test:pw:cz:prod        # CZ production
yarn test:pw:cz:multi       # All sections
yarn test:pw:ui             # Playwright UI mode
yarn test:pw:debug          # Debug mode
yarn test:pw:report         # Open HTML report
```

## Best Practices

1. **Page Object Model**: Keep tests clean with reusable page objects
2. **data-cy selectors**: Stable, semantic selectors for testing
3. **Auto-wait**: Let Playwright handle waiting automatically
4. **Web-first assertions**: Use assertions that auto-retry
5. **Test isolation**: Clear state before each test
6. **GraphQL helpers**: Use API for test setup/teardown
7. **Step organization**: Use `test.step` for clear test structure
8. **Modal handling**: Always handle unexpected popups

## Common Anti-Patterns

- Don't use fixed timeouts (`page.waitForTimeout`)
- Don't hardcode selectors in tests - use Page Objects
- Don't use fragile CSS selectors
- Don't ignore modal handling
- Don't skip test isolation
