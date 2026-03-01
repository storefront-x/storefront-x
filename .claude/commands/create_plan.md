# Creating an Implementation Plan

You are responsible for creating a detailed implementation plan for the Storefront X framework monorepo. Be skeptical, thorough, and work collaboratively to produce a quality technical specification.

## Initial Response

If parameters are provided — start research immediately.
If not, ask:
```
I'll help you create a detailed implementation plan. Provide:
1. Description of the task or fix
2. Relevant context or constraints
3. Any files or modules involved

Tip: You can call the command directly with a description: /create_plan Fix bug in IocConcept
```

## Process Steps

### Step 1: Gather Context

1. **Read all mentioned files in full** — without truncation
2. **Run parallel research**:
   - **codebase-locator** — find all relevant files
   - **codebase-analyzer** — understand the current implementation
   - **codebase-pattern-finder** — find similar patterns in the monorepo
3. **Read results** into the main context
4. **Present your understanding**:
   ```
   Based on the task and research, I understand that [summary] is needed.

   I found:
   - [Implementation detail with file:line references]
   - [Relevant pattern or constraint]
   - [Potential complexity or edge case]

   Questions that research didn't answer:
   - [Specific question requiring a decision]
   ```

### Step 2: Research and Design

After clarification:

1. **If the user corrects a misunderstanding** — run new research to verify
2. **Present design options**:
   ```
   **Current state:**
   - [Key finding with file:line]

   **Design options:**
   1. [Option A] — pros/cons
   2. [Option B] — pros/cons

   Which approach is correct?
   ```

### Step 3: Plan Structure

After the approach is approved:
1. **Create a plan outline** with phases — get approval before writing details
2. **Validate patterns** — verify that planned changes have examples in the codebase

### Step 4: Write the Plan

Save to `docs/plans/YYYY-MM-DD-plan-name.md` using this template:

```markdown
# [Task Name] — Implementation Plan

## Overview
[Brief description of what and why]

## Current State Analysis
[What exists now, constraints]
- [Finding with file:line references]

## What We're NOT Doing
[What is out of scope — preventing scope creep]

## Implementation Approach
[High-level strategy]

## Phase 1: [Description]

### Required Changes:

#### 1. [File/Module]
**File**: `modules/module-name/concepts/Feature.js`
**Changes**: [Summary]

```javascript
// specific code
```

### Success Criteria:

#### Automated:
- [ ] `yarn lint` passes
- [ ] `yarn build --config storefront-x.magento.config.js` passes
- [ ] `yarn test:playwright` passes (if relevant)

#### Manual:
- [ ] Feature works on dev server (`yarn dev --config storefront-x.magento.config.js`)
- [ ] No console errors
- [ ] No TypeScript errors in IDE

## Phase 2: [Description]
[Similar structure...]

## Testing Strategy

### Manual Testing:
1. `yarn dev --config storefront-x.magento.config.js`
2. [Specific verification steps]

### Playwright (if relevant):
- Run `yarn test:playwright`
- Check `tests/` for existing tests

## References
- Similar implementation: `[file:line]`
- Documentation: `docs/advanced/concepts.md`
```

### Step 5: Review and Iteration

1. Present the plan location and ask for review
2. Iterate until the user is satisfied

## Important Guidelines

1. **Be skeptical** — challenge vague requirements, verify in code
2. **Be interactive** — get approval at every step, let the user decide
3. **Be thorough** — read files in full, include file:line references
4. **Be practical** — incremental testable changes
5. **No open questions in the final plan** — resolve everything upfront
6. **Validate patterns** — always verify that the planned approach has examples in the codebase

## Key Verification Commands

```bash
yarn lint                                              # ESLint
yarn build --config storefront-x.magento.config.js   # Build test
yarn test:playwright                                   # E2E tests
yarn dev --config storefront-x.magento.config.js     # Manual test
```
