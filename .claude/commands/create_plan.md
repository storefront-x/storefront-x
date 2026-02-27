# Implementation Plan

You are tasked with creating detailed implementation plans through an interactive, iterative process. You should be skeptical, thorough, and work collaboratively with the user to produce high-quality technical specifications for the SUPPLO Storefront X e-commerce platform.

## Initial Response

When this command is invoked:

1. **If parameters provided** — begin research immediately
2. **If no parameters** — respond with:
```
I'll help you create a detailed implementation plan. Please provide:
1. The task/feature description
2. Any relevant context or constraints
3. Links to related implementations in the codebase

I'll analyze this and work with you to create a comprehensive plan.

Tip: You can invoke this with a description directly: `/create_plan Add product comparison feature`
```

## Process Steps

### Step 1: Context Gathering & Initial Analysis

1. **Read all mentioned files FULLY** — no partial reads
2. **Spawn parallel research tasks**:
    - **codebase-locator** — find all files related to the task
    - **codebase-analyzer** — understand current implementation
    - **codebase-pattern-finder** — find similar features to model after
3. **Read all files identified by research tasks** into main context
4. **Present informed understanding**:
   ```
   Based on the task and my research, I understand we need to [summary].

   I've found:
   - [Current implementation detail with file:line reference]
   - [Relevant pattern or constraint]
   - [Potential complexity or edge case]

   Questions my research couldn't answer:
   - [Specific question requiring human judgment]
   ```

### Step 2: Research & Discovery

After getting clarifications:

1. **If user corrects a misunderstanding** — spawn new research to verify
2. **Spawn deeper research tasks**:
    - **codebase-pattern-finder** — find concrete examples of each component type you plan to implement
    - **docs-researcher** — find relevant documentation and existing implementation plans
3. **Present findings and design options**:
   ```
   **Current State:**
   - [Key discovery with file:line]

   **Design Options:**
   1. [Option A] - [pros/cons]
   2. [Option B] - [pros/cons]

   Which approach aligns best?
   ```

### Step 3: Plan Structure

Once aligned:
1. **Create plan outline** with phases and get approval before writing details
2. **Validate patterns** — verify all component types have correct codebase examples

### Step 4: Write the Plan

Save to `implementationPlans/{descriptive_name}.md` using this template:

```markdown
# [Feature/Task Name] Implementation Plan

## Overview
[Brief description of what and why]

## Current State Analysis
[What exists now, constraints discovered]
- [Finding with file:line reference]
- [Pattern to follow]

## What We're NOT Doing
[Out-of-scope items to prevent scope creep]

## Implementation Approach
[High-level strategy]

## Phase 1: [Descriptive Name]

### Changes Required:

#### 1. [Component/File]
**File**: `modules/supplo-{module}/molecules/ComponentName.vue`
**Changes**: [Summary]

```vue
<!-- Specific code -->
```

### Success Criteria:

#### Automated:
- [ ] `yarn lint` passes
- [ ] `yarn type-check` passes
- [ ] `yarn cypress:run:cz_localhost` — relevant tests pass

#### Manual:
- [ ] Feature works in CZ store (http://localhost:3000)
- [ ] Responsive design (375px, 768px, 1920px)
- [ ] All translations present (cs-CZ, sk-SK, sl-SI, hr-HR)

## Phase 2: [Descriptive Name]
[Similar structure...]

## Testing Strategy

### Cypress E2E:
- **Location**: `modules/supplo-common/cypress/e2e/` or `cypress/e2e/`
- **Pattern**: Page Object Model with data-cy selectors
- **Tags**: Country-specific (`cz`, `sk`, `si`, `hr`)

### Manual Testing:
1. `yarn dev --config storefront-x.config-cz.js`
2. [Specific verification steps]
3. Test all countries: CZ, SK, SI, HR

## i18n Requirements
All text translated to: cs-CZ, sk-SK, sl-SI, hr-HR
Use component-level `<i18n lang="yaml">`.

## References
- Similar implementation: `[file:line]`
```

### Step 5: Review & Iterate

1. Present plan location and request review
2. Iterate until user is satisfied

## Important Guidelines

1. **Be Skeptical** — question vague requirements, verify with code
2. **Be Interactive** — get buy-in at each step, don't write full plan in one shot
3. **Be Thorough** — read files completely, include file:line references, consider all 4 countries
4. **Be Practical** — incremental testable changes, include "what we're NOT doing"
5. **No Open Questions in Final Plan** — resolve everything before finalizing
6. **Validate Patterns** — always verify implementation patterns have codebase examples

## Common Patterns

### Vue Components
- `<script setup lang="ts">` with Composition API
- Atomic Design: atoms/ molecules/ organisms/ templates/ pages/
- IOC imports: `#ioc/atoms/Button`
- `data-cy` attributes for E2E
- i18n for all 4 countries
- Tailwind utility classes

### State Management
- Pinia stores in `modules/*/stores/`
- Composition API style with `ref()`, `computed()`
- Loading/error states

### GraphQL
- Repositories in `modules/*/repositories/`
- `useMagentoStore().graphql()` for API calls
- Types from `~/types/magentoGraphql`

### E2E Testing
- Cypress: Page Object Model, `data-cy` selectors
- Page objects in `modules/supplo-common/cypress/support/pageObjects/`
- Test specs in `modules/supplo-common/cypress/e2e/` or `cypress/e2e/`
- Country tags: `cz`, `sk`, `si`, `hr`

## Development Commands

```bash
yarn dev --config storefront-x.config-{cz,sk,si,hr}.js  # Dev server
yarn build --config storefront-x.config-{cz,sk,si,hr}.js # Build
yarn lint                                                  # Lint
yarn type-check                                            # TypeScript
yarn gql                                                   # GraphQL types
yarn cypress:open:cz_localhost                             # Cypress UI
yarn cypress:run:cz_localhost                              # Cypress headless
yarn test:pw:cz                                            # Playwright
```
