---
alwaysApply: true
---
# E2E Testing with Cypress - SUPPLO Project Rules

## Framework Overview
This project uses Cypress for end-to-end testing.
- **Version**: Cypress 13+
- **Pattern**: Page Object Model (POM)
- **Location**: `modules/supplo-common/cypress/` (shared) + `/cypress/` (root)
- **Language**: JavaScript for tests, TypeScript for commands/repositories
- **Countries**: CZ (Czech Republic), SK (Slovakia), SI (Slovenia), HR (Croatia)

## Project Structure

```
# Shared test infrastructure
modules/supplo-common/cypress/
├── commands/            # Custom Cypress commands (TypeScript)
│   ├── waitForSfx.ts
│   ├── waitForCartStore.ts
│   ├── waitForCheckoutStore.ts
│   ├── waitForNavigation.ts
│   ├── routerPush.ts
│   └── cypressGrep.ts
├── e2e/                 # Shared test specs (JavaScript)
│   ├── account.cy.js
│   ├── checkout.cy.js
│   ├── product.cy.js
│   ├── minicart.cy.js
│   ├── wishlist.cy.js
│   └── ...
└── support/
    ├── pageObjects/     # Page Object files (JavaScript)
    │   ├── account/
    │   ├── checkout/
    │   ├── product/
    │   ├── minicart/
    │   ├── navigation/
    │   └── ...
    └── repositories/    # GraphQL operations (TypeScript)
        ├── ClearCustomerCart.ts
        ├── ClearCustomerWishlist.ts
        └── ...

# Country-specific configurations
modules/supplo-cz/cypress/configs/
├── cz_localhost.config.ts
├── cz_stage.config.ts
└── cz_prod.config.ts

modules/supplo-sk/cypress/configs/
├── sk_localhost.config.ts
├── sk_stage.config.ts
└── sk_prod.config.ts

modules/supplo-si/cypress/configs/
├── si_localhost.config.ts
├── si_stage.config.ts
└── si_prod.config.ts

modules/supplo-hr/cypress/configs/
├── hr_localhost.config.ts
├── hr_stage.config.ts
└── hr_prod.config.ts

# Root-level tests (additional)
cypress/
├── e2e/                 # Additional test specs
│   ├── brands-filtering.cy.js
│   ├── deliveryDates.cy.js
│   ├── returnablePackaging.cy.js
│   ├── checkoutMirakl.cy.js
│   └── ...
└── support/
    ├── index.ts         # Command imports
    └── pageObjects/     # Additional page objects
        └── ...
```

## Test File Naming

- Test files: `*.cy.js` (e.g., `checkout.cy.js`, `product.cy.js`)
- Page objects: `*.js` (e.g., `login.js`, `addToCart.js`)
- Custom commands: `*.ts` (e.g., `waitForSfx.ts`, `routerPush.ts`)
- Repositories: `*.ts` or `*.js` (e.g., `ClearCustomerCart.ts`)
- Config files: `*.config.ts` (e.g., `cz_localhost.config.ts`, `sk_stage.config.ts`)

## Test Files Location

SUPPLO project has tests in two locations:

1. **Shared tests** (run for all countries): `modules/supplo-common/cypress/e2e/`
   - `account.cy.js` - Account/authentication tests
   - `checkout.cy.js` - Checkout flow tests
   - `product.cy.js` - Product detail tests
   - `minicart.cy.js` - Minicart tests
   - `wishlist.cy.js` - Wishlist tests
   - `category.cy.js` - Category listing tests
   - `search.cy.js` - Search functionality tests
   - `homepage.cy.js` - Homepage tests
   - `homepageMobile.cy.js` - Mobile homepage tests
   - `cms.cy.js` - CMS pages tests
   - `brands.cy.js` - Brands page tests

2. **Additional tests** (root level): `cypress/e2e/`
   - `brands-filtering.cy.js` - Brand filtering tests
   - `deliveryDates.cy.js` - Delivery date tests
   - `returnablePackaging.cy.js` - Returnable packaging tests
   - `checkoutMirakl.cy.js` - Mirakl marketplace checkout tests

## Page Object Pattern

### Getter Functions (Get Elements)
```javascript
// File: support/pageObjects/checkout/getPlaceOrderButton.js
export default () => cy.get('[data-cy=place-order]')
```

