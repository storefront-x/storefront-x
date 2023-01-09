# Atomic Design

> `@storefront-x/atomic-design`

Module allowing component structure of [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/). It is a good patter for keeping large amount of components organized, but it's not required and other patterns might be used.

## `atoms/` IoC concept

Atoms are the most simple and most general components (button, label, input, etc.). They shouldn't contain other components.

## `molecules/` IoC concept

Molecules combine one or more atoms into more complex components (form input, search bar, product tile, etc.). While these components can sometimes be used on their own, most of the time, they require a context.

## `organisms/` IoC concept

Organisms are components that have meaning on their own (product listing, header, footer, etc.).

## `templates/` IoC concept

Templates are whole pages (product detail, search results page, etc.), except the data fetching logic. That stays inside pages.
