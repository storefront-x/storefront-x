import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import OrderItemInterface from '#ioc/graphql/fragments/OrderItemInterface'
import OrderAddress from '#ioc/graphql/fragments/OrderAddress'
import PaymentMethod from '#ioc/graphql/fragments/PaymentMethod'
import DiscountItem from '#ioc/graphql/fragments/DiscountItem'
import TaxItem from '#ioc/graphql/fragments/TaxItem'

export default () =>
  query()
    .cantBeCached()
    .fields({
      customer: field({
        orders: field({
          items: field({
            id: field(),
            number: field(),
            order_date: field(),
            status: field(),
            carrier: field(),
            shipping_method: field(),
            items: field({
              ...OrderItemInterface(),
            }),
            shipping_address: field({
              ...OrderAddress(),
            }),
            billing_address: field({
              ...OrderAddress(),
            }),
            payment_methods: field({
              ...PaymentMethod(),
            }),
            total: field({
              discounts: field({
                ...DiscountItem(),
              }),
              base_grand_total: field({
                value: field(),
                currency: field(),
              }),
              grand_total: field({
                value: field(),
                currency: field(),
              }),
              total_tax: field({
                value: field(),
                currency: field(),
              }),
              subtotal: field({
                value: field(),
                currency: field(),
              }),
              taxes: field({
                ...TaxItem(),
              }),
              total_shipping: field({
                value: field(),
                currency: field(),
              }),
              shipping_handling: field({
                amount_including_tax: field({
                  value: field(),
                  currency: field(),
                }),
                amount_excluding_tax: field({
                  value: field(),
                  currency: field(),
                }),
                total_amount: field({
                  value: field(),
                  currency: field(),
                }),
                taxes: field({
                  ...TaxItem(),
                }),
              }),
            }),
          }),
        }),
      }),
    })