### Action Functions (Perform Actions)
```javascript
// File: support/pageObjects/checkout/fillShippingInfo.js
export default () => {
  cy.get('input[name=firstName]').type('Tester')
  cy.get('input[name=lastName]').type('Testovič')
  cy.get('input[name=telephone]').type('123456789')
  cy.get('input[name=street]').type('Testovací 123')
  cy.get('input[name=city]').type('Brno')
  cy.get('input[name=postcode]').type('12345')
  cy.get('select[name=countryCode]').select('CZ')
  cy.get('select[name=regionId]').select('615')
}
```

### Class-based Page Objects (Credentials/Data)
```javascript
// File: support/pageObjects/account/AccountCredentials.js
const env = Cypress.env()

export default class AccountCredentials {
  constructor(params = {}) {
    this.firstName = params.firstName ?? env?.data?.user.firstName
    this.lastName = params.lastName ?? env?.data?.user.lastName
    this.email = params.email ?? env?.data?.user.email
    this.password = params.password ?? env?.data?.user.password
  }
}
```

## Test Structure

### Basic Test Suite
```javascript
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'
import clearBrowser from '~/cypress/support/pageObjects/navigation/clearBrowser'
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'

describe('Account', { tags: 'cz' }, () => {
  let accountCredentials

  beforeEach(() => {
    accountCredentials = new AccountCredentials()
    clearBrowser()
    cy.visit('/').waitForSfx()
  })

  it('supports login', () => {
    login(accountCredentials)
  })

  it('supports logout', () => {
    login(accountCredentials)
    logout(accountCredentials)
  })
})
```

### Test Suite with Test Isolation Disabled
```javascript
describe('Checkout guest customer', { tags: 'cz', testIsolation: false }, () => {
  const env = Cypress.env()

  before(() => {
    clearBrowser()
    cy.visit(env.data.categoryToVisit).waitForSfx()
    visitRandomProductDetailInStock()
  })

  it('add product to cart', () => {
    addToCart()
  })

  it('set guest email', () => {
    cy.visit(env.data.url.checkout).waitForSfx()
    getGuestEmail().type('guest@example.com')
    getGuestEmailButton().click()
    getGuestEmailSaved().should('be.visible')
  })
})
```

## Selectors Strategy

### Priority Order
1. **data-cy attributes** (Preferred)
   ```javascript
   cy.get('[data-cy=place-order]')
   cy.get('[data-cy=add-to-cart]')
   ```

2. **Form field names**
   ```javascript
   cy.get('input[name=firstName]')
   cy.get('select[name=countryCode]')
   ```

3. **Other selectors** (when necessary)
   ```javascript
   cy.get('.product-tile').first()
   ```

### Adding data-cy Attributes
Always add `data-cy` attributes to interactive elements:
```vue
<template>
  <button data-cy="submit-button" @click="handleSubmit">
    Submit
  </button>

  <div data-cy="success-message">
    Success!
  </div>
</template>
```

## Custom Commands

SUPPLO project includes several custom Cypress commands located in `modules/supplo-common/cypress/commands/`:

### waitForSfx()
Wait for Storefront X to fully load:
```javascript
cy.visit('/').waitForSfx()
cy.visit('/checkout').waitForSfx()
cy.reload().waitForSfx()
```

### waitForCartStore()
Wait for cart store to be initialized:
```javascript
cy.routerPush('/kosik').waitForCartStore()
```

### waitForCheckoutStore()
Wait for checkout store to be initialized:
```javascript
cy.routerPush('/checkout').waitForCheckoutStore()
```

### waitForNavigation()
Wait for router navigation to complete:
```javascript
cy.get('[data-cy=place-order-button]').click()
cy.waitForNavigation()
cy.get('[data-cy=thank-you]').should('be.visible')
```

### routerPush()
Navigate using Vue Router (faster than cy.visit):
```javascript
cy.routerPush('/produkty')
cy.routerPush('/kosik').waitForCartStore()
cy.routerPush(env.data.checkout).waitForCheckoutStore()
```

