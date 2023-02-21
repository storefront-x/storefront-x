# Web App Manifest

> `@storefront-x/web-app-manifest`

This module adds support for [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

When enabled, this modules injects meta link to a `<head>`. Resulting manifest can then be found under the `/manifest.webmanifest` URL.

# Customization

Its whole content is configured with the `webAppManifest` concept directory. Every file from these concept directories are used in the resulting manifest response. File names in the concept directories are used as keys in the resulting manifest response and their default exports as values.

### Example

This configuration:

```ts
// modules/my-modules/webAppManifest/name.ts

export default 'My awesome app'
```

Results in this response:

```json
{
  "name": "My awesome app"
}
```
