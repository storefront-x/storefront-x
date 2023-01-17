<p align="center">
  <a href="https://docs.storefrontx.io" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://docs.storefrontx.io/logo-square.svg" alt="Storefront X logo">
  </a>
</p>

# Storefront X

Modern e-commerce platform for building performant PWAs with server-side rendering for unmatched customer experience and SEO

[Read the Docs to learn More.](https://docs.storefrontx.io)

## Contributing

See [Contributing Guide](https://docs.storefrontx.io/contributing.html).


## Local install

0. export NODE_TLS_REJECT_UNAUTHORIZED=0
1. yarn install

2. add  
```secure: false,``` 
to
modules/magento/server/routes/_magento.ts:11

3. Set magento BE URL in modules/demo-magento/config/MAGENTO_URL.ts:1
``` export default 'https://b2b-cz-master-commerce-core.magexo.cloud/' ```

4. Check modules/demo-magento/config/VUE_I18N_LOCALES.ts:3 with proper store codes

5. yarn build --config storefront-x.magento.config.js
6. yarn dev --config  storefront-x.magento.config.js
7. yarn serve