### clearBrowser()
Clear all browser state before tests:
```javascript
import clearBrowser from '~/cypress/support/pageObjects/navigation/clearBrowser'

beforeEach(() => {
  clearBrowser()
  cy.visit('/').waitForSfx()
})
```

## Configuration

### Environment-Specific Configs

Configurations are organized by country and environment. Each country has its own module with configs.

**Example - Czech Republic Localhost:**
```typescript
// modules/supplo-cz/cypress/configs/cz_localhost.config.ts
import { resolve } from 'node:path'
import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

const baseUrl = 'http://localhost:3000'
const adminUrl = 'https://master-supplo-be.magexo.cloud/mx_admin'

export default defineConfig({
  e2e: {
    env: {
      data: {
        url: {
          homepage: `${baseUrl}/`,
          checkout: `${baseUrl}/kosik`,
          signIn: '/prihlaseni',
          admin: `${adminUrl}/`,
        },
        user: {
          email: 'supplo.test+cz_manual@magexo.cz',
          placeOrderEmail: 'supplo.test+cz_superuser_1@magexo.cz',
          password: 'CustoMer159',
          firstName: 'Cypress',
          firstNamePlaceOrder: 'My Food',
          lastName: 'Test',
          street: 'Betnavska cesta',
          streetNumber: '159',
          city: 'Maribor',
          postcode: '2000',
          countryCode: 'CZ',
        },
        company: {
          companyId: '08379114',
        },
        searchString: 'kofo',
        mainCategoryId: '467',
        categoryId: 552,
        categoryToVisit: '/produkty',
        marketPlaceCategoryToVisit: '/marketplace/zarizeni',
        marketPlaceFarmaCategoryToVisit: '/marketplace/farma',
        miraklMainCategoryId: 2647,
        categoryUidToFilterProducts: 'NTUy',
        miraklCategoryUidToFilterProducts: 'MjY0Nw==',
        salesPromoItemSku: 'P041211',
        marketCategoryUidToFilterProducts: 'MTUzNQ==',
        farmCategoryUidToFilterProducts: 'MjY2NQ==',
      },
      grepFilteredSpecs: true,
      grepOmitFiltered: true,
      grepIntegrationFolder: '../../../../cypress/e2e',
    },
    baseUrl: `${baseUrl}`,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    supportFile: 'cypress/support/index.ts',
    defaultCommandTimeout: 20000,
    retries: {
      runMode: 0,
    },
    scrollBehavior: 'center',
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor(resolve(process.cwd(), '../../../../viteCypress.config.js')))
      return config
    },
  },
})
```

## Test Organization

### Page Object Categories

**Account:**
- `login.js` - Login flow
- `logout.js` - Logout flow
- `prepareLogin.js` - Prepare login with session storage
- `AccountCredentials.js` - User credentials class
- `checkoutPhoneNumber.js` - Phone number for checkout
- `getSignInHeaderButton.js` - Get sign in button
- `getUserName.js` - Get logged user name

**Checkout:**
- `validatePlaceOrder.js` - Validate place order button state
- `confirmRemovalInModal.js` - Confirm item removal in modal
- `keepRemovalInModal.js` - Keep item (cancel removal)
- `incCartItemQuantity.js` - Increment cart item quantity
- `decCartItemQuantity.js` - Decrement cart item quantity
- `setCartItemQuantity.js` - Set cart item quantity
- `getCartItemQuantity.js` - Get cart item quantity
- `incBeverageCartItemQuantityUntilMoAandMoQReached.js` - Increment beverage quantity until minimum order amount/quantity reached
- `getOrderSummaryItemTitle.js` - Get order summary item title
- `getRemoveOrderSummaryItem.js` - Get remove item button
- `fillShippingInfo.js` - Fill shipping form
- `selectShipping.js` - Select shipping method
- `selectPayment.js` - Select payment method
- `placeOrder.js` - Place order
- `confirmAgreements.js` - Confirm terms and conditions
- `setCoupon.js` - Apply coupon code
- `removeCoupon.js` - Remove coupon code

