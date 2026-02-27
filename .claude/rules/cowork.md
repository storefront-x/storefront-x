---
alwaysApply: true
---

# AI Coding Assistant - Collaboration Rules

## MANDATORY: Implementation Plan First

**Before any coding work**, you MUST:

1. **Create a detailed implementation plan** in markdown format
2. **Save the plan** to the `implementationPlans/` folder
3. **Use naming convention**: `{task-id}-implementation-plan.md` or `{feature-name}-implementation-plan.md`
4. **Include these sections**:
   - Task Summary
   - Current State Analysis
   - Objectives
   - Affected Areas (files/modules/functions)
   - Proposed Changes / Implementation Steps
   - Potential Risks & Mitigation
   - Success Criteria
   - Testing Strategy (E2E tests required - see `e2e.md`)

---

## Workflow for Jira Tasks

When I paste a Jira task number (e.g., ABC-123) or full task description:

### Step 1: Task Analysis
- If it's a Jira ID, fetch/search for the description (if tools available)
- Understand the task and extract engineering intent
- Analyze in context of current repository

### Step 2: Create Implementation Plan
- Identify key files, modules, or functions likely involved
- Determine if logic is extending, modifying, or refactoring
- Document affected areas and implementation approach
- **Save to `implementationPlans/` folder** (MANDATORY)

### Step 3: Present Plan
- Share the implementation plan for review
- Provide clear, actionable steps
- Include implementation prompt

### Step 4: Implementation
- Proceed only after plan is reviewed/confirmed
- Follow the documented approach
- Stay within planned scope

### Step 5: E2E Testing
- **After every implementation**, create E2E tests following `e2e.md` rules
- Use Page Object Model pattern for test structure
- Add `data-cy` attributes to all interactive elements
- Test both happy path and error scenarios
- Ensure tests are country-specific if needed (tags: `cz`, `sk`, `si`, `hr`)
- Place tests in appropriate location:
  - Shared tests: `modules/supplo-common/cypress/e2e/`
  - Feature-specific tests: `cypress/e2e/`

---

## Rules

1. **Work only within the current repository**
2. **Avoid rewriting existing logic** unless clearly required
3. **Avoid creating new files/components** unless necessary
4. **Be concise, actionable, and practical** for real-world dev flow
5. **Always create implementation plan first** - no exceptions
6. **Save plans to `implementationPlans/` folder** with proper naming
7. **Create E2E tests after every implementation** - follow `e2e.md` guidelines

---

## Output Format

After creating and saving the implementation plan, present:

```markdown
## Task Summary
[Concise summary of the task]

## Affected Areas
- [File/module/function 1]
- [File/module/function 2]
- [etc.]

## Implementation Plan
Saved to: `implementationPlans/{task-id}-implementation-plan.md`

## Implementation Prompt
[Clear, actionable prompt that can be used to implement this task]
```

---

## Example

For task KFL-2520:

1. Create `implementationPlans/KFL-2520-implementation-plan.md`
2. Document analysis, approach, affected areas
3. Present summary with link to plan
4. Provide implementation prompt

---

## Notes

- Implementation plans help ensure clarity before coding
- Plans serve as documentation for future reference
- They enable better collaboration and review
- They reduce risk of misunderstanding requirements
- **E2E tests are mandatory** for all implementations - they ensure quality and prevent regressions
- Follow Cypress best practices and Page Object Model as defined in `e2e.md`
