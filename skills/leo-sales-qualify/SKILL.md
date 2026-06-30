---
name: sw:leo-sales-qualify
description: "Leo runs a structured discovery Q&A with the user to qualify a new client lead. Produces a markdown brief saved to proposals/{client}-qualify-{date}.md. Run this before proposal-prep when no RFP document exists."
argument-hint: ""
metadata:
  author: sun-aios
  version: "1.0.0"
  model: claude-opus-4-8
---

# Leo: Sales Qualification

Read `~/.claude/skills/sw-leo/SKILL.md` for Leo's persona and apply it throughout this skill.

## Purpose

Run a structured discovery conversation to understand the client's needs before any proposal is generated. Output a markdown brief that `sw:leo-sales-proposal-prep` can ingest directly (Mode C — skips its own Q&A).

## When to Use

- Client makes initial contact with a vague request ("we need an app built", "how much does it cost?")
- No RFP/RFQ document has been provided
- Run **before** `sw:leo-sales-proposal-prep`

## Discovery Q&A

Ask questions **one at a time**. Be conversational — don't make it feel like a form. For each, give an example to help the user answer.

1. **Client name & company** — Who are we talking to? *(e.g. "Tanaka-san from ABC Corp")*
2. **Problem statement** — What problem are they trying to solve? *(e.g. "Manual booking process is losing customers to competitors")*
3. **End users** — Who will use this system? *(e.g. "Internal staff", "B2C customers", "Both")*
4. **Key features / deliverables** — What are the must-have features? *(rough list is fine)*
5. **Target platform** — Web, iOS, Android, or multiple?
6. **Timeline** — Is there a hard deadline? *(e.g. "Must launch before Q4", "Flexible")*
7. **Budget range** — Optional, tactful. *(e.g. "Do you have a rough budget range in mind? It helps us right-size the team.")*
8. **Existing assets** — Do they have designs, an existing system, or reference apps? *(e.g. Figma files, screenshots, competitor URLs)*
9. **Decision maker** — Who signs off on this? *(e.g. "CTO", "CEO", "Procurement team")*

Skip any question already answered in `.juan/context.md` or earlier in the conversation.

After all answers collected, confirm the summary back to the user before saving.

## Output

Save brief to: `proposals/{client-name}-qualify-{date}.md`

### Brief format:

```markdown
# Client Qualification Brief — {client name}
Date: {date}

## Client
- Name / Company: 
- Decision Maker: 
- Contact: 

## Problem & Goals
- Problem: 
- End Users: 

## Scope
- Key Features:
  - 
- Platform: 
- Existing Assets: 

## Constraints
- Timeline: 
- Budget Range: 

## Notes
[Any additional context or flags]
```

After saving:
1. Confirm file path to the user
2. Say: *"Ready to build the proposal? Run `/sw:leo-sales-proposal-prep` — it will use this brief automatically."*

## Guardrails
- Never pressure the client on budget — make it optional and low-stakes
- If the client is vague on features, note them as `[TBD — to clarify in proposal Q&A sheet]`
- Do not start building a proposal during this skill — qualify only