**Product:**
- `addToCart.js` - Add product to cart from detail
- `addToCartFromProductTile.js` - Add product to cart from listing
- `visitRandomProductDetailInStock.js` - Visit random in-stock product
- `incCartItemQuantityOnProduct.js` - Increment quantity on product detail
- `decCartItemQuantityOnProduct.js` - Decrement quantity on product detail
- `setCartItemQuantityOnProduct.js` - Set quantity on product detail
- `getCartItemQuantityOnProduct.js` - Get quantity on product detail
- `waitForQuantityInCartToChange.js` - Wait for quantity change
- `addToWishlist.js` - Add product to wishlist
- `getAddToWishlist.js` - Get add to wishlist button

**Minicart:**
- `expectMicrocartCartItemsTotalQuantity.js` - Verify minicart quantity
- `getMinicartItemTitle.js` - Get minicart item title
- `getMinOrderError.js` - Get minimum order error
- `getMinQtyError.js` - Get minimum quantity error
- `getRemoveMinicartItem.js` - Get remove item button
- `getSalesOrderMessage.js` - Get sales order message
- `getSellerCartItem.js` - Get seller cart item

**Brands:**
- `visitBrands.js` - Navigate to brands page
- `searchInBrands.js` - Search in brands
- `getBrandsContainer.js` - Get brands container

**Navigation:**
- `clearBrowser.js` - Clear browser state (cookies, localStorage, sessionStorage)

**Modal:**
- `closeModal.js` - Close modal dialog

**Cookies:**
- `consentCookies.js` - Accept cookies consent

## Best Practices

### 1. Use Page Objects
```javascript
import getPlaceOrderButton from '~/cypress/support/pageObjects/checkout/getPlaceOrderButton'
import fillShippingInfo from '~/cypress/support/pageObjects/checkout/fillShippingInfo'

it('completes checkout', () => {
  fillShippingInfo()
  getPlaceOrderButton().click()
})
```

### 2. Use data-cy Selectors
```javascript
cy.get('[data-cy=submit-button]')
cy.get('[data-cy=success-message]')
```

### 3. Wait for Application Load
```javascript
cy.visit('/').waitForSfx()
cy.reload().waitForSfx()
```

### 4. Clear State Between Tests
```javascript
beforeEach(() => {
  clearBrowser()
  cy.visit('/').waitForSfx()
})
```

### 5. Use Test Tags
```javascript
describe('Checkout', { tags: 'cz' }, () => {
  // Tests specific to CZ store
})

describe('Product', { tags: ['cz', 'smoke'] }, () => {
  // Smoke tests for CZ store
})
```

### 6. Test Isolation
```javascript
// Enable test isolation (default) - clean state for each test
describe('Independent tests', () => {
  it('test 1', () => {})
  it('test 2', () => {})
})

// Disable for sequential tests (faster, but stateful)
describe('Sequential flow', { testIsolation: false }, () => {
  before(() => {
    // Setup once
  })

  it('step 1', () => {})
  it('step 2', () => {})
})
```

## Common Patterns

### Testing Checkout Flow
```javascript
import ClearCustomerCart from '~/cypress/support/repositories/ClearCustomerCart'
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import validatePlaceOrder from '~/cypress/support/pageObjects/checkout/validatePlaceOrder'
import incBeverageCartItemQuantityUntilMoAandMoQReached from '~/cypress/support/pageObjects/checkout/incBeverageCartItemQuantityUntilMoAandMoQReached'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import visitRandomProductDetailInStock from '~/cypress/support/pageObjects/product/visitRandomProductDetailInStock'
import clearBrowser from '~/cypress/support/pageObjects/navigation/clearBrowser'
import prepareLogin from '~/cypress/support/pageObjects/account/prepareLogin'

describe('Checkout with 1P products', { tags: ['cz', 'sk'], testIsolation: false }, () => {
  let accountCredentials
  const env = Cypress.env()
  const checkout = env?.data?.checkout ?? '/checkout'

  before(() => {
    clearBrowser()
    accountCredentials = new AccountCredentials()
    ClearCustomerCart(accountCredentials)
    prepareLogin('checkout-account', accountCredentials)

    cy.routerPush(env.data.categoryToVisit)
    visitRandomProductDetailInStock()
  })

  it('checkout has selected shipping address, billing address, shipping method and payment method', () => {
    addToCart()
    cy.routerPush(checkout).waitForCheckoutStore()
    incBeverageCartItemQuantityUntilMoAandMoQReached()
    validatePlaceOrder()
  })
})
```

