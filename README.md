# Ask Juan 🤙

**An AI operating system for your software business.**

Ask Juan is a team of specialized AI agents built for Filipino SMEs and software teams. One prompt to Juan — he reads your project context and routes to the right specialist.

## How It Works

```
/juan:route  I want to build a user authentication feature
```

Juan reads `.juan/context.md`, figures out which agent(s) to call, and dispatches them with your project context already loaded.

## Agents

| Agent | Role | Key Skills |
|---|---|---|
| **Juan** | Orchestrator & Router | Routes all requests, handles onboarding |
| **Rica** | Product Manager | Charter, PRD, sprint timeline |
| **Carlo** | Lead Engineer | Tech plan, architecture, security audit |
| **Scrum** | Scrum Master | Standup, sprint planning, retro, review |
| **Mika** | Designer | Wireframes, design specs |
| **Nico** | Frontend Developer | UI components, pages, frontend review |
| **Rex** | Backend Developer | API endpoints, business logic, DB schema |
| **Tina** | QA Lead | Test strategy, QA orchestration |
| **Lara** | Test Case Writer | Structured test cases from ACs |
| **Dino** | Test Engineer | Automated test execution, coverage |
| **Gab** | Code Reviewer | Bug detection, security, arch review |
| **Bea** | QA Acceptance | Manual acceptance testing |

## Prerequisites

- [Claude Code](https://claude.ai/code) — CLI or desktop app
- A Claude account (Pro or above recommended)
- Node.js 18+ (for `npx`)

## Setup

### 1. Install skills

Ask Juan uses [skills.sh](https://github.com/vercel-labs/skills) — the open agent skills CLI.

**Install all skills globally (recommended):**

```bash
npx skills add jeremiahC/ask-juan -g -a claude-code -y
```

**Install specific agents only:**

```bash
# Just Juan + the full SW dev team
npx skills add jeremiahC/ask-juan --skill juan-route --skill juan-setup -g -a claude-code

# Just Scrum ceremonies
npx skills add jeremiahC/ask-juan --skill sw-scrum-standup --skill sw-scrum-sprint-plan --skill sw-scrum-sprint-retro --skill sw-scrum-sprint-review -g -a claude-code
```

**Browse available skills first:**

```bash
npx skills add jeremiahC/ask-juan --list
```

### 2. Initialize your project

Open Claude Code in your project directory and run:

```
/juan:setup
```

Juan will create a `.juan/context.md` file at your project root. Fill in:
- Project name, type, and stack
- Your PM tool (Backlog, Jira, Linear, or none)
- Your calendar tool (Google Calendar, Outlook, or none)
- Team size and sprint length

### 4. Start working

```
/juan:route  <describe what you need in plain English>
```

Or call agents directly:

```
/sw:rica-pm-prd          # Write a PRD
/sw:carlo-lead-plan      # Create a tech plan
/sw:scrum-sprint-plan    # Prepare sprint planning
/sw:scrum-standup        # Run daily standup
/sw:tina-qa-plan         # Create QA strategy
```

## Available Skills

### Shared (callable by any agent)
| Skill | What it does |
|---|---|
| `sw:schedule-meeting` | Schedule a meeting via Google Calendar or Outlook |
| `sw:write-minutes` | Write structured minutes from a transcript |

### Product
| Skill | What it does |
|---|---|
| `sw:rica-pm-charter` | Draft a project charter |
| `sw:rica-pm-prd` | Write a PRD with user stories and acceptance criteria |
| `sw:rica-pm-timeline` | Create a sprint timeline |
| `sw:pm-write-minutes` | Write minutes for client/stakeholder meetings |

### Engineering
| Skill | What it does |
|---|---|
| `sw:carlo-lead-plan` | Create a technical implementation plan |
| `sw:carlo-lead-review` | Architecture and code review |
| `sw:carlo-lead-security` | Security audit |
| `sw:lead-write-minutes` | Write minutes for tech syncs and postmortems |

### Scrum
| Skill | What it does |
|---|---|
| `sw:scrum-standup` | Facilitate daily standup + write minutes |
| `sw:scrum-sprint-plan` | Prepare and facilitate sprint planning |
| `sw:scrum-sprint-retro` | Facilitate sprint retrospective |
| `sw:scrum-sprint-review` | Facilitate sprint review / demo |

### Design
| Skill | What it does |
|---|---|
| `sw:mika-design-ui` | Create wireframes and UI designs |
| `sw:mika-design-specs` | Generate pixel-precise component specs |

### Frontend
| Skill | What it does |
|---|---|
| `sw:nico-fe-build` | Build UI components and pages |
| `sw:nico-fe-review` | Frontend code review |

### Backend
| Skill | What it does |
|---|---|
| `sw:rex-be-build` | Implement API endpoints |
| `sw:rex-be-db` | Design database schema and migrations |

### QA
| Skill | What it does |
|---|---|
| `sw:tina-qa-plan` | Create QA strategy |
| `sw:tina-qa-run` | Orchestrate the full QA run |
| `sw:lara-qa-write` | Write test cases from acceptance criteria |
| `sw:dino-qa-run` | Run automated tests and report coverage |
| `sw:gab-rev-code` | Adversarial code review |
| `sw:bea-qa-review` | Manual acceptance testing |

## Project Structure

```
your-project/
├── .juan/
│   └── context.md          # Project context — all agents read this
├── plans/
│   ├── charter.md
│   ├── prd-*.md
│   ├── tech-plan-*.md
│   ├── minutes/            # Meeting minutes
│   └── reports/            # Agent reports
└── ...your source code
```

## Contributing

Ask Juan is open source. PRs welcome — especially new domain agents (Sales, Marketing, Accounting).

## License

MIT · Made with ❤️ in the Philippines by [Jeremiah Caballero](mailto:training-ph@sun-asterisk.com)
