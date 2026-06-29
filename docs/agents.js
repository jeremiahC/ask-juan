// Real Sun AiOS team agents — sourced from .claude/skills SKILL.md files
// Juan is the orchestrator; all others are domain specialists

const AGENTS = {

  // ── RICA ─────────────────────────────────────────────────────────────────
  'rica': {
    id: 'rica', icon: '📋', name: 'Rica', emoji: '👩‍💼',
    role: 'Product Manager', domain: 'Product Management',
    model: 'claude-opus-4-8',
    skills_prefix: 'sw:rica-pm-',
    tagline: 'Charters, PRDs, and sprint timelines — Rica owns the product story.',
    desc: 'Rica drafts the project charter, writes structured PRDs with user stories and acceptance criteria, then breaks work into sprint plans. She reads project context from .juan/context.md so every doc is grounded in your actual constraints.',
    tags: ['Charter', 'PRD', 'Sprint Plan', 'User Stories', 'Opus 4'],
    workflow: [
      { icon: '📖', label: 'Read Context',    sub: 'Reads .juan/context.md for project constraints' },
      { icon: '📋', label: 'Project Charter', sub: 'Aligns stakeholders on scope & goals' },
      { icon: '📝', label: 'Write PRD',       sub: 'User stories + acceptance criteria' },
      { icon: '📅', label: 'Sprint Plan',     sub: 'Breaks PRD into sprints with estimates' },
      { icon: '✅', label: 'Handoff',         sub: 'Carlo picks up the approved PRD' },
    ],
    outputs: [
      {
        icon: '📋', title: 'Project Charter',
        desc: 'Stakeholder-aligned doc covering scope, goals, and success criteria.',
        preview: `# Project Charter — SME Inventory System
_Author: Rica | Date: 2026-06-29_

## Problem Statement
Small sari-sari store owners lose ₱15,000/mo on average due to
spoilage from manual stock tracking. A mobile-first inventory
app can cut this by 60%.

## Goals
- G1: Reduce spoilage by 50% within 3 months of launch
- G2: < 2 min to log a restock from any Android device
- G3: Offline-first — works without stable internet

## Out of Scope
- POS / payments integration (Phase 2)
- iOS (Android first)

## Success Criteria
- 100 active users by Week 8
- < 5% crash rate on Android 10+`,
      },
      {
        icon: '📝', title: 'PRD (Product Requirements)',
        desc: 'Structured user stories with acceptance criteria for each feature.',
        preview: `# PRD — SME Inventory System
_Author: Rica | Status: Draft_

## Epic 1: Stock Management

### US-01 · Log restock
As a store owner, I want to scan a barcode and log quantity
so that I don't manually count items.

**Acceptance Criteria**
- AC-01: Camera opens within 1 tap from home screen
- AC-02: Barcode recognized within 2 seconds
- AC-03: Quantity field pre-fills to last restock amount
- AC-04: Offline queue syncs when connection resumes

### US-02 · Low-stock alert
As a store owner, I want a push notification when stock
drops below my set threshold so I can reorder in time.`,
      },
      {
        icon: '📅', title: 'Sprint Timeline',
        desc: 'Sprint breakdown with effort estimates per user story.',
        preview: `# Sprint Plan — SME Inventory System
_Author: Rica | Sprint length: 2 weeks_

## Sprint 1 (Jul 1–12) · Foundation
| Story | Points | Owner | AC |
|-------|--------|-------|-----|
| US-01 Log restock | 8 | Nico + Rex | AC-01..04 |
| US-02 Low-stock alert | 5 | Rex | AC-05..07 |
| US-03 Dashboard view | 5 | Nico | AC-08..10 |

**Sprint goal:** Store owner can log stock and see dashboard

## Sprint 2 (Jul 13–26) · Intelligence
- US-04 Spoilage prediction (13 pts)
- US-05 Export report (5 pts)`,
      },
    ],
    promptTrigger: '/sw:rica-pm-prd',
    samplePrompt: `We're building a mobile inventory app for sari-sari store owners.

Key constraints:
- Android-only first, offline-first
- Target users: non-technical store owners, 40-60 yrs old
- Timeline: 8 weeks to launch
- Budget: 2 devs full-time

Can you write the PRD for the stock management epic?`,
    sampleResponse: `Got it! Let me read the project context first, then I'll draft
the PRD for Stock Management.

Reading .juan/context.md... ✓

# PRD — Stock Management Epic
_Rica | Based on context: SME Inventory v1_

I'll structure this around 3 user stories that cover the core
loop: log → alert → report. Each AC is written so Dino can
automate it and Bea can verify it manually.

Starting with US-01: Log restock...`,
    skills: [
      { icon: '📋', name: 'Project Charter',   desc: 'Kickoff doc aligning stakeholders on scope and goals.' },
      { icon: '📝', name: 'PRD Writer',         desc: 'User stories and acceptance criteria from project context.' },
      { icon: '📅', name: 'Sprint Planner',     desc: 'Breaks PRD epics into sprints with effort estimates.' },
      { icon: '📖', name: 'Context Reader',     desc: 'Reads .juan/context.md — never guesses project details.' },
    ],
  },

  // ── CARLO ────────────────────────────────────────────────────────────────
  'carlo': {
    id: 'carlo', icon: '⚙️', name: 'Carlo', emoji: '👨‍💻',
    role: 'Lead Engineer', domain: 'Engineering Architecture',
    model: 'claude-opus-4-8',
    skills_prefix: 'sw:carlo-lead-',
    tagline: 'Architecture, tech plans, and security — Carlo gates every build.',
    desc: 'Carlo creates the technical implementation plan before any code is written, reviews architecture decisions, and audits security-sensitive features. Nico and Rex never start without Carlo\'s plan.',
    tags: ['Tech Plan', 'Architecture', 'Security Audit', 'API Contracts', 'Opus 4'],
    workflow: [
      { icon: '📝', label: 'Read PRD',          sub: 'Rica\'s PRD + Mika\'s design specs' },
      { icon: '🏗️', label: 'Define Architecture', sub: 'Stack, data models, component boundaries' },
      { icon: '📡', label: 'API Contracts',      sub: 'Endpoints, request/response shapes' },
      { icon: '🔒', label: 'Security Audit',     sub: 'Auth, PII, uploads, external APIs' },
      { icon: '📄', label: 'Tech Plan',          sub: 'Phase breakdown — Nico & Rex execute' },
    ],
    outputs: [
      {
        icon: '🏗️', title: 'Technical Plan',
        desc: 'Architecture, data models, API contracts, and phased implementation breakdown.',
        preview: `# Technical Plan — SME Inventory System
_Author: Carlo | Status: Approved_

## Stack Decision
- Frontend: React Native (Expo) — offline-first via SQLite
- Backend: Node.js + Fastify + PostgreSQL
- Sync: Custom delta-sync over HTTPS (not WebSockets — low-end devices)

## Data Models
\`\`\`
Product { id, barcode, name, unit, low_threshold }
StockEntry { id, product_id, qty, type, ts, synced }
\`\`\`

## API Contracts
POST /stock-entries  { product_id, qty, type }
GET  /products       { search?, limit, offset }

## Phase Breakdown
- P1: Auth + product CRUD + offline queue (Nico + Rex, Sprint 1)
- P2: Sync engine + push notifications (Rex, Sprint 2)`,
      },
      {
        icon: '🔒', title: 'Security Audit',
        desc: 'Pre-ship security review covering auth, data handling, and API exposure.',
        preview: `# Security Audit — SME Inventory System
_Author: Carlo | Scope: Auth + API layer_

## Findings

### HIGH · JWT stored in AsyncStorage
- Risk: XSS/native bridge extraction
- Fix: Use expo-secure-store instead
- Status: ⚠️ Open

### MEDIUM · No rate limiting on /auth/login
- Risk: Brute force
- Fix: 5 attempts / 15 min per IP
- Status: ⚠️ Open

### LOW · SQL queries use string interpolation
- Risk: SQLi in search param
- Fix: Parameterize all queries
- Status: ✅ Fixed in commit a3f2b1`,
      },
    ],
    promptTrigger: '/sw:carlo-lead-plan',
    samplePrompt: `We have an approved PRD for a stock management mobile app.

Stack: React Native + Node.js + PostgreSQL
Key constraint: Must work offline on low-end Android devices.

Can you create the technical implementation plan so Nico and
Rex know exactly what to build?`,
    sampleResponse: `On it. Let me read the PRD and design specs first.

Reading plans/prd-stock-management.md... ✓
Reading plans/mika-design-specs-stock-management.md... ✓

Key architectural decision I need to flag before we start:

Offline-first on low-end Android rules out WebSockets for sync.
I'm recommending a delta-sync approach over HTTPS — simpler,
battery-friendly, works on 2G. Let me know if you want to
discuss before I finalize the plan.

Building the tech plan now...`,
    skills: [
      { icon: '🏗️', name: 'Technical Planner', desc: 'Architecture + data models + API contracts per PRD.' },
      { icon: '🔍', name: 'Arch Reviewer',     desc: 'Senior perspective on design decisions and tech debt.' },
      { icon: '🔒', name: 'Security Auditor',  desc: 'Auth, PII, file uploads, and external API audit.' },
    ],
  },

  // ── MIKA ─────────────────────────────────────────────────────────────────
  'mika': {
    id: 'mika', icon: '🎨', name: 'Mika', emoji: '👩‍🎨',
    role: 'Designer', domain: 'UI/UX Design',
    model: 'claude-sonnet-4-6',
    skills_prefix: 'sw:mika-',
    tagline: 'Wireframes, component layouts, and pixel-precise specs for Nico.',
    desc: 'Mika creates UI designs and wireframes from requirements, then produces detailed design specs — spacing, colors, typography, component props — that Nico uses for pixel-perfect implementation.',
    tags: ['Wireframes', 'Design Specs', 'Components', 'Typography', 'Sonnet 4.6'],
    workflow: [
      { icon: '📝', label: 'Read PRD',         sub: 'User stories that need UI' },
      { icon: '✏️', label: 'Wireframes',        sub: 'Layouts and user flow sketches' },
      { icon: '🎨', label: 'Visual Design',     sub: 'Colors, typography, component polish' },
      { icon: '📐', label: 'Design Specs',      sub: 'Spacing, props, breakpoints for Nico' },
      { icon: '🤝', label: 'Handoff to Nico',   sub: 'Spec file ready for implementation' },
    ],
    outputs: [
      {
        icon: '✏️', title: 'Wireframes',
        desc: 'Layout wireframes per screen with annotated user flow.',
        preview: `# Wireframes — Stock Management App
_Author: Mika | Screen: Home Dashboard_

## Layout
┌─────────────────────────┐
│  🤙 StockPH    [+ Log]  │  ← nav: logo + primary CTA
├─────────────────────────┤
│  ⚠️  3 low-stock items  │  ← alert banner, dismissable
├─────────────────────────┤
│  [Search products...]   │  ← search bar
├─────────────────────────┤
│  📦 Rice        42 kg  │
│  📦 Sugar       8 kg ⚠│  ← red indicator < threshold
│  📦 Cooking Oil 2 L  ⚠│
└─────────────────────────┘

## Flow notes
- Tapping any row → Product Detail
- [+ Log] opens bottom sheet (barcode or manual)`,
      },
      {
        icon: '📐', title: 'Design Specs',
        desc: 'Precise spacing, colors, typography, and component props for Nico.',
        preview: `# Design Specs — ProductListItem
_Author: Mika | For: Nico_

## Component Props
\`\`\`ts
interface ProductListItemProps {
  name: string;
  quantity: number;
  unit: string;
  isLowStock: boolean;
  onPress: () => void;
}
\`\`\`

## Spacing
- Container: paddingH 16, paddingV 12
- Between icon and text: 12
- Between name and qty: auto (space-between)

## Colors
- Normal qty text: #1a1a2e
- Low-stock qty: #ef4444 (red-500)
- Low-stock background: rgba(239,68,68,0.06)

## Typography
- Name: 15px / SemiBold / #0f0f1a
- Qty: 14px / Regular / see colors above`,
      },
    ],
    promptTrigger: '/sw:mika-design-ui',
    samplePrompt: `I need a design for the stock logging screen.

The user flow: tap [+ Log] → barcode scan option or manual
entry → confirm quantity → success toast.

The app targets non-technical store owners on Android.
Keep it dead simple — big tap targets, minimal text.`,
    sampleResponse: `Got it — designing for clarity over cleverness. Let me start
with the user flow, then move to component-level specs.

## Stock Log Screen — Design Notes

Big decisions I'm making:
1. Full-screen bottom sheet (not a new page) — keeps context
2. Barcode first, manual as fallback — reduces typing for users
3. Number pad instead of keyboard — faster qty entry

Producing wireframes now, then handing to Nico with specs...`,
    skills: [
      { icon: '✏️', name: 'UI Designer',     desc: 'Wireframes and visual designs from user stories.' },
      { icon: '📐', name: 'Spec Generator', desc: 'Pixel-precise component specs for frontend implementation.' },
    ],
  },

  // ── NICO ─────────────────────────────────────────────────────────────────
  'nico': {
    id: 'nico', icon: '🖥️', name: 'Nico', emoji: '👨‍🎨',
    role: 'Frontend Developer', domain: 'Frontend Development',
    model: 'claude-sonnet-4-6',
    skills_prefix: 'sw:nico-fe-',
    tagline: 'Builds UI components and pages from Mika\'s specs and Carlo\'s plan.',
    desc: 'Nico implements frontend features — components, pages, animations, state management. He requires Carlo\'s engineering plan and Mika\'s design specs before starting, and also reviews frontend PRs for visual correctness and accessibility.',
    tags: ['UI Components', 'Pages', 'Accessibility', 'Frontend Review', 'Sonnet 4.6'],
    workflow: [
      { icon: '📄', label: 'Read Tech Plan',   sub: 'Carlo\'s phase breakdown' },
      { icon: '📐', label: 'Read Design Specs', sub: 'Mika\'s spacing, colors, props' },
      { icon: '🧱', label: 'Build Components',  sub: 'Atomic UI components from spec' },
      { icon: '📱', label: 'Assemble Pages',    sub: 'Compose components into screens' },
      { icon: '♿', label: 'Accessibility',     sub: 'A11y labels, keyboard nav, contrast' },
    ],
    outputs: [
      {
        icon: '🧱', title: 'UI Components',
        desc: 'Typed, accessible React/RN components built from Mika\'s specs.',
        preview: `// ProductListItem.tsx — built by Nico
import { Pressable, Text, View } from 'react-native';

interface Props {
  name: string;
  quantity: number;
  unit: string;
  isLowStock: boolean;
  onPress: () => void;
}

export function ProductListItem({ name, quantity, unit,
  isLowStock, onPress }: Props) {
  return (
    <Pressable
      style={[styles.container, isLowStock && styles.lowStock]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={\`\${name}, \${quantity} \${unit}\${
        isLowStock ? ', low stock warning' : ''
      }\`}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.qty, isLowStock && styles.qtyLow]}>
        {quantity} {unit}
      </Text>
    </Pressable>
  );
}`,
      },
      {
        icon: '🔍', title: 'Frontend Review',
        desc: 'Adversarial review of UI code for visual correctness and spec compliance.',
        preview: `# Frontend Review — Stock Log Screen
_Reviewer: Nico_

## Issues Found

### HIGH · Bottom sheet closes on backdrop tap without confirming
- Mika's spec: "confirm dialog if qty > 0"
- Current: No confirm — data loss risk
- Fix: Add onClose guard in BottomSheetModal

### MEDIUM · Number pad missing accessibility labels
- WCAG 2.1 AA requires visible label on inputs
- Fix: Add accessibilityLabel to each NumpadKey

### LOW · Loading spinner not centered on slow devices
- Flex centering breaks when keyboard is open
- Fix: Use KeyboardAvoidingView wrapper`,
      },
    ],
    promptTrigger: '/sw:nico-fe-build',
    samplePrompt: `Build the ProductListItem component.

Carlo's plan: plans/tech-plan-stock.md (Phase 1)
Mika's specs: plans/mika-design-specs-stock.md

The component should show product name, quantity with unit,
and a red low-stock indicator. Tap opens the Product Detail.`,
    sampleResponse: `On it. Reading Carlo's plan and Mika's specs now.

Reading plans/tech-plan-stock.md... ✓ (P1 scope confirmed)
Reading plans/mika-design-specs-stock.md... ✓

Key spec notes I'm following:
- paddingH 16 / paddingV 12 on container
- Low-stock: #ef4444 text + rgba(239,68,68,0.06) bg
- accessibilityLabel must include low-stock warning

Building ProductListItem.tsx...`,
    skills: [
      { icon: '🧱', name: 'Component Builder', desc: 'UI components from design specs — typed and accessible.' },
      { icon: '📱', name: 'Page Assembler',    desc: 'Composes components into full screens.' },
      { icon: '🔍', name: 'Frontend Reviewer', desc: 'Visual correctness, a11y, and spec compliance review.' },
    ],
  },

  // ── REX ──────────────────────────────────────────────────────────────────
  'rex': {
    id: 'rex', icon: '🔧', name: 'Rex', emoji: '👨‍💻',
    role: 'Backend Developer', domain: 'Backend Development',
    model: 'claude-sonnet-4-6',
    skills_prefix: 'sw:rex-be-',
    tagline: 'API endpoints, business logic, and database design — Rex builds the engine.',
    desc: 'Rex implements backend features following Carlo\'s engineering plan — API endpoints, business logic, and server-side validation. He also designs database schemas and writes migrations when new entities are needed.',
    tags: ['REST API', 'Business Logic', 'Database', 'Migrations', 'Sonnet 4.6'],
    workflow: [
      { icon: '📄', label: 'Read Tech Plan',   sub: 'Carlo\'s API contracts + data models' },
      { icon: '🗄️', label: 'Design Schema',    sub: 'Tables, relations, indexes' },
      { icon: '📡', label: 'Build Endpoints',   sub: 'REST APIs per contract' },
      { icon: '⚙️', label: 'Business Logic',    sub: 'Validation, rules, error handling' },
      { icon: '🔒', label: 'Security Hardening', sub: 'Input sanitization, auth guards' },
    ],
    outputs: [
      {
        icon: '📡', title: 'API Endpoints',
        desc: 'REST endpoints built to Carlo\'s contracts with full error handling.',
        preview: `// POST /stock-entries — Rex implementation
router.post('/stock-entries',
  authenticate,
  validateBody(StockEntrySchema),
  async (req, reply) => {
    const { product_id, qty, type } = req.body;
    const userId = req.user.id;

    const product = await db.product.findUnique({
      where: { id: product_id, owner_id: userId },
    });
    if (!product) return reply.status(404).send({
      error: 'PRODUCT_NOT_FOUND',
    });

    const entry = await db.stockEntry.create({
      data: { product_id, qty, type, created_by: userId },
    });

    // Trigger low-stock check async
    await queue.add('check-low-stock', { product_id });

    return reply.status(201).send(entry);
  }
);`,
      },
      {
        icon: '🗄️', title: 'Database Schema',
        desc: 'Schema design with migration scripts for new entities.',
        preview: `-- Migration: 0003_create_stock_entries
-- Author: Rex | Date: 2026-06-29

CREATE TABLE stock_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id),
  qty         DECIMAL(10,2) NOT NULL CHECK (qty > 0),
  type        VARCHAR(20) NOT NULL CHECK (
                type IN ('restock','sale','adjustment','waste')),
  created_by  UUID NOT NULL REFERENCES users(id),
  synced      BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stock_entries_product ON stock_entries(product_id);
CREATE INDEX idx_stock_entries_sync    ON stock_entries(synced)
  WHERE synced = false;`,
      },
    ],
    promptTrigger: '/sw:rex-be-build',
    samplePrompt: `Implement the stock entry endpoint per Carlo's plan.

Carlo's plan: plans/tech-plan-stock.md Phase 1
Contract: POST /stock-entries { product_id, qty, type }

Requirements:
- Validate ownership (users can only log their own products)
- Queue a low-stock check after every entry
- Must be offline-sync ready (synced flag on entries)`,
    sampleResponse: `On it. Reading Carlo's plan.

Reading plans/tech-plan-stock.md... ✓
Contract confirmed: POST /stock-entries

Two things I'm flagging before I build:

1. The "synced" flag for offline — I'll add it to the schema
   but the sync engine logic (delta-sync) Carlo planned for P2
   should own the update logic. I'll stub it.

2. Low-stock queue — async job or in-request? Going async
   (fire-and-forget) so the API stays fast on 2G.

Building the endpoint and migration now...`,
    skills: [
      { icon: '📡', name: 'API Builder',      desc: 'REST endpoints per Carlo\'s contracts with error handling.' },
      { icon: '🗄️', name: 'DB Designer',     desc: 'Schema design, relations, indexes, and migrations.' },
      { icon: '⚙️', name: 'Logic Implementer', desc: 'Business rules, validation, and auth guards.' },
    ],
  },

  // ── TINA ─────────────────────────────────────────────────────────────────
  'tina': {
    id: 'tina', icon: '🧪', name: 'Tina', emoji: '👩‍🔬',
    role: 'QA Lead', domain: 'Quality Assurance',
    model: 'claude-opus-4-8',
    skills_prefix: 'sw:tina-qa-',
    tagline: 'Plans the quality strategy and orchestrates the full QA run.',
    desc: 'Tina creates the QA strategy from PRD acceptance criteria, assigns test writing to Lara and execution to Dino, then orchestrates the full QA run including Bea\'s manual acceptance review.',
    tags: ['QA Strategy', 'Test Plan', 'Orchestration', 'Sign-off', 'Opus 4'],
    workflow: [
      { icon: '📝', label: 'Read PRD ACs',    sub: 'Rica\'s acceptance criteria' },
      { icon: '🗺️', label: 'QA Plan',         sub: 'Strategy, coverage targets, assignments' },
      { icon: '✍️', label: 'Assign Lara',      sub: 'Lara writes structured test cases' },
      { icon: '🤖', label: 'Trigger Dino',     sub: 'Dino executes automated tests' },
      { icon: '👀', label: 'Trigger Bea',      sub: 'Bea does manual acceptance review' },
      { icon: '✅', label: 'QA Sign-off',      sub: 'Tina synthesizes results and approves' },
    ],
    outputs: [
      {
        icon: '🗺️', title: 'QA Plan',
        desc: 'Test strategy with coverage targets and work assignments for the team.',
        preview: `# QA Plan — Stock Management Feature
_Author: Tina | Sprint 1_

## Coverage Targets
- Unit tests: ≥ 80% line coverage (business logic)
- Integration: All API endpoints smoke-tested
- E2E: Happy path + 3 critical edge cases
- Manual: Bea reviews all 8 ACs from Rica's PRD

## Assignments
| Work | Owner | Deadline |
|------|-------|----------|
| Write TCs for US-01..03 | Lara | Jul 3 |
| Unit tests (backend) | Dino | Jul 5 |
| Integration tests | Dino | Jul 7 |
| Manual AC review | Bea | Jul 9 |

## Risk Areas
- Offline sync edge cases (US-01 AC-04) — manual only
- Low-stock threshold boundary values — Lara to add BVA cases`,
      },
      {
        icon: '✅', title: 'QA Sign-off',
        desc: 'Final consolidated quality report before the feature merges.',
        preview: `# QA Sign-off — Stock Management Feature
_Author: Tina | Date: 2026-07-09_

## Summary
✅ APPROVED for merge

## Results
| Layer | Coverage | Pass | Fail |
|-------|----------|------|------|
| Unit (Dino) | 84% | 47 | 0 |
| Integration | 100% | 12 | 0 |
| Manual AC (Bea) | 8/8 | 7 | 1 |

## Open Issue (non-blocking)
- BUG-03: Low-stock badge flickers on Android 10
  Severity: Low · Fix in Sprint 2 · Gab to review

Feature ready to ship. 🎉`,
      },
    ],
    promptTrigger: '/sw:tina-qa-plan',
    samplePrompt: `The stock management feature is ready for QA.

PRD: plans/prd-stock-management.md (US-01 to US-05)
Engineering plan: plans/tech-plan-stock.md

Please create the QA plan and assign work to Lara and Dino.
We need to be done by July 9.`,
    sampleResponse: `On it. Reading the PRD and engineering plan.

Reading plans/prd-stock-management.md... ✓ (5 user stories, 18 ACs)
Reading plans/tech-plan-stock.md... ✓

I see one risk area to flag: US-01 AC-04 (offline sync recovery)
can't be fully automated — Dino can test the queue mechanism
but the actual device-offline scenario needs Bea's manual pass.

Building the QA plan and assigning work now...`,
    skills: [
      { icon: '🗺️', name: 'QA Planner',       desc: 'Test strategy, coverage targets, risk areas.' },
      { icon: '🎯', name: 'QA Orchestrator',   desc: 'Coordinates Lara, Dino, and Bea into one QA run.' },
      { icon: '✅', name: 'Sign-off Authority', desc: 'Synthesizes all results into a go/no-go decision.' },
    ],
  },

  // ── LARA ─────────────────────────────────────────────────────────────────
  'lara': {
    id: 'lara', icon: '✍️', name: 'Lara', emoji: '👩‍💻',
    role: 'Test Case Writer', domain: 'Test Documentation',
    model: 'claude-haiku-4-5',
    skills_prefix: 'sw:lara-qa-',
    tagline: 'Structured test cases from acceptance criteria — Dino executes them.',
    desc: 'Lara writes detailed, structured test cases from Rica\'s acceptance criteria. Each TC has step-by-step instructions and expected results so Dino can automate them and Bea can execute them manually.',
    tags: ['Test Cases', 'BVA', 'Edge Cases', 'AC Coverage', 'Haiku 4.5'],
    workflow: [
      { icon: '📝', label: 'Read PRD ACs',    sub: 'Rica\'s acceptance criteria per story' },
      { icon: '🗺️', label: 'Read QA Plan',    sub: 'Tina\'s scope and coverage targets' },
      { icon: '✍️', label: 'Write TCs',        sub: 'Step-by-step with expected results' },
      { icon: '🔍', label: 'Add Edge Cases',   sub: 'BVA, empty states, error paths' },
      { icon: '📄', label: 'Deliver TC File',  sub: 'plans/tests/tc-{slug}.md for Dino' },
    ],
    outputs: [
      {
        icon: '📋', title: 'Test Cases',
        desc: 'Structured test cases per user story with steps and expected results.',
        preview: `# Test Cases — US-01 Log Restock
_Author: Lara | PRD ref: prd-stock-management.md_

## TC-01 · Happy path — barcode scan
**AC covered:** AC-01, AC-02, AC-03
**Steps:**
1. Open app, tap [+ Log] button
2. Grant camera permission
3. Scan barcode of "Rice" product
4. Observe: qty field pre-fills to last restock (50)
5. Change qty to 100, tap Confirm
**Expected:** Stock entry created, qty updated to 142

## TC-02 · Offline mode — entry queued
**AC covered:** AC-04
**Steps:**
1. Enable airplane mode
2. Log a restock of 20kg Sugar
3. Observe entry in pending queue indicator
4. Re-enable network
**Expected:** Entry syncs within 10 seconds`,
      },
    ],
    promptTrigger: '/sw:lara-qa-write',
    samplePrompt: `Write test cases for US-01 (Log Restock) and US-02 (Low-stock alert).

PRD: plans/prd-stock-management.md
QA plan: plans/tina-qa-plan-stock.md

Make sure to cover the offline sync edge case (AC-04) —
Tina flagged it as a manual-only scenario.`,
    sampleResponse: `Reading PRD and QA plan...

PRD: 8 ACs across US-01 and US-02 ✓
QA Plan: Tina wants BVA on the low-stock threshold ✓

For AC-04 (offline sync) I'm writing it as a manual TC with
explicit device steps — Dino won't be able to automate the
airplane mode scenario reliably.

Writing 9 test cases total (5 for US-01, 4 for US-02)...`,
    skills: [
      { icon: '✍️', name: 'TC Writer',       desc: 'Step-by-step test cases from acceptance criteria.' },
      { icon: '🔍', name: 'Edge Case Finder', desc: 'BVA, empty states, and error path coverage.' },
    ],
  },

  // ── DINO ─────────────────────────────────────────────────────────────────
  'dino': {
    id: 'dino', icon: '🤖', name: 'Dino', emoji: '👨‍🔬',
    role: 'Test Engineer', domain: 'Test Execution',
    model: 'claude-haiku-4-5',
    skills_prefix: 'sw:dino-qa-',
    tagline: 'Runs automated tests and reports coverage — usually triggered by Tina.',
    desc: 'Dino executes the automated test suite (unit, integration, e2e) and produces a coverage report. He\'s usually triggered by Tina\'s QA run orchestration, not called directly.',
    tags: ['Unit Tests', 'Integration', 'E2E', 'Coverage', 'Haiku 4.5'],
    workflow: [
      { icon: '🗺️', label: 'Read QA Plan',   sub: 'Tina\'s scope and test targets' },
      { icon: '🤖', label: 'Run Unit Tests',  sub: 'Business logic layer coverage' },
      { icon: '🔌', label: 'Run Integration', sub: 'API endpoint smoke tests' },
      { icon: '🌐', label: 'Run E2E',         sub: 'Critical user flow automation' },
      { icon: '📊', label: 'Coverage Report', sub: 'Results + gaps flagged to Tina' },
    ],
    outputs: [
      {
        icon: '📊', title: 'Test Report',
        desc: 'Coverage report with pass/fail summary and gap analysis.',
        preview: `# Test Report — Stock Management Feature
_Author: Dino | Date: 2026-07-07_

## Summary
✅ Unit: 84% line coverage (target: 80%)
✅ Integration: 12/12 endpoints passing
⚠️  E2E: 3/4 passing (1 flaky — see below)

## Unit Results
Suite                    | Coverage | Pass | Fail
stock-entry.service      |   91%    |  23  |  0
product.service          |   88%    |  14  |  0
sync-queue.service       |   73%    |  10  |  0  ← below target

## Flaky E2E
- TC-offline-sync: Passes locally, fails in CI (timing issue)
  Root cause: CI container has no network delay simulation
  Recommendation: Mark as manual-only (Bea to cover)`,
      },
    ],
    promptTrigger: '/sw:dino-qa-run',
    samplePrompt: `Run the full test suite for the stock management feature.

Scope: unit + integration + e2e
Target: ≥ 80% line coverage on business logic layer
Tina's QA plan: plans/tina-qa-plan-stock.md`,
    sampleResponse: `Running tests now.

▶ Unit tests... 47 passed, 0 failed (84% coverage) ✅
▶ Integration... 12 passed, 0 failed ✅
▶ E2E... 3 passed, 1 flaky ⚠️

Flaky test: TC-offline-sync — passing locally but timing out in
CI. I can't reliably simulate offline mode in a container.
Flagging this to Tina — Bea should cover it manually.

Full report saved to plans/reports/dino-test-run-...`,
    skills: [
      { icon: '🤖', name: 'Test Runner',      desc: 'Executes unit, integration, and e2e test suites.' },
      { icon: '📊', name: 'Coverage Reporter', desc: 'Gap analysis and recommendations for Tina.' },
    ],
  },

  // ── GAB ──────────────────────────────────────────────────────────────────
  'gab': {
    id: 'gab', icon: '🔍', name: 'Gab', emoji: '👨‍💻',
    role: 'Code Reviewer', domain: 'Code Review',
    model: 'claude-sonnet-4-6',
    skills_prefix: 'sw:gab-rev-',
    tagline: 'Adversarial code review — catches bugs, security gaps, and architectural drift.',
    desc: 'Gab does a thorough adversarial review of implementation before merging. He checks for bugs, security issues, architectural drift from Carlo\'s plan, and dead code. He\'s the last engineering gate before QA.',
    tags: ['Bug Detection', 'Security', 'Architecture', 'Code Quality', 'Sonnet 4.6'],
    workflow: [
      { icon: '📄', label: 'Read Tech Plan', sub: 'Carlo\'s intended architecture' },
      { icon: '🔎', label: 'Read Diff/PR',   sub: 'All changed files in scope' },
      { icon: '🐛', label: 'Hunt Bugs',      sub: 'Logic errors, race conditions, edge cases' },
      { icon: '🔒', label: 'Security Check', sub: 'Input handling, auth, data exposure' },
      { icon: '📋', label: 'Review Report',  sub: 'Findings by severity — HIGH must fix' },
    ],
    outputs: [
      {
        icon: '📋', title: 'Code Review',
        desc: 'Adversarial review findings by severity with actionable fixes.',
        preview: `# Code Review — Stock Entry Endpoint
_Reviewer: Gab | PR: #14_

## HIGH (must fix before merge)

### Authorization bypass on product lookup
- File: src/routes/stock-entries.ts:23
- Issue: product_id validated but NOT scoped to userId
  User A can log entries against User B's products
- Fix: Add WHERE owner_id = userId to product lookup

## MEDIUM

### No idempotency key on POST /stock-entries
- Retry on network failure creates duplicate entries
- Fix: Add X-Idempotency-Key header support

## LOW

### qty accepts 0 via Zod schema
- CHECK constraint in DB will catch it but wastes a roundtrip
- Fix: z.number().positive() in StockEntrySchema

## LGTM after HIGH fixed 👍`,
      },
    ],
    promptTrigger: '/sw:gab-rev-code',
    samplePrompt: `Please review PR #14 — Stock Entry endpoint implementation.

Carlo's plan: plans/tech-plan-stock.md
Focus on: auth correctness, input validation, offline-sync logic.
This is going through Tina's QA next so catch anything
automated tests won't.`,
    sampleResponse: `On it. Reading the diff and Carlo's plan.

Reading PR #14 (12 files changed)... ✓
Reading plans/tech-plan-stock.md for intended architecture... ✓

Found one HIGH issue immediately — authorization bypass on
the product lookup. User A can log entries for User B's
products. Must fix before merge.

Full review incoming...`,
    skills: [
      { icon: '🐛', name: 'Bug Hunter',       desc: 'Logic errors, race conditions, and edge case detection.' },
      { icon: '🔒', name: 'Security Reviewer', desc: 'Auth correctness, input handling, data exposure.' },
      { icon: '🏗️', name: 'Arch Guard',       desc: 'Detects drift from Carlo\'s intended architecture.' },
    ],
  },

  // ── BEA ──────────────────────────────────────────────────────────────────
  'bea': {
    id: 'bea', icon: '✅', name: 'Bea', emoji: '👩‍💼',
    role: 'QA Acceptance Reviewer', domain: 'Acceptance Testing',
    model: 'claude-haiku-4-5',
    skills_prefix: 'sw:bea-qa-',
    tagline: 'Manual acceptance testing — the last human-perspective gate before ship.',
    desc: 'Bea thinks like a user, not an engineer. She manually verifies features against Rica\'s acceptance criteria, checking real user flows, error messages, and edge cases that automated tests miss. Usually the final gate before Tina signs off.',
    tags: ['Manual Testing', 'Acceptance Criteria', 'UX', 'Edge Cases', 'Haiku 4.5'],
    workflow: [
      { icon: '📝', label: 'Read PRD ACs',   sub: 'Rica\'s acceptance criteria to verify' },
      { icon: '📋', label: 'Read TC File',   sub: 'Lara\'s test cases to execute' },
      { icon: '📊', label: 'Read Dino Report', sub: 'What\'s already automated' },
      { icon: '🧪', label: 'Manual Testing', sub: 'User flows, error states, edge cases' },
      { icon: '📋', label: 'QA Report',      sub: 'AC results + bugs for Tina' },
    ],
    outputs: [
      {
        icon: '📋', title: 'Acceptance Review',
        desc: 'AC pass/fail results with bug reports and user-perspective observations.',
        preview: `# QA Acceptance Review — Stock Management
_Reviewer: Bea | Date: 2026-07-09_

## Acceptance Criteria Results
| AC | Story | Result | Notes |
|----|-------|--------|-------|
| AC-01 | US-01 | ✅ Pass | Camera opens in 1 tap |
| AC-02 | US-01 | ✅ Pass | Barcode recognized ~1.2s |
| AC-03 | US-01 | ✅ Pass | Pre-fill matches last restock |
| AC-04 | US-01 | ✅ Pass | Offline queue syncs on reconnect |
| AC-05 | US-02 | ❌ Fail | See BUG-03 |

## Bugs Found
| ID | Severity | Description |
|----|----------|-------------|
| BUG-03 | Low | Low-stock badge flickers on Android 10 |

## User Experience Notes
- "Confirm" button label too small on lower-res screens
- Success toast disappears too fast (1.2s) — missed by slow readers`,
      },
    ],
    promptTrigger: '/sw:bea-qa-review',
    samplePrompt: `Please do acceptance review for the stock management feature.

PRD: plans/prd-stock-management.md (US-01 to US-03)
Test cases: plans/tests/tc-stock-management.md
Dino's report: plans/reports/dino-test-run-stock.md

Focus on the offline sync flow (AC-04) — Dino couldn't
automate it reliably in CI.`,
    sampleResponse: `On it. Reading all the docs.

PRD: 11 ACs across US-01..03 ✓
Lara's TCs: 9 test cases ✓
Dino's report: E2E TC-offline-sync flagged as manual ✓

Starting manual review. I'll think like a store owner who
isn't tech-savvy — big concern is the offline sync UX.

Does the app clearly communicate that entries are queued?
That's the thing users will panic about. Checking now...`,
    skills: [
      { icon: '🧪', name: 'Manual Tester',    desc: 'User flow verification against acceptance criteria.' },
      { icon: '👁️', name: 'UX Observer',      desc: 'Error messages, edge states, and user confusion points.' },
      { icon: '📋', name: 'Bug Reporter',     desc: 'Structured bug reports with reproduction steps.' },
    ],
  },
};