### Testing Authentication
```javascript
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import login from '~/cypress/support/pageObjects/account/login'
import prepareLogin from '~/cypress/support/pageObjects/account/prepareLogin'
import ClearCustomerCart from '~/cypress/support/repositories/ClearCustomerCart'

// Method 1: Standard login
it('logs in user', () => {
  const credentials = new AccountCredentials()
  login(credentials)
  getUserName().should('be.visible')
})

// Method 2: Prepare login with session storage (faster for test setup)
before(() => {
  clearBrowser()
  accountCredentials = new AccountCredentials()
  ClearCustomerCart(accountCredentials)
  prepareLogin('checkout-account', accountCredentials)
})
```

## Running Tests

### Package.json Scripts

**Open Cypress UI (Interactive Mode):**
```bash
# Czech Republic
yarn cypress:open:cz_localhost
yarn cypress:open:cz_stage
yarn cypress:open:cz_prod

# Slovakia
yarn cypress:open:sk_localhost
yarn cypress:open:sk_stage
yarn cypress:open:sk_prod

# Slovenia
yarn cypress:open:si_localhost
yarn cypress:open:si_stage
yarn cypress:open:si_prod

# Croatia
yarn cypress:open:hr_localhost
yarn cypress:open:hr_stage
yarn cypress:open:hr_prod
```

**Run Tests (Headless Mode):**
```bash
# Czech Republic
yarn cypress:run:cz_localhost
yarn cypress:run:cz_stage
yarn cypress:run:cz_prod

# Slovakia
yarn cypress:run:sk_localhost
yarn cypress:run:sk_stage
yarn cypress:run:sk_prod

# Slovenia
yarn cypress:run:si_localhost
yarn cypress:run:si_stage
yarn cypress:run:si_prod

# Croatia
yarn cypress:run:hr_localhost
yarn cypress:run:hr_stage
yarn cypress:run:hr_prod
```

### Filter by Tags
```bash
yarn cypress:run:cz_stage --env grepTags=cz
yarn cypress:run:sk_prod --env grepTags=smoke
yarn cypress:run:cz_localhost --env grepTags="stage mirakl"
```

## Writing New Tests

### Step 1: Create Page Objects

**Getter (support/pageObjects/myFeature/getMyElement.js):**
```javascript
export default () => cy.get('[data-cy=my-element]')
```

**Action (support/pageObjects/myFeature/performMyAction.js):**
```javascript
export default (params) => {
  cy.get('input[name=field1]').type(params.field1)
  cy.get('input[name=field2]').type(params.field2)
  cy.get('[data-cy=submit]').click()
}
```

### Step 2: Create Test Spec

**e2e/myFeature.cy.js:**
```javascript
import getMyElement from '~/cypress/support/pageObjects/myFeature/getMyElement'
import performMyAction from '~/cypress/support/pageObjects/myFeature/performMyAction'
import clearBrowser from '~/cypress/support/pageObjects/navigation/clearBrowser'

describe('My Feature', { tags: 'cz' }, () => {
  beforeEach(() => {
    clearBrowser()
    cy.visit('/').waitForSfx()
  })

  it('performs the action', () => {
    performMyAction({ field1: 'value1', field2: 'value2' })
    getMyElement().should('be.visible')
  })
})
```

## Common Anti-Patterns to Avoid

- Don't hardcode selectors in test files - use Page Objects
- Don't use fragile CSS selectors - use `data-cy` attributes
- Don't forget to wait for SFX and stores after navigation
- Don't duplicate page object logic across tests

## Summary

1. **Always use Page Object Pattern** - Keep tests clean and maintainable
2. **Prefer data-cy selectors** - Stable and semantic
3. **Clear browser state** - Use `clearBrowser()` before tests
4. **Wait for SFX** - Use `.waitForSfx()` after navigation
5. **Use routerPush** - Faster than cy.visit() for internal navigation
6. **Wait for stores** - Use `.waitForCartStore()` and `.waitForCheckoutStore()`
7. **Organize by domain** - Group page objects by feature area
8. **Use environment configs** - Country-specific configs for CZ, SK, SI, HR
9. **Tag tests properly** - Use country and environment tags
10. **Use GraphQL repositories** - Clear test data before tests
