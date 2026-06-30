---
name: sw:write-minutes
description: "Shared skill — generate structured meeting minutes from a transcript. Adapts format to meeting_type (standup, retro, sprint-planning, sprint-review, tech-sync, upstream). Any domain agent can invoke this with domain context."
argument-hint: "<transcript or meeting notes> --type <meeting_type>"
metadata:
  author: sun-aios
  version: "1.0.0"
---

# Write Meeting Minutes (Shared Skill)

You generate structured meeting minutes from a transcript or raw notes. Format adapts based on `meeting_type`. You receive domain context from the calling agent to guide extraction.

## Inputs

| Field | Required | Description |
|---|---|---|
| `transcript` | Yes | Raw transcript, voice-to-text output, or bullet notes |
| `meeting_type` | Yes | One of: `standup`, `retro`, `sprint-planning`, `sprint-review`, `tech-sync`, `upstream`, `incident-postmortem` |
| `domain_context` | Optional | e.g. "Sales pipeline review" or "Sprint 5 planning for SME Inventory" |
| `attendees` | Optional | List of attendees if not in transcript |
| `date` | Optional | Meeting date — defaults to today |

## Output Format by Meeting Type

### standup
```markdown
# Standup — {date}
**Attendees:** {list}

## Updates
| Person | Done | Today | Blockers |
|--------|------|-------|----------|
| ...    | ...  | ...   | ...      |

## Action Items
- [ ] {owner}: {action} — due {date}
```

### retro
```markdown
# Sprint Retro — Sprint {N} · {date}
**Attendees:** {list}

## What Went Well
- ...

## What Needs Improvement
- ...

## Action Items
- [ ] {owner}: {action} — due {date}
```

### sprint-planning
```markdown
# Sprint Planning — Sprint {N} · {date}
**Attendees:** {list}

## Sprint Goal
{one-sentence goal}

## Committed Stories
| Story | Points | Owner |
|-------|--------|-------|
| ...   | ...    | ...   |

## Risks & Dependencies
- ...

## Action Items
- [ ] {owner}: {action}
```

### sprint-review
```markdown
# Sprint Review — Sprint {N} · {date}
**Attendees:** {list}

## Demonstrated Features
- {feature}: {outcome / stakeholder feedback}

## Not Completed
- {story}: {reason}

## Stakeholder Feedback
- ...

## Action Items
- [ ] {owner}: {action}
```

### tech-sync / incident-postmortem / upstream
```markdown
# {Meeting Type} — {date}
**Attendees:** {list}

## Decisions Made
- ...

## Discussion Points
- ...

## Action Items
- [ ] {owner}: {action} — due {date}

## Next Meeting
{date or "TBD"}
```

## Steps

1. Parse the transcript — identify speakers, topics, decisions, and action items
2. Apply the correct output format for `meeting_type`
3. Use `domain_context` to label decisions accurately (e.g. don't call a sales pipeline item a "bug")
4. Extract ALL action items with an explicit owner — if owner is unclear, mark as `[TBD]`
5. Output the minutes in a markdown code block ready to save

## Guardrails
- Never invent decisions or action items not present in the transcript
- If transcript is too short or unclear, ask the user to clarify before writing
- Always include a section even if empty (write "None" rather than omitting)
- Save output to `plans/minutes/{meeting_type}-{date}-{slug}.md` and confirm the path
