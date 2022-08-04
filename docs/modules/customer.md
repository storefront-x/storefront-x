# Customer

> `@storefront-x/customer`

Module for e-commerce customer account (sign-in, sign-out, account page). Requires corresponding integration module (e.g. `@storefront-x/wishlist-customer`).

## `useCustomer` composable

Adds presentation logic to customer data.

:::tip
This composable should not contain mutating logic.
:::

## `useGetCustomer` service

Fetches customer.

## `useCustomerStore` store

Contains global data for customer.

:::tip
This store should be initialized in `serverInit` action in accompanying integration module.
:::
