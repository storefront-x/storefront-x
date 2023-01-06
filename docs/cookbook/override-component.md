# How to override a component

First, you need to know, which component to override and what's its relative path the root of its module (e.g. `atoms/Button.vue`). For this you can either use the `.sfx/ioc/` directory (more info [here](/essentials/sfx)), or you can use [Vue devtools](https://devtools.vuejs.org).

![Vue devtools](../assets/images/vue-devtools.png)

After you located your component, create new file with the same name and in the same directory as the component you want to override in your module. This module has to be loaded after the module in which the original component is located.

### Example

Original component: `theme-tailwind/atoms/Button.vue`

New component: `my-module/atoms/Button.vue`

```javascript
export default {
  modules: [
    // some modules...
    '@storefront-x/theme-tailwind',
    // some modules...
    'my-module',
    // some modules...
  ],
}
```

In development mode, overridden component is hot-module-reloaded so no need to restart dev server. But for the production build, you will need to rebuild the application.

:::tip
Same way you can override basically any file, not only components.
:::
