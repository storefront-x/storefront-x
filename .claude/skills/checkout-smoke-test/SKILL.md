# Checkout Smoke Test (Chrome DevTools MCP)

## Overview

Interactive checkout smoke test using Chrome DevTools MCP. Navigates a real browser through the full SUPPLO checkout flow, capturing screenshots, Pinia store state, network requests, and console errors at each step.

## Prerequisites

- Chrome browser running with DevTools protocol enabled
- SUPPLO frontend running (localhost:3000 or stage URL)
- Test user account: `supplo.test+cz_manual@magexo.cz` / `CustoMer159`

## Usage

Tell Claude: "Run checkout smoke test on CZ localhost" or "Proklikej checkout na CZ stage"

## Flow

Execute these 8 steps sequentially. At each step: take a snapshot, take a screenshot, check console errors, check failed network requests. Save all screenshots to `docs/smoke-reports/{YYYY-MM-DD-HHmm}/`.

### Step 1: Homepage

1. `navigate_page` to the target URL (localhost:3000 or stage)
2. `wait_for` — wait for page content to load
3. `take_screenshot` → save as `01-homepage.png`
4. `take_snapshot` → capture a11y tree
5. `evaluate_script` → check `window.$pinia` exists, get cart state
6. `list_console_messages` → filter for errors
7. `list_network_requests` → filter for failed (4xx/5xx)
8. Report: page loaded, any errors, Pinia state summary

### Step 2: Login

1. `navigate_page` to `/prihlaseni`
2. `wait_for` — wait for login form
3. `take_snapshot` → find email/password input UIDs
4. `fill` email input with `supplo.test+cz_manual@magexo.cz`
5. `fill` password input with `CustoMer159`
6. `take_snapshot` → find sign-in button UID
7. `click` the sign-in button (`[data-cy=sign-in]`)
8. `wait_for` — wait for user name to appear
9. `take_screenshot` → save as `02-login.png`
10. `evaluate_script` → get customer permissions from `$pinia.customer`
11. `list_console_messages` → filter for errors
12. Report: login successful, permissions (beverages/market/beer)

### Step 3: Category Page

1. `navigate_page` to `/napoje`
2. `wait_for` — wait for product tiles
3. `take_screenshot` → save as `03-category.png`
4. `take_snapshot` → find product tile UIDs
5. `click` first in-stock product tile
6. `wait_for` — wait for product detail modal
7. `take_screenshot` → save as `03b-product-modal.png`
8. Report: category loaded, N products visible, modal opened

### Step 4: Add to Cart

1. `take_snapshot` → find add-to-cart button UID in modal
2. `click` the add-to-cart button
3. `wait_for` — wait for success notification
4. `take_screenshot` → save as `04-add-to-cart.png`
5. `evaluate_script` → get cart state from `$pinia.cart`
6. `list_console_messages` → filter for errors
7. Report: product added, cart item count, cart total

### Step 5: Minicart

1. `take_snapshot` → find minicart toggle UID
2. `click` the minicart toggle (`[data-cy=toggle-mini-cart]`)
3. `wait_for` — wait for minicart items
4. `take_screenshot` → save as `05-minicart.png`
5. `take_snapshot` → verify product name in minicart
6. Find and `click` proceed-to-checkout button
7. Report: minicart opened, product visible, navigating to checkout

### Step 6: Checkout Page

1. `wait_for` — wait for checkout to load
2. `take_screenshot` → save as `06-checkout.png`
3. `evaluate_script` → get `$pinia.checkout` state (isLoaded, seller groups, MOA)
4. `list_network_requests` → check GraphQL calls
5. `list_console_messages` → filter for errors
6. Report: checkout loaded, N seller groups, MOA status, shipping/payment selected

### Step 7: Checkout Interactions

1. **Delivery dates**: `take_snapshot` → find unselected date buttons → `click` each → `take_screenshot` → `07a-delivery-dates.png`
2. **Payment method**: `take_snapshot` → find payment dropdown → `click` → select first option → `take_screenshot` → `07b-payment.png`
3. **MOA check**: `evaluate_script` → read MOA from `$pinia.cart.cart.sellerGroups[*].groupMessages` → if not met, find quantity increment buttons → `click` repeatedly → `take_screenshot` → `07c-moa.png`
4. Report: delivery dates set, payment selected, MOA status

