---
name: finishing-a-development-branch
description: Use after all tasks in a phase/feature are complete to automate the full wrap-up — verification, PR, code review, fixes, and merge to main
---

# Finishing a Development Branch

Automate the complete end-of-phase workflow: verify → PR → review → fix → merge.

**Core principle:** No manual steps between "all tasks done" and "merged to main".

## When to Use

- After completing all tasks in an implementation plan
- Referenced by `subagent-driven-development` and `executing-plans` as the final step
- Any time all implementation work is done and ready to ship

## The Process

```
All tasks complete
       ↓
Step 1: Full Verification
       ↓
Step 2: Create PR
       ↓
Step 3: Code Review (subagent)
       ↓
Step 4: Fix Issues
       ↓
Step 5: Re-verify & Push
       ↓
Step 6: Merge to main
       ↓
Step 7: Sync local main
```

### Step 1: Full Verification

Run ALL verification commands. No shortcuts.

```bash
# iOS build
xcodebuild build -scheme RunTrainerAI -destination 'platform=iOS Simulator,id=<SIMULATOR_ID>' -quiet

# watchOS build
xcodebuild build -scheme RunTrainerAIWatch -destination 'platform=watchOS Simulator,id=<WATCH_SIMULATOR_ID>' -quiet

# Unit tests
xcodebuild test -scheme RunTrainerAI -destination 'platform=iOS Simulator,id=<SIMULATOR_ID>' -only-testing 'RunTrainerAITests'

# E2E tests (run AFTER unit tests — same simulator)
xcodebuild test -scheme RunTrainerAI -destination 'platform=iOS Simulator,id=<SIMULATOR_ID>' -only-testing 'RunTrainerAIUITests'
```

**IMPORTANT:** Run unit tests and E2E tests sequentially (not parallel) — they share the simulator.

**Gate:** ALL must pass. If anything fails, fix before proceeding.

### Step 2: Create PR

```bash
# Create feature branch if not already on one
git checkout -b feature/<phase-name>

# Push
git push -u origin feature/<phase-name>

# Create PR with summary of ALL commits
gh pr create --base main --title "<title>" --body "<body>"
```

PR body template:
```
## Summary
- [bullet points of what changed]

## Verification
- iOS build: [result]
- watchOS build: [result]
- N unit tests: [result]
- N E2E tests: [result]

## Test plan
- [x] [verified items]

Generated with [Claude Code](https://claude.com/claude-code)
```

### Step 3: Code Review

Invoke `requesting-code-review` skill:

1. Get git SHAs: `BASE_SHA=$(git rev-parse origin/main)`, `HEAD_SHA=$(git rev-parse HEAD)`
2. Dispatch code-reviewer subagent with full context
3. Wait for review results

### Step 4: Fix Issues

Based on review feedback:
- **Critical:** Fix immediately, no exceptions
- **Important:** Fix before merge
- **Minor:** Fix if quick (<5 min), otherwise note for later

After fixes:
- Commit with descriptive message
- Push to PR branch

### Step 5: Re-verify & Push

After fixes, run verification again (at minimum the affected tests).

```bash
# Quick re-verify: unit tests
xcodebuild test -scheme RunTrainerAI -destination '...' -only-testing 'RunTrainerAITests'

# Push fixes
git push
```

### Step 6: Merge to Main

```bash
gh pr merge <PR_NUMBER> --squash --delete-branch
```

### Step 7: Sync Local Main

```bash
git checkout main
git pull origin main
# If diverged due to squash merge:
git reset --hard origin/main
```

## Announce

At the start: "I'm using the finishing-a-development-branch skill to wrap up this phase."

At the end, report:
- PR URL
- Review summary (strengths, issues found/fixed)
- Final verification results
- Merge commit SHA

## Red Flags

**Never:**
- Skip verification ("tests passed earlier")
- Skip code review ("changes are simple")
- Merge with unfixed Critical or Important issues
- Run unit and E2E tests in parallel on the same simulator
- Push to main directly (always PR)

## Integration

**Required by:**
- `subagent-driven-development` — final step after all tasks
- `executing-plans` — final step after all tasks

**Uses:**
- `verification-before-completion` — evidence before claims
- `requesting-code-review` — dispatches reviewer subagent
