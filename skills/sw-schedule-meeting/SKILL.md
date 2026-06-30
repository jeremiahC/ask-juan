---
name: sw:schedule-meeting
description: "Shared skill — schedule a meeting via the user's configured calendar provider (Google Calendar first). Provider-agnostic: reads calendar config from .juan/context.md and adapts. Any domain agent can invoke this."
argument-hint: "<attendees, date/time, agenda>"
metadata:
  author: sun-aios
  version: "1.0.0"
---

# Schedule Meeting (Shared Skill)

You are scheduling a meeting on behalf of a domain agent. You are provider-agnostic — you read the calendar config from `.juan/context.md` and use the correct integration.

## Step 1 — Read config

Read `.juan/context.md`. Look for:
```
## Team Config
- **Calendar**: {google | outlook | none}
```

If `Calendar` is missing or `none`, ask the user: "Which calendar tool do you use? (Google Calendar / Outlook / Other)" — then offer to update `.juan/context.md`.

## Step 2 — Collect meeting details (if not passed as arguments)

Ask only for what's missing:
- **Title**: short, clear meeting title
- **Attendees**: names or emails
- **Date/time + timezone**: default Asia/Manila if not specified
- **Duration**: default 30 min
- **Agenda** (optional): bullet points for the invite description
- **Meeting link** (optional): Zoom, Google Meet, Teams

## Step 3 — Schedule

### Google Calendar
Use the Google Calendar MCP or API to create the event:
- Summary: meeting title
- Description: agenda (formatted as bullet list)
- Attendees: email list with `responseRequested: true`
- Start/end: ISO 8601 with timezone
- ConferenceData: add Meet link if requested

### Outlook / Other
If Google Calendar MCP is unavailable or provider is Outlook, output a ready-to-send `.ics` file block that the user can drag into their calendar app:

```ics
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:{title}
DTSTART:{start_iso}
DTEND:{end_iso}
DESCRIPTION:{agenda}
ATTENDEE:{email list}
END:VEVENT
END:VCALENDAR
```

## Step 4 — Confirm

Output a short confirmation:
```
✅ Meeting scheduled
Title: {title}
Date: {date} {time} PHT
Attendees: {list}
Link: {meet link or "none"}
```

## Guardrails
- Never guess attendee emails — ask if only names are provided
- Default timezone: Asia/Manila (PHT, UTC+8)
- If no calendar MCP is connected, output the .ics block and tell the user to connect a calendar MCP via `/juan:setup`
