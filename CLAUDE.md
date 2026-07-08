# CLAUDE.md

This file is lightweight project memory for AI-assisted work on Uptime Ping Monitor.
It is documentation only and does not affect the application runtime.

## 1. Git Workflow

- Main branch: main
- Commit style: short, practical messages that describe the user-facing change.
- Push policy: push only after checks pass or documentation-only changes are reviewed.
- Avoid unrelated cleanup while working on a focused change.

## 2. Project Purpose

React infrastructure monitoring dashboard that simulates host health, latency drift, outage state, recovery actions, and SIEM-style event logging.

Primary stack: React, Vite, JavaScript, CSS, Node test runner, GitHub Actions.

## 3. Decisions

- Keep this as a safe browser simulation, not a real network scanner.
- Model predictable recovery state so polling does not overwrite manual triage.
- Use the live demo and screenshot as quick reviewer evidence.
- Avoid adding real ping/network permissions to the frontend.

## 4. Session Mode

- Read this file and README.md before making non-trivial changes.
- Explain intent before multi-file edits.
- Run the relevant check command where practical: $(System.Collections.Hashtable.Check).
- Keep copy technical, plain, and recruiter-safe.
- Do not introduce secrets, real customer data, or unrelated commercial positioning.

## 5. Current State

### What got done

- Repository is part of the active portfolio set.
- README explains the project purpose and reviewer-facing evidence.
- Project memory has been added so future work starts with context.

### Where things stand

- Current positioning: React infrastructure monitoring dashboard that simulates host health, latency drift, outage state, recovery actions, and SIEM-style event logging.
- Review command/context: $(System.Collections.Hashtable.Check).

### Next

- Improve saved event history or add clearer incident timeline export.

### Blocked on

- Nothing.