### Step 8: Place Order

1. `take_snapshot` → find place order button
2. `evaluate_script` → verify cart validation passes
3. `take_screenshot` → save as `08a-before-place-order.png`
4. `click` the place order button
5. `wait_for` — wait for "Dekujeme" / thank you text (timeout 60s)
6. `take_screenshot` → save as `08b-thank-you.png`
7. `evaluate_script` → get order number if visible
8. `list_console_messages` → capture any errors during order placement
9. `list_network_requests` → check for failed requests
10. Report: order placed (or failed), order number, any errors

## Report Template

After completing all steps, output a summary:

```markdown
## Checkout Smoke Report — {COUNTRY} {ENVIRONMENT}
Date: {YYYY-MM-DD HH:MM}

### Step 1: Homepage {STATUS}
- Screenshot: {path}
- Console errors: {count}
- Failed network requests: {count}
- Pinia: {summary}

### Step 2: Login {STATUS}
- Screenshot: {path}
- User: {email}
- Permissions: beverages={bool}, marketplace={bool}, beer={bool}

### Step 3: Category {STATUS}
- Screenshot: {path}, {path_modal}
- Products visible: {count}

### Step 4: Add to Cart {STATUS}
- Screenshot: {path}
- Cart items: {count}
- Cart total: {amount}

### Step 5: Minicart {STATUS}
- Screenshot: {path}
- Product in minicart: {name}

### Step 6: Checkout {STATUS}
- Screenshot: {path}
- Seller groups: {count}
- MOA met: {bool}
- Console errors: {count}

### Step 7: Checkout Interactions {STATUS}
- Screenshots: {paths}
- Delivery dates set: {bool}
- Payment selected: {bool}
- MOA met after increment: {bool}

### Step 8: Place Order {STATUS}
- Screenshots: {paths}
- Order number: {number}
- Console errors: {count}
- Failed requests: {count}

---

### Summary
- Steps: {passed}/{total} passed
- Console errors: {total_count} total
- Failed network requests: {total_count} total
- Order placed: {order_number or FAILED}
```

## Environment Configs

| Country | Localhost | Stage |
|---------|----------|-------|
| CZ | `http://localhost:3000` | `https://cz.supplodev12.hypernode.io` (auth: supplo/supplo) |
| SK | `http://localhost:3000` | TBD |
| SI | `http://localhost:3000` | TBD |

### CZ URLs
- Sign in: `/prihlaseni`
- Category Napoje: `/napoje`
- Checkout: `/kosik`
- Thank you: `/dekujeme`

### CZ Test User
- Email: `supplo.test+cz_manual@magexo.cz`
- Password: `CustoMer159`

### Key data-cy Selectors
- Sign in button: `[data-cy=sign-in]`
- User name: `[data-cy=user-name]`
- Product tile: `[data-cy=product-tile]`
- In-stock product: `[data-cy=product-title-link-stock-IN_STOCK]`
- Product modal: `[data-cy=product-detail-modal]`
- Add to cart: `[data-cy=add-to-cart]` (inside `[data-cy=product-attributes]`)
- Success notification: `[data-cy=notification-type-SUCCESS]`
- Minicart toggle: `[data-cy=toggle-mini-cart]`
- Minicart item: `[data-cy=minicart-item-name]`
- Proceed to checkout: `[data-cy=proceed-to-checkout-button]`
- Delivery date unselected: `[data-cy=delivery-date-not-selected]`
- Place order: `button` with text "Odeslat objednavku"
- Thank you: `[data-cy=thank-you]`
- Order number: `[data-cy=thank-you-order-number]`
- Cart quantity increment: `[data-cy=cart-item-quantity-inc]`
- MOA error: `[data-cy=min_order_amount-error]`
- Modal close: `[data-cy=modal-close-button]`
- News modal: `[data-cy=supplo-news-modal]`
