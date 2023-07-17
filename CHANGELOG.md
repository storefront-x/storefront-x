## v1.17.0 (2023-03-29)

#### :rocket: Enhancement

- [#390](https://github.com/storefront-x/storefront-x/pull/390) Added fallback for CMS page title, refactoring head on pages ([@fajmanm](https://github.com/fajmanm))
- [#404](https://github.com/storefront-x/storefront-x/pull/404) Added debug-tools startup check for Node version ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#400](https://github.com/storefront-x/storefront-x/pull/400) Added support for mobile image in PB banner ([@fajmanm](https://github.com/fajmanm))
- [#405](https://github.com/storefront-x/storefront-x/pull/405) Improved product labels fragment extension ([@fajmanm](https://github.com/fajmanm))

#### :bug: Bug Fix

- [#403](https://github.com/storefront-x/storefront-x/pull/403) Fixed error handling ([@adamjedlicka](https://github.com/adamjedlicka))
- [#402](https://github.com/storefront-x/storefront-x/pull/402) Fix build & serve commands when used over NPM ([@adamjedlicka](https://github.com/adamjedlicka))

#### :memo: Documentation

- [#396](https://github.com/storefront-x/storefront-x/pull/396) Added documentation for extendingConcept ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#398](https://github.com/storefront-x/storefront-x/pull/398) Removed npm from documentation ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :house: Internal

- [#401](https://github.com/storefront-x/storefront-x/pull/401) Add env var for Lets Encrypt certificates ([@zimalmagexo](https://github.com/zimalmagexo))

#### Committers: 4

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- Martin Fajman ([@fajmanm](https://github.com/fajmanm))
- [@zimalmagexo](https://github.com/zimalmagexo)

## v1.16.2 (2023-03-20)

#### :bug: Bug Fix

- [#397](https://github.com/storefront-x/storefront-x/pull/397) Fix hotfix remove debug-toos ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :rocket: Enhancement

- [#395](https://github.com/storefront-x/storefront-x/pull/395) Add extensions to GeneratingConcept ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 1

- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.16.1 (2023-03-09)

#### :bug: Bug Fix

- [#394](https://github.com/storefront-x/storefront-x/pull/394) Fix "unusable" error caused by debug-tools ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.16.0 (2023-03-08)

#### :rocket: Enhancement

- [#389](https://github.com/storefront-x/storefront-x/pull/389) Add debug tools ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#392](https://github.com/storefront-x/storefront-x/pull/392) Allow vite.config.js in the root directory ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.15.3 (2023-03-07)

#### :rocket: Enhancement

- [#387](https://github.com/storefront-x/storefront-x/pull/387) Add Cypress tests for microcart ([@xvyslo05](https://github.com/xvyslo05))

#### :house: Internal

- [#391](https://github.com/storefront-x/storefront-x/pull/391) Don't remove Magento tags on no-cache ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 2

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Robin Vysloužil ([@xvyslo05](https://github.com/xvyslo05))

## v1.15.2 (2023-02-28)

#### :rocket: Enhancement

- [#380](https://github.com/storefront-x/storefront-x/pull/380) Optimize fetching of BlogGrid on HP ([@adamjedlicka](https://github.com/adamjedlicka))
- [#382](https://github.com/storefront-x/storefront-x/pull/382) Add support for verbose request profiler ([@adamjedlicka](https://github.com/adamjedlicka))
- [#377](https://github.com/storefront-x/storefront-x/pull/377) Add messages to thrown errors ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :bug: Bug Fix

- [#386](https://github.com/storefront-x/storefront-x/pull/386) Fix async attr in cookie script ([@fajmanm](https://github.com/fajmanm))
- [#383](https://github.com/storefront-x/storefront-x/pull/383) Fix Newsletter double-opt-in to work with vue-router ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :house: Internal

- [#385](https://github.com/storefront-x/storefront-x/pull/385) Disable CSS code splitting ([@adamjedlicka](https://github.com/adamjedlicka))
- [#381](https://github.com/storefront-x/storefront-x/pull/381) Move Vite cache to the root directory ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 3

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- Martin Fajman ([@fajmanm](https://github.com/fajmanm))

## v1.15.1 (2023-02-24)

#### :rocket: Enhancement

- [#374](https://github.com/storefront-x/storefront-x/pull/374) Improve typing of useResource ([@adamjedlicka](https://github.com/adamjedlicka))
- [#372](https://github.com/storefront-x/storefront-x/pull/372) Move error handling to top level error handlers ([@adamjedlicka](https://github.com/adamjedlicka))
- [#371](https://github.com/storefront-x/storefront-x/pull/371) Handle unhandledrejection events ([@adamjedlicka](https://github.com/adamjedlicka))
- [#370](https://github.com/storefront-x/storefront-x/pull/370) Error notifications no longer hide automatically ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#375](https://github.com/storefront-x/storefront-x/pull/375) Fix typing of useRoute ([@adamjedlicka](https://github.com/adamjedlicka))

#### :memo: Documentation

- [#373](https://github.com/storefront-x/storefront-x/pull/373) Add docs for request profiler ([@adamjedlicka](https://github.com/adamjedlicka))

#### :house: Internal

- [#369](https://github.com/storefront-x/storefront-x/pull/369) Improve create script testing ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.15.0 (2023-02-24)

#### :rocket: Enhancement

- [#368](https://github.com/storefront-x/storefront-x/pull/368) Add request-profiler module ([@adamjedlicka](https://github.com/adamjedlicka))
- [#366](https://github.com/storefront-x/storefront-x/pull/366) Improve performance by removing blocking scripts and SW asset caching ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#367](https://github.com/storefront-x/storefront-x/pull/367) Add names to GraphQL requests ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 2

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.14.0 (2023-02-22)

#### :rocket: Enhancement

- [#360](https://github.com/storefront-x/storefront-x/pull/360) Improve PWA functionalities ([@DaDlugosch](https://github.com/DaDlugosch))

#### :bug: Bug Fix

- [#365](https://github.com/storefront-x/storefront-x/pull/365) Fix duplicated carousel in pb-products ([@fajmanm](https://github.com/fajmanm))

#### Committers: 2

- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Martin Fajman ([@fajmanm](https://github.com/fajmanm))

## v1.13.1 (2023-02-20)

#### :bug: Bug Fix

- [#364](https://github.com/storefront-x/storefront-x/pull/364) Remove old usePbProducts composable ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.13.0 (2023-02-20)

#### :boom: Breaking Change

- [#363](https://github.com/storefront-x/storefront-x/pull/363) Remove Shopware integration ([@adamjedlicka](https://github.com/adamjedlicka))

#### :rocket: Enhancement

- [#355](https://github.com/storefront-x/storefront-x/pull/355) Add support for PageBuilder dynamic blocks ([@kubo12312](https://github.com/kubo12312))
- [#358](https://github.com/storefront-x/storefront-x/pull/358) Add support for Product Grid in PB product component ([@fajmanm](https://github.com/fajmanm))

#### :bug: Bug Fix

- [#362](https://github.com/storefront-x/storefront-x/pull/362) Fix double fetching in vue-router ([@adamjedlicka](https://github.com/adamjedlicka))
- [#357](https://github.com/storefront-x/storefront-x/pull/357) Fix data mapping for password reset ([@DaDlugosch](https://github.com/DaDlugosch))

#### :house: Internal

- [#359](https://github.com/storefront-x/storefront-x/pull/359) Cancel old workflows ([@kubo12312](https://github.com/kubo12312))
- [#361](https://github.com/storefront-x/storefront-x/pull/361) Upgrade deps ([@adamjedlicka](https://github.com/adamjedlicka))
- [#354](https://github.com/storefront-x/storefront-x/pull/354) Use symlinks for demo modules ([@kubo12312](https://github.com/kubo12312))
- [#353](https://github.com/storefront-x/storefront-x/pull/353) Improve testing of create-script module ([@kubo12312](https://github.com/kubo12312))
- [#356](https://github.com/storefront-x/storefront-x/pull/356) Publish docs on GitHub Pages ([@DaDlugosch](https://github.com/DaDlugosch))

#### Committers: 4

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Martin Fajman ([@fajmanm](https://github.com/fajmanm))

## v1.12.0 (2023-02-15)

#### :rocket: Enhancement

- [#349](https://github.com/storefront-x/storefront-x/pull/349) Log MagentoError in dev mode ([@adamjedlicka](https://github.com/adamjedlicka))
- [#198](https://github.com/storefront-x/storefront-x/pull/198) Implement product comparison ([@JaroslavSku](https://github.com/JaroslavSku))
- [#346](https://github.com/storefront-x/storefront-x/pull/346) Add option to set Sentry environment ([@adamjedlicka](https://github.com/adamjedlicka))
- [#341](https://github.com/storefront-x/storefront-x/pull/341) Add support for runtime config ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#351](https://github.com/storefront-x/storefront-x/pull/351) Fix CMS pages in demo/px ([@adamjedlicka](https://github.com/adamjedlicka))

#### :house: Internal

- [#348](https://github.com/storefront-x/storefront-x/pull/348) Retry MxCloud deploy on failure ([@DaDlugosch](https://github.com/DaDlugosch))
- [#338](https://github.com/storefront-x/storefront-x/pull/338) Create Cypress videos and screenshots for failed tests ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#345](https://github.com/storefront-x/storefront-x/pull/345) Dead-code eliminate bus emitters without listeners ([@DaDlugosch](https://github.com/DaDlugosch))
- [#337](https://github.com/storefront-x/storefront-x/pull/337) Set common build step for GitHub CI workflows ([@DaDlugosch](https://github.com/DaDlugosch))

#### Committers: 4

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [@JaroslavSku](https://github.com/JaroslavSku)

## v1.11.0 (2023-02-10)

#### :rocket: Enhancement

- [#343](https://github.com/storefront-x/storefront-x/pull/343) Support newsletter double opt-in trough email link ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :bug: Bug Fix

- [#344](https://github.com/storefront-x/storefront-x/pull/344) Fix cookies to be set on root path ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#340](https://github.com/storefront-x/storefront-x/pull/340) Fix i18n datetimes to not crash with null ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 1

- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.10.3 (2023-02-09)

#### :bug: Bug Fix

- [#339](https://github.com/storefront-x/storefront-x/pull/339) Fix urlSuffix on Product and Category ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 1

- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.10.2 (2023-02-08)

#### :rocket: Enhancement

- [#336](https://github.com/storefront-x/storefront-x/pull/336) Add relatedProducts to composables ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 1

- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.10.1 (2023-02-08)

#### :rocket: Enhancement

- [#334](https://github.com/storefront-x/storefront-x/pull/334) Add bad-credentials status to failed cookie auth redirect ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :bug: Bug Fix

- [#335](https://github.com/storefront-x/storefront-x/pull/335) Move brand field to the Product fragment extension ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#332](https://github.com/storefront-x/storefront-x/pull/332) Fix TypeScript aliases for modules in node_modules ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :house: Internal

- [#326](https://github.com/storefront-x/storefront-x/pull/326) Shard Playwright tests ([@DaDlugosch](https://github.com/DaDlugosch))

#### Committers: 2

- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.10.0 (2023-02-07)

#### :rocket: Enhancement

- [#325](https://github.com/storefront-x/storefront-x/pull/325) Add 'sfx make' command ([@kubo12312](https://github.com/kubo12312))
- [#330](https://github.com/storefront-x/storefront-x/pull/330) Add header bypass to cookie-auth ([@adamjedlicka](https://github.com/adamjedlicka))
- [#324](https://github.com/storefront-x/storefront-x/pull/324) Refactor cookie auth ([@adamjedlicka](https://github.com/adamjedlicka))
- [#320](https://github.com/storefront-x/storefront-x/pull/320) Upgrade Cypress to v12.5 ([@kubo12312](https://github.com/kubo12312))
- [#315](https://github.com/storefront-x/storefront-x/pull/315) Add support for locales to sitemap ([@kubo12312](https://github.com/kubo12312))
- [#322](https://github.com/storefront-x/storefront-x/pull/322) Add support for type extensions ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#331](https://github.com/storefront-x/storefront-x/pull/331) Fix ServiceWorker caching ([@adamjedlicka](https://github.com/adamjedlicka))
- [#329](https://github.com/storefront-x/storefront-x/pull/329) Make cookie-auth return non 200 statuses ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :memo: Documentation

- [#327](https://github.com/storefront-x/storefront-x/pull/327) Fix typos in the documentation ([@MartinaRandulova](https://github.com/MartinaRandulova))
- [#317](https://github.com/storefront-x/storefront-x/pull/317) Add Vite section to the docs ([@DaDlugosch](https://github.com/DaDlugosch))
- [#307](https://github.com/storefront-x/storefront-x/pull/307) Improve Overriding and Extending documentation sections ([@DaDlugosch](https://github.com/DaDlugosch))

#### :house: Internal

- [#323](https://github.com/storefront-x/storefront-x/pull/323) Fix casing of goToWishlist ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 5

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- Martina Randulová ([@MartinaRandulova](https://github.com/MartinaRandulova))

## v1.9.2 (2023-02-02)

#### :rocket: Enhancement

- [#319](https://github.com/storefront-x/storefront-x/pull/319) Add removeFields GraphQL util ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#318](https://github.com/storefront-x/storefront-x/pull/318) Add NProgress to optimizeDeps ([@adamjedlicka](https://github.com/adamjedlicka))

#### :memo: Documentation

- [#300](https://github.com/storefront-x/storefront-x/pull/300) Improve docs for create script ([@kubo12312](https://github.com/kubo12312))
- [#309](https://github.com/storefront-x/storefront-x/pull/309) Add docs and tests for the ClientOnly component ([@DaDlugosch](https://github.com/DaDlugosch))

#### Committers: 3

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))

## v1.9.0 (2023-02-01)

#### :rocket: Enhancement

- [#297](https://github.com/storefront-x/storefront-x/pull/297) Add tooling module ([@adamjedlicka](https://github.com/adamjedlicka))
- [#305](https://github.com/storefront-x/storefront-x/pull/305) Add support for "get product by ID" query ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#299](https://github.com/storefront-x/storefront-x/pull/299) Improve Partytown support ([@DaDlugosch](https://github.com/DaDlugosch))
- [#310](https://github.com/storefront-x/storefront-x/pull/310) Add static pages to the sitemap ([@kubo12312](https://github.com/kubo12312))
- [#276](https://github.com/storefront-x/storefront-x/pull/276) Initialize cart on the client ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#316](https://github.com/storefront-x/storefront-x/pull/316) Fix checkout not loading for signed in customers ([@adamjedlicka](https://github.com/adamjedlicka))
- [#314](https://github.com/storefront-x/storefront-x/pull/314) Fix timeout in waitForStore ([@adamjedlicka](https://github.com/adamjedlicka))
- [#313](https://github.com/storefront-x/storefront-x/pull/313) Fix checkout hydration error ([@adamjedlicka](https://github.com/adamjedlicka))
- [#308](https://github.com/storefront-x/storefront-x/pull/308) Fix gallery for product variants to respect variant image ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#306](https://github.com/storefront-x/storefront-x/pull/306) Fixe reset password pages for native Magento ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :house: Internal

- [#250](https://github.com/storefront-x/storefront-x/pull/250) Purge old Cypress files during bootstrap ([@kubo12312](https://github.com/kubo12312))
- [#312](https://github.com/storefront-x/storefront-x/pull/312) Limit allowed branch names ([@DaDlugosch](https://github.com/DaDlugosch))
- [#301](https://github.com/storefront-x/storefront-x/pull/301) Disable Google analytics on demos ([@kubo12312](https://github.com/kubo12312))
- [#303](https://github.com/storefront-x/storefront-x/pull/303) Use bus concept for route navigation events ([@DaDlugosch](https://github.com/DaDlugosch))

#### Committers: 4

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.8.0 (2023-01-25)

#### :boom: Breaking Change

- [#272](https://github.com/storefront-x/storefront-x/pull/272) Refactor serverInit & clientInit store actions ([@adamjedlicka](https://github.com/adamjedlicka))

#### :rocket: Enhancement

- [#290](https://github.com/storefront-x/storefront-x/pull/290) Add support for X-Magento-Cache-Id ([@DaDlugosch](https://github.com/DaDlugosch))
- [#279](https://github.com/storefront-x/storefront-x/pull/279) Add basic analytics events ([@DaDlugosch](https://github.com/DaDlugosch))
- [#286](https://github.com/storefront-x/storefront-x/pull/286) Add fallback for meta titles ([@fajmanm](https://github.com/fajmanm))
- [#233](https://github.com/storefront-x/storefront-x/pull/233) Improve product detail page of configurable products ([@kubo12312](https://github.com/kubo12312))
- [#271](https://github.com/storefront-x/storefront-x/pull/271) Add support for Magento cache tags ([@adamjedlicka](https://github.com/adamjedlicka))

#### :bug: Bug Fix

- [#266](https://github.com/storefront-x/storefront-x/pull/266) Hide empty product attributes ([@kubo12312](https://github.com/kubo12312))
- [#273](https://github.com/storefront-x/storefront-x/pull/273) Fix grand total price in order summary ([@kubo12312](https://github.com/kubo12312))

#### :memo: Documentation

- [#293](https://github.com/storefront-x/storefront-x/pull/293) Add Event Bus documentation ([@DaDlugosch](https://github.com/DaDlugosch))

#### :house: Internal

- [#296](https://github.com/storefront-x/storefront-x/pull/296) Add build on demand ([@adamjedlicka](https://github.com/adamjedlicka))
- [#292](https://github.com/storefront-x/storefront-x/pull/292) Add test for two orders ([@xvyslo05](https://github.com/xvyslo05))
- [#282](https://github.com/storefront-x/storefront-x/pull/282) Add Cypress test for coupons ([@xvyslo05](https://github.com/xvyslo05))
- [#267](https://github.com/storefront-x/storefront-x/pull/267) Add PR template ([@kubo12312](https://github.com/kubo12312))
- [#281](https://github.com/storefront-x/storefront-x/pull/281) Add node-fetch polyfill ([@adamjedlicka](https://github.com/adamjedlicka))
- [#227](https://github.com/storefront-x/storefront-x/pull/227) Refactor Cypress tests ([@xvyslo05](https://github.com/xvyslo05))
- [#272](https://github.com/storefront-x/storefront-x/pull/272) Refactor serverInit & clientInit store actions ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 6

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- Martin Fajman ([@fajmanm](https://github.com/fajmanm))
- Robin Vysloužil ([@xvyslo05](https://github.com/xvyslo05))

## v1.7.0 (2023-01-16)

#### :rocket: Enhancement

- [#269](https://github.com/storefront-x/storefront-x/pull/269) Add Sentry integration ([@adamjedlicka](https://github.com/adamjedlicka))
- [#246](https://github.com/storefront-x/storefront-x/pull/246) Improve out of stock visualization ([@kubo12312](https://github.com/kubo12312))

#### :memo: Documentation

- [#268](https://github.com/storefront-x/storefront-x/pull/268) Add 'Why not' chapter to documentation ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 3

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.6.0 (2023-01-16)

#### :boom: Breaking Change

- [#245](https://github.com/storefront-x/storefront-x/pull/245) Improve vanilla Magento integration ([@kubo12312](https://github.com/kubo12312))

#### :rocket: Enhancement

- [#245](https://github.com/storefront-x/storefront-x/pull/245) Improve vanilla Magento integration ([@kubo12312](https://github.com/kubo12312))
- [#226](https://github.com/storefront-x/storefront-x/pull/226) Add option to reset forgotten password via an email ([@JaroslavSku](https://github.com/JaroslavSku))
- [#228](https://github.com/storefront-x/storefront-x/pull/228) Handle Magento's newsletter errors ([@DaDlugosch](https://github.com/DaDlugosch))

#### :memo: Documentation

- [#265](https://github.com/storefront-x/storefront-x/pull/265) Add Routing page to the documentation ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#261](https://github.com/storefront-x/storefront-x/pull/261) Fix typos and and improve texts in documentation ([@DaDlugosch](https://github.com/DaDlugosch))
- [#262](https://github.com/storefront-x/storefront-x/pull/262) Improve documentation for Simple todo app and Cookbook ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#260](https://github.com/storefront-x/storefront-x/pull/260) Improve introduction and quick start documentation pages ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#255](https://github.com/storefront-x/storefront-x/pull/255) Add documentation for creation of simple TODO app ([@adamjedlicka](https://github.com/adamjedlicka))

#### :house: Internal

- [#270](https://github.com/storefront-x/storefront-x/pull/270) Update demo templates ([@adamjedlicka](https://github.com/adamjedlicka))
- [#259](https://github.com/storefront-x/storefront-x/pull/259) Use page.locator in Playwright tests ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 5

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Damian Dlugosch ([@DaDlugosch](https://github.com/DaDlugosch))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [@JaroslavSku](https://github.com/JaroslavSku)

## v1.5.1 (2023-01-04)

#### :rocket: Enhancement

- [#258](https://github.com/storefront-x/storefront-x/pull/258) Use ToMagentoImage in ToBrand mapper ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.5.0 (2023-01-04)

#### :rocket: Enhancement

- [#257](https://github.com/storefront-x/storefront-x/pull/257) Add ToMagentoImage mapper ([@adamjedlicka](https://github.com/adamjedlicka))
- [#186](https://github.com/storefront-x/storefront-x/pull/186) Add Minicart ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :bug: Bug Fix

- [#248](https://github.com/storefront-x/storefront-x/pull/248) Fix click-through from cart item to product detail on Shopware ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 2

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.4.6 (2023-01-03)

#### :house: Internal

- [#249](https://github.com/storefront-x/storefront-x/pull/249) Update the 'blank' demo ([@adamjedlicka](https://github.com/adamjedlicka))
- [#247](https://github.com/storefront-x/storefront-x/pull/247) Use TypeScript for IoC generated files ([@adamjedlicka](https://github.com/adamjedlicka))
- [#244](https://github.com/storefront-x/storefront-x/pull/244) Test create script in pipelines ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.4.5 (2023-01-02)

#### :house: Internal

- [#243](https://github.com/storefront-x/storefront-x/pull/243) Fix create script ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.4.4 (2023-01-02)

#### :rocket: Enhancement

- [#242](https://github.com/storefront-x/storefront-x/pull/242) Allow overriding of create-script prompts with argument flags ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.4.3 (2023-01-02)

#### :rocket: Enhancement

- [#241](https://github.com/storefront-x/storefront-x/pull/241) Add useSetResponseStatus composable ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :bug: Bug Fix

- [#239](https://github.com/storefront-x/storefront-x/pull/239) Update service worker with new releases ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### Committers: 1

- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

## v1.4.2 (2022-12-22)

#### :boom: Breaking Change

- [#210](https://github.com/storefront-x/storefront-x/pull/210) Separate Product fragment into two ([@JaroslavSku](https://github.com/JaroslavSku))

#### :rocket: Enhancement

- [#229](https://github.com/storefront-x/storefront-x/pull/229) Add basic support for Google Analytics ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#210](https://github.com/storefront-x/storefront-x/pull/210) Separate Product fragment into two ([@JaroslavSku](https://github.com/JaroslavSku))

#### :memo: Documentation

- [#234](https://github.com/storefront-x/storefront-x/pull/234) Add documentation and tests for Google Analytics ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :house: Internal

- [#232](https://github.com/storefront-x/storefront-x/pull/232) Improve caching of static assets ([@adamjedlicka](https://github.com/adamjedlicka))
- [#230](https://github.com/storefront-x/storefront-x/pull/230) Add buildProject Playwright util ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 3

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [@JaroslavSku](https://github.com/JaroslavSku)

## v1.4.1 (2022-12-19)

#### :house: Internal

- [#224](https://github.com/storefront-x/storefront-x/pull/224) Improve error handling ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 1

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))

## v1.4.0 (2022-12-15)

#### :rocket: Enhancement

- [#209](https://github.com/storefront-x/storefront-x/pull/209) Add specification tab to the product detail ([@JaroslavSku](https://github.com/JaroslavSku))
- [#222](https://github.com/storefront-x/storefront-x/pull/222) Display meta data and title on CMS pages ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#216](https://github.com/storefront-x/storefront-x/pull/216) Disable currency switcher when switching currency ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#212](https://github.com/storefront-x/storefront-x/pull/212) Add hydrateNever utility ([@kubo12312](https://github.com/kubo12312))
- [#213](https://github.com/storefront-x/storefront-x/pull/213) Wishlist merge won't happen when wishlist is empty ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :bug: Bug Fix

- [#218](https://github.com/storefront-x/storefront-x/pull/218) Fix login in checkout ([@kubo12312](https://github.com/kubo12312))
- [#217](https://github.com/storefront-x/storefront-x/pull/217) Add default GOOGLE_TAG_MANAGER_SCRIPT_TYPE ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#215](https://github.com/storefront-x/storefront-x/pull/215) Properly handle redirect in production ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :memo: Documentation

- [#221](https://github.com/storefront-x/storefront-x/pull/221) Add docs for basic-auth ([@JanVanekRelitas](https://github.com/JanVanekRelitas))

#### :house: Internal

- [#223](https://github.com/storefront-x/storefront-x/pull/223) Log uncaught errors during SSR & set status to 500 ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [#220](https://github.com/storefront-x/storefront-x/pull/220) Use immutable installs ([@adamjedlicka](https://github.com/adamjedlicka))
- [#214](https://github.com/storefront-x/storefront-x/pull/214) Upgrade deps ([@adamjedlicka](https://github.com/adamjedlicka))

#### Committers: 4

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jakub Rosina ([@kubo12312](https://github.com/kubo12312))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- [@JaroslavSku](https://github.com/JaroslavSku)

## v1.3.1 (2022-12-07)

#### :bug: Bug Fix

- [#208](https://github.com/storefront-x/storefront-x/pull/208) Fix Router params ([@adamjedlicka](https://github.com/adamjedlicka))

#### :memo: Documentation

- [#204](https://github.com/storefront-x/storefront-x/pull/204) Add Concepts documentation ([@adamjedlicka](https://github.com/adamjedlicka))
- [#203](https://github.com/storefront-x/storefront-x/pull/203) Update Dotenv docs ([@adamjedlicka](https://github.com/adamjedlicka))

#### :house: Internal

- [#207](https://github.com/storefront-x/storefront-x/pull/207) Add Cypress test for page refresh in checkout ([@xvyslo05](https://github.com/xvyslo05))

#### Committers: 3

- Adam Jedlička ([@adamjedlicka](https://github.com/adamjedlicka))
- Jan Vaněk ([@JanVanekRelitas](https://github.com/JanVanekRelitas))
- Robin Vysloužil ([@xvyslo05](https://github.com/xvyslo05))


