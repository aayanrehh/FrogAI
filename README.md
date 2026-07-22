# FrogAI

FrogAI is an AI operating system concept for real estate teams. It connects the work that usually falls between disconnected tools: creating listing demand, answering new inquiries, qualifying intent, booking the next step, reactivating a quiet database, and understanding which activity created an opportunity.

This repository contains the public product site, interactive product demonstrations, and a free lead-journey audit. It is intentionally useful to three audiences: AI product managers evaluating the product thesis, AI engineers evaluating the workflow boundaries, and AI RevOps operators evaluating the lead-to-appointment system.

## Product thesis

Real estate teams rarely have a single “lead problem.” They lose revenue at the handoffs between creative, lead capture, first response, follow-up, appointment booking, and attribution. FrogAI treats those handoffs as one coordinated journey.

| Agent | Job to be done | Primary output |
| --- | --- | --- |
| **Leap** | Turn listing assets into attention | Facebook-ready listing video, social cutdowns, and visibility content |
| **Ribbit** | Respond while intent is fresh | Qualification conversation, appointment, and CRM-ready summary |
| **Lily** | Recover value from existing relationships | Segmented reactivation messages and attributed opportunities |
| **Croak** | Make a property explorable before the showing | Premium browser-based Gaussian-splat walkthrough and engagement signals |

The near-term commercial wedge is a paid design-partner pilot around one measurable workflow—for example, speed-to-lead or database reactivation—rather than asking a team to replace its CRM.

## For AI product and PM roles

The site expresses a product strategy built around observable business outcomes rather than generic “AI assistant” features.

- **User:** independent agents, small and midsize teams, and brokerages already buying leads or maintaining a meaningful CRM database.
- **Pain:** slow first response, inconsistent follow-up, underused listing content, dormant contacts, and unclear attribution.
- **North-star outcome:** qualified conversations that become appointments, with a traceable source and a useful human handoff.
- **Activation event:** a lead source or CRM export is connected and the first workflow reaches a reviewable output.
- **Leading metrics:** first-response time, reply rate, qualified-conversation rate, appointment-booked rate, reactivation rate, human takeover rate, and creative-to-conversation rate.
- **Guardrails:** approved tone, disclosure and consent rules, escalation policy, suppressed contacts, data minimization, audit logs, and no unsupported claims about lead quality or revenue.

Recommended pilot evaluation:

1. Establish a two-week baseline from the existing CRM.
2. Select one workflow and a bounded lead segment.
3. Define success and escalation criteria before launch.
4. Review transcripts and handoffs daily during the pilot.
5. Compare outcome, latency, agent workload, and complaint/opt-out rates against baseline.

## For AI engineering roles

The current repository is a React + TypeScript product experience. The interactions are deterministic demonstrations; it does **not** yet contain a production messaging backend, CRM connector, model gateway, or customer data store.

The intended production boundary is:

```text
Lead source / CRM
        ↓
Event normalization + consent/suppression checks
        ↓
Workflow policy + agent orchestration
        ↓
LLM generation with structured outputs and retrieval
        ↓
Channel adapter (SMS, email, web chat, calendar)
        ↓
Human handoff + CRM write-back + attribution event
```

Production engineering priorities:

- idempotent inbound-event handling and lead deduplication;
- explicit tenant, user, and contact isolation;
- structured qualification state instead of transcript-only memory;
- tool-level permissions for CRM, calendar, and messaging actions;
- prompt/version logging, transcript review, and evaluation datasets;
- deterministic opt-out, quiet-hours, and escalation behavior;
- delivery-status webhooks, retries, rate limits, and dead-letter handling;
- PII retention controls and auditable deletion workflows.

Croak currently embeds a public SuperSplat viewer as a technology preview. Capture, processing, hosting, analytics, and rights management remain a premium implementation track rather than a shipped self-serve feature.

## For AI RevOps roles

FrogAI is designed to sit across—not replace—the existing revenue stack.

| Revenue stage | FrogAI responsibility | System of record |
| --- | --- | --- |
| Attention | Generate and test listing creative | Ad platform / asset library |
| Capture | Preserve source, campaign, and listing context | CRM |
| Response | Reply, qualify, answer, and escalate | Messaging layer + CRM |
| Conversion | Book a tour or consultation | Calendar + CRM |
| Nurture | Continue relevant follow-up and reactivate segments | CRM |
| Attribution | Connect creative and conversations to appointments | CRM / reporting layer |

Suggested operating dashboard:

- median and 90th-percentile speed-to-lead;
- contact, reply, qualification, and appointment rates by source;
- agent takeover rate and reason;
- no-response sequence performance by touch;
- database reactivation rate by segment;
- booked and held appointments by campaign;
- opt-out, complaint, and failed-delivery rates;
- cost per qualified conversation and cost per held appointment.

## Experience map

- `/` — editorial product narrative and coordinated-agent journey
- `/demos` — interactive demonstrations for Leap, Ribbit, Lily, and Croak
- `/audit` — free five-question lead-journey diagnostic and conversion path

The Frog Support widget is currently hardcoded for qualification and routing UX. It is intentionally separated from a future model/API implementation.

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The Vite development server will print the local URL. The project uses pathname-based route selection, so open `/`, `/demos`, or `/audit` directly.

## Verification

```bash
npm run lint
npm run build
npm run preview
```

Visual verification should include desktop and a 390px mobile viewport. Pay particular attention to the full FrogAI wordmark, the uncropped hero illustration, the fixed-height phone conversation, the Lily CSV-to-review animation, and the Croak spatial embed.

## Repository structure

```text
src/
  App.tsx              Homepage and product storytelling
  AuditPage.tsx        Free lead-journey diagnostic
  DemosPage.tsx        Demonstration route and agent sequence
  FrogSupport.tsx      Hardcoded support/qualification widget
  demos/               Individual agent demonstrations
  index.css            Brand system, layouts, and responsive behavior
public/                 Brand and demonstration assets
```

## Commercial status

The website and audit are ready for founder-led discovery and design-partner sales. The interactive demos communicate the intended workflows but should not be represented as a completed multi-tenant production platform. A first engagement should define one measurable workflow, the source systems involved, review/approval rules, and an implementation boundary in writing.

## Brand and usage

FrogAI, its agent names, illustrations, and supplied brand assets are proprietary project materials. No open-source license is granted by this repository unless a separate license file is added.
