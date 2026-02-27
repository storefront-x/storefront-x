# Implement Plan

You are tasked with implementing an approved technical plan from `implementationPlans/`. These plans contain phases with specific changes and success criteria for the SUPPLO Storefront X e-commerce platform.

## Getting Started

When given a plan path:
- Read the plan completely and check for existing checkmarks (`- [x]`)
- Read all files mentioned in the plan — **fully, no limit/offset**
- Understand the module structure and IOC patterns involved
- Create a todo list to track your progress
- Start implementing if you understand what needs to be done

If no plan path provided, ask for one.

## Implementation Philosophy

Plans are carefully designed, but reality can be messy. Your job is to:
- Follow the plan's intent while adapting to what you find
- Implement each phase fully before moving to the next
- Verify your work makes sense in the broader codebase context
- Update checkboxes in the plan as you complete sections
- Consider all 4 countries (CZ, SK, SI, HR) for i18n and testing

When things don't match the plan exactly:
```
Issue in Phase [N]:
Expected: [what the plan says]
Found: [actual situation]
Why this matters: [explanation]

How should I proceed?
```

## Development Workflow

### Vue Components
- Use `<script setup lang="ts">` with Composition API
- Follow Atomic Design (atoms/molecules/organisms/templates/pages)
- Prefer IOC imports: `#ioc/atoms/Button`, `#ioc/composables/useI18n`
- Add `data-cy` attributes for E2E testing
- Include i18n translations for all countries (cs-CZ, sk-SK, sl-SI, hr-HR)
- Use Tailwind CSS utility classes

### Pinia Stores
- Use Composition API store definition with `defineStore`
- Implement loading/error states with `ref()`
- Include `$reset` method
- Handle errors with `useShowErrorNotification`

### GraphQL Repositories
- Follow repository pattern: `useGet{Feature}Repository`
- Use `useMagentoStore().graphql()` for API calls
- Use generated types from `~/types/magentoGraphql`
- Handle loading and error states

### Cypress Tests
- Use Page Object Model
- Page objects in `modules/supplo-common/cypress/support/pageObjects/`
- Specs in `modules/supplo-common/cypress/e2e/` or `cypress/e2e/`
- Use `data-cy` selectors exclusively
- Tag tests by country: `{ tags: ['cz', 'sk'] }`

## Verification

After implementing a phase, update checkboxes in the plan file.

### Automated Verification
```bash
yarn lint              # Check code standards
yarn lint:fix          # Auto-fix lint issues
yarn type-check        # TypeScript compilation
yarn gql               # Regenerate GraphQL types (if GraphQL changes)
yarn cypress:run:cz_localhost  # Run E2E tests
```

### Manual Verification
```bash
yarn dev --config storefront-x.config-cz.js  # Start dev server
# Test at http://localhost:3000
# Check responsive: mobile (375px), tablet (768px), desktop (1920px)
# Verify all translations
# Test on other countries if multi-country feature
```

## If You Get Stuck

- Read and understand all relevant code first
- Check if IOC imports need rebuilding (`yarn build`)
- Check if GraphQL types need regeneration (`yarn gql`)
- Verify `data-cy` attributes are present for any E2E-tested elements
- Check Tailwind classes are valid
- Present the issue clearly and ask for guidance

## Resuming Work

If the plan has existing checkmarks:
- Trust that completed work is done
- Pick up from the first unchecked item
- Verify previous work only if something seems off

## Common Issues

**IOC Import Not Found:** Check if component is exported in module, verify `.sfx/ioc/` registration
**TypeScript Errors:** Run `yarn type-check`, check import paths (`#ioc/` vs `~/`)
**GraphQL Type Errors:** Run `yarn gql` to regenerate types
**Styles Not Applying:** Verify Tailwind class names, check scoped style conflicts
**Tests Failing:** Check `data-cy` attributes, verify `waitForSfx()` after navigation
**Build Errors:** Clear and reinstall: `rm -rf node_modules && yarn install`

## Best Practices

1. **Incremental** — implement one component at a time, test after each change
2. **Code Quality** — run `yarn lint:fix` before finishing
3. **Testing** — add `data-cy` attributes as you build, write E2E tests
4. **Documentation** — update plan checkboxes, comment complex logic
5. **Communication** — ask when stuck, explain deviations from plan

Remember: You're implementing a solution, not just checking boxes. Keep the end goal in mind, maintain forward momentum, and ensure quality through proper testing and verification.