// Business domains — add new domains here to extend the tab bar
const DOMAINS = [
  {
    id: 'software-development',
    label: 'Software Development',
    icon: '💻',
    desc: 'Full-cycle software team: PM, engineering, design, frontend, backend, and QA.',
  },
  // Future domains: { id: 'marketing', label: 'Marketing', icon: '📣', desc: '...' },
];

// Team metadata — bizDomain links each agent to a DOMAINS entry
const TEAM = [
  { id: 'rica',  emoji: '👩‍💼', domain: 'Product',      color: '#6366f1', bizDomain: 'software-development' },
  { id: 'carlo', emoji: '👨‍💻', domain: 'Engineering',  color: '#f97316', bizDomain: 'software-development' },
  { id: 'mika',  emoji: '👩‍🎨', domain: 'Design',       color: '#ec4899', bizDomain: 'software-development' },
  { id: 'nico',  emoji: '👨‍🎨', domain: 'Frontend',     color: '#06b6d4', bizDomain: 'software-development' },
  { id: 'rex',   emoji: '👨‍💻', domain: 'Backend',      color: '#10b981', bizDomain: 'software-development' },
  { id: 'tina',  emoji: '👩‍🔬', domain: 'QA Lead',      color: '#8b5cf6', bizDomain: 'software-development' },
  { id: 'lara',  emoji: '👩‍💻', domain: 'Test Writing', color: '#f59e0b', bizDomain: 'software-development' },
  { id: 'dino',  emoji: '👨‍🔬', domain: 'Test Exec',    color: '#64748b', bizDomain: 'software-development' },
  { id: 'gab',   emoji: '👨‍💻', domain: 'Code Review',  color: '#ef4444', bizDomain: 'software-development' },
  { id: 'bea',   emoji: '👩‍💼', domain: 'Acceptance',   color: '#14b8a6', bizDomain: 'software-development' },
];
