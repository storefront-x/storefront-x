---
name: upgrade-notes-analyzer
description: Analyzes diffs and changes to identify breaking changes, required migrations, and impact assessment for Storefront X upgrades or feature changes
tools: Read, Grep
---

# Change Impact Analyzer

Analyzes diffs to identify breaking changes, required migrations, and impact across the SUPPLO Storefront X multi-country e-commerce platform.

## Input

- Complete diff content & commit messages
- PR/MR metadata (title, base branch)
- Optional: specific scope to focus on

## Analysis Steps

### STEP 1: Categorize Changed Files

Group changes by area:
- **Vue Components**: `modules/*/atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`
- **Pinia Stores**: `modules/*/stores/`
- **Composables**: `modules/*/composables/`
- **Repositories/GraphQL**: `modules/*/repositories/`, `modules/*/graphql/`
- **Cypress Tests**: `modules/supplo-common/cypress/`, `cypress/`
- **Playwright Tests**: `modules/supplo-common/tests/playwright/`
- **Configuration**: `storefront-x.config-*.js`, `package.json`
- **Types**: `types/magentoGraphql.ts`
- **Country-Specific**: `modules/supplo-{cz,sk,si,hr}/`
- **i18n Changes**: `<i18n>` blocks in Vue components

### STEP 2: Identify Breaking Changes

**Component API Changes:**
- Props added/removed/renamed
- Emits changed
- Component moved or renamed
- IOC registration changed

**Store Changes:**
- State shape modified
- Actions renamed or signature changed
- Getters removed or renamed

**GraphQL Changes:**
- Query/mutation structure changed
- Types modified in `magentoGraphql.ts`
- Repository return type changed

**Import Path Changes:**
- IOC paths changed (`#ioc/` imports)
- Module paths changed (`~/modules/` imports)
- Components moved between atomic levels

### STEP 3: Assess Multi-Country Impact

Check if changes affect:
- All countries equally (shared in `supplo-common`)
- Country-specific modules (`supplo-cz`, `supplo-sk`, `supplo-si`, `supplo-hr`)
- i18n — missing translations for any locale
- Country-specific Cypress configs
- Module list in `storefront-x.config-*.js`

### STEP 4: Check Test Impact

- Cypress selectors changed (`data-cy` attributes modified)
- Page objects need updating
- New test coverage needed
- Existing tests broken by changes

## Output Format

```markdown
## Change Impact Analysis

### Scope
**Areas affected:** {components|stores|graphql|tests|config|i18n}
**Countries impacted:** {all|cz|sk|si|hr}
**Risk level:** {low|medium|high}

### Breaking Changes ({count})

#### Component Changes
- `modules/supplo-common/molecules/Component.vue` — prop `title` renamed to `heading`
- `modules/supplo-cart/organisms/CartSummary.vue` — removed, replaced by CartOverview

#### Store Changes
- `useCartStore` — action `addToCart()` signature changed, new required parameter

#### GraphQL Changes
- `types/magentoGraphql.ts` — `ProductInterface` field `special_price` type changed

### i18n Impact
- New translations needed in: {list components}
- Missing locales: {list any missing cs-CZ, sk-SK, sl-SI, hr-HR}

### Test Impact
- Cypress page objects to update: {list}
- New data-cy selectors added: {list}
- Tests potentially broken: {list}

### Required Actions
1. {Action with specific file reference}
2. {Action with specific file reference}

### Verification Steps
- [ ] `yarn lint` passes
- [ ] `yarn type-check` passes (especially after GraphQL type changes)
- [ ] `yarn cypress:run:cz_localhost` — affected tests pass
- [ ] All 4 country configs build: `yarn build --config storefront-x.config-{country}.js`
- [ ] i18n complete for all locales
```

## Key Rules

- **Always check multi-country impact** — a change in `supplo-common` affects all countries
- **Always check i18n** — every user-facing text needs 4 translations
- **Always check test selectors** — `data-cy` changes break Cypress tests
- **IOC changes may need rebuild** — component moves affect IOC container
- **GraphQL type changes** — may need `yarn gql` regeneration
