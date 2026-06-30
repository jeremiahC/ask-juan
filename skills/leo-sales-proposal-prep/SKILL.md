---
name: sw:leo-sales-proposal-prep
description: "Leo generates a client proposal Excel workbook — WBS, cost, timeline, resource plan, and a client-facing Q&A sheet. Run after leo-sales-qualify or when an RFP/RFQ document is provided."
argument-hint: "[rfp-file-path or qualify-brief-path]"
metadata:
  author: sun-aios
  version: "1.0.0"
  model: claude-opus-4-8
---

# Leo: Proposal Prep (Excel)

Read `~/.claude/skills/sw-leo/SKILL.md` for Leo's persona and apply it throughout this skill.

## Trigger Detection

Four modes — detect from args and context:

| Mode | Signal | Action |
|------|--------|--------|
| **A — RFP/RFQ** | A file path to an RFP/RFQ document is provided | Read the document, extract scope automatically |
| **B — Q&A** | No document, no qualify brief | Run discovery Q&A with the user to extract scope |
| **C — Qualify Brief** | A `proposals/*-qualify-*.md` file exists or is provided | Read the brief, skip Q&A, proceed to Carlo check |
| **D — Tech Brief** | A `proposals/*-tech-brief-*.md` file exists | Read Carlo's brief, merge into Excel (`04_Stack` + infra costs) |

## Carlo Tech Brief Check

After determining scope (via any mode), check if `proposals/*-tech-brief-*.md` exists:
- **If tech brief exists** → read it, proceed to Excel generation — populate `04_Stack` and infra cost rows from Carlo's data
- **If tech brief does not exist** → spawn Carlo as a foreground subagent:
  > *"Carlo, I need a tech brief for this client before I can complete the proposal. Please run `sw:carlo-lead-research` using `proposals/{client}-qualify-*.md` as input. Send me the brief path when done."*
  
  Wait for Carlo's message, then read the brief and proceed to Excel generation.

---

## Mode A — RFP/RFQ Document Provided

1. Read the provided document (PDF, Excel, Word, or Markdown)
2. Extract: project description, features/scope, platform, timeline constraints, budget (if mentioned), team preferences
3. Summarize extracted scope back to the user in 5–8 bullet points
4. Ask the user to confirm or correct before proceeding
5. Proceed to **Excel Generation**

---

## Mode B — No Document (Discovery Q&A)

Ask the user these questions **one at a time**:

1. **Client & project name** — Who is the client and what are they building?
2. **Project description** — What problem does this solve? What is the core product?
3. **Key features / deliverables** — List the main features or screens (rough is fine)
4. **Target platform** — Web, iOS, Android, or multiple?
5. **Tech stack preference** — Any specific tech required, or does Sun* recommend?
6. **Timeline constraint** — Is there a hard deadline? Or flexible?
7. **Currency** — JPY / PHP / USD? *(Default: JPY)*
8. **Team rates** — Provide monthly rate per role (e.g. L1 Lead: ¥700,000/mo, J1 Dev: ¥400,000/mo, QA: ¥300,000/mo)

Skip questions already answered in context. After all answers collected, proceed to **Excel Generation**.

---

## Mode C — Qualify Brief Provided

1. Look for `proposals/*-qualify-*.md` in the current directory, or use the provided path
2. Read the brief and extract all scope fields
3. Confirm with the user: *"I found the qualify brief for {client}. Here's what I'll use: [summary]. Anything to add or correct?"*
4. Ask only for the fields not in the brief: **currency** and **team rates**
5. Proceed to **Excel Generation**

---

## Excel Generation

Use the `anthropic-skills:xlsx` skill to generate the workbook.

### Sheet: 00_QA — Client Questionnaire
Pre-fill these columns; leave "Client Answer" blank for the client to fill:

| # | Question | Client Answer | Notes / Examples |
|---|----------|---------------|-----------------|
| 1 | What problem are you solving? | | e.g. "Manual booking process losing customers" |
| 2 | What are the key features needed? | | List top 5–10 features |
| 3 | What platform(s) do you need? | | Web / iOS / Android / All |
| 4 | Do you have a design or existing system? | | Figma, screenshots, current app |
| 5 | What is your target go-live date? | | e.g. "Q4 2026" or "ASAP" |
| 6 | Do you have a budget range in mind? | | Optional — helps us right-size the team |
| 7 | Who is the primary point of contact? | | Name, role, email |
| 8 | Any tech stack requirements or preferences? | | e.g. "Must use React" or "Open to recommendation" |

### Sheet: 01_WBS — Work Breakdown Structure
Columns: No. | Category | Function / Page | Description | Type | Complexity (S/M/L) | Role 1 (days) | Role 2 (days) | Testing (days) | Total (days) | Remarks | Planned Month | Rank

- Generate rows based on extracted features/scope
- Use complexity: S = 0.5–1d, M = 1–3d, L = 3–5d
- Testing = (dev days) × 0.2
- Group by category/phase

### Sheet: 02_Team — Rate Card
Columns: Role | Rate/Month | Rate/Day | Notes

- Populate from rates provided by user
- Rate/Day = Rate/Month ÷ 22 (working days)
- Include: testing ratio cell (default 0.2)

### Sheet: 03_Cost — Cost by Month
Columns: Position | Price (¥/month) | Month 1 Effort (MM) | Month 1 Cost | ... | Subtotal MM | Subtotal Cost

- Link effort from 06_Resource_Plan
- Link rates from 02_Team
- Use formulas: Cost = Effort (MM) × Monthly Rate

### Sheet: 04_Stack — Recommended Tech Stack
Columns: Technology | Purpose / Why | Alternatives | Notes

- Populate from Carlo's tech brief (`proposals/*-tech-brief-*.md`) — do not invent stack choices
- Group by: Core Framework, Language, Database, Hosting, Tools
- Add infra cost summary row at the bottom linking to Carlo's monthly estimate

### Sheet: 05_Summary — Project at a Glance
Key metrics linked to other sheets:
- Total features (COUNT from WBS)
- Total effort (days) → (months)
- Total cost
- Estimated timeline
- Team size

### Sheet: 06_Resource_Plan — Man-Month Allocation
Columns: # | Position | Note | Price (hidden) | Assignee | Contract Type | Project Role | Task Category | Month 1...N (MM) | Total MM

- Effort in MM (1.0 = full-time for the month)
- Derive from WBS total days ÷ 22 per role
- Distribute across months based on project phases

### Sheet: Prices — Internal Rate Card *(hidden from client)*
Columns: Role | Cost (currency/month) | Month x...x+N | Total | Total Cost

- Populate from user-provided rates
- Mark sheet as internal — do not share with client

---

## Output

Save Excel to: `proposals/{client-name}-proposal-prep-{date}.xlsx`

After generating:
1. Confirm file path to the user
2. Remind them: *"Share the 00_QA sheet with the client. Once they return it, run `/sw:leo-sales-proposal-prep` again with the filled file to update the workbook."*
3. Offer to generate the pitch deck: *"Ready to generate the client presentation? Run `/sw:leo-sales-proposal-draft`"*

---

## Guardrails
- Never invent rates — always ask the user
- Use assumptions if scope is unclear; label them clearly as `[ASSUMPTION]` in Remarks column
- No legal commitments — add footer: *"This is a preliminary estimate subject to formal agreement."*
- Default currency: JPY unless user specifies otherwise
