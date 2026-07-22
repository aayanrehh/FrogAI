import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import FrogSupport from "./FrogSupport";

const CAL_URL = "https://cal.com/aayan-rehman-ndvc9i/30min";

type Agent = {
  name: string;
  role: string;
  eyebrow: string;
  body: string;
  points: string[];
  color: string;
  className: string;
};

const AGENTS: Agent[] = [
  {
    name: "Leap",
    role: "Listing visibility",
    eyebrow: "Facebook ad video + content",
    body: "Turns listing photos and property details into Facebook ad videos, social cutdowns, and search-ready listing content that earns attention.",
    points: ["Lead-generation creative", "Local + LLM visibility", "Brand-owned content"],
    color: "sage",
    className: "agent-leap",
  },
  {
    name: "Ribbit",
    role: "Speed-to-lead",
    eyebrow: "Qualification + booking",
    body: "Replies in seconds, handles the first useful conversation, qualifies intent, and books the next step without sounding scripted.",
    points: ["Seconds-fast response", "Buyer and seller qualification", "Tour booking + clean handoff"],
    color: "mint",
    className: "agent-ribbit",
  },
  {
    name: "Lily",
    role: "Database reactivation",
    eyebrow: "Personal follow-up",
    body: "Reopens conversations with quiet leads, lapsed clients, and past clients using relevant context from the relationship you already built.",
    points: ["Cold lead reactivation", "Personalized outreach", "Attributed opportunities"],
    color: "lavender",
    className: "agent-lily",
  },
  {
    name: "Croak",
    role: "Spatial property experience",
    eyebrow: "Gaussian-splat walkthroughs",
    body: "Creates a browser-based spatial listing experience buyers can walk through, then surfaces the rooms and moments that hold their attention.",
    points: ["Free-walk 3D scene", "Browser-shareable experience", "Room-level engagement signals"],
    color: "blue",
    className: "agent-croak",
  },
];

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-logo ${compact ? "brand-logo-compact" : ""}`}>
      <img src="/frogai-wordmark.png" alt="FrogAI" />
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Solutions", "#solutions"],
    ["Agents", "#agents"],
    ["How it works", "#how-it-works"],
    ["Results", "#results"],
    ["Free audit", "/audit"],
  ];

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" aria-label="FrogAI home" onClick={() => setOpen(false)}>
          <BrandLogo />
        </a>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="nav-demo" href="/demos">Live demos</a>
          <a className="button button-ink button-small" href={CAL_URL} target="_blank" rel="noreferrer">
            Book a strategy call
          </a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="/demos" onClick={() => setOpen(false)}>Explore live demos</a>
          <a className="button button-ink" href={CAL_URL} target="_blank" rel="noreferrer">Book a strategy call</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="page-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span /> AI agents built for the real estate journey</p>
          <h1>Turn attention into conversations, <em>and conversations into closings.</em></h1>
          <p className="hero-lede">
            FrogAI helps real estate teams generate leads with Facebook ad videos, respond to new inquiries in seconds, reactivate their database, and nurture every promising conversation toward a next step.
          </p>
          <div className="hero-actions">
            <a className="button button-green" href="#solutions">See how it works <Arrow /></a>
            <a className="button button-outline" href={CAL_URL} target="_blank" rel="noreferrer">Book a strategy call</a>
            <a className="text-link" href="#agents">Explore the agents <Arrow /></a>
          </div>
          <div className="hero-proof" aria-label="FrogAI platform capabilities">
            <span><b>01</b> Create demand</span>
            <span><b>02</b> Reply instantly</span>
            <span><b>03</b> Nurture intent</span>
          </div>
        </div>

        <div className="hero-stage" aria-label="FrogAI lead journey visualization">
          <div className="lead-signal">
            <span className="signal-dot" />
            <div><b>New Facebook inquiry</b><small>17 seconds ago · 18 Oak Street</small></div>
          </div>
          <img
            src="/frog-hero.png"
            className="hero-frog"
            alt="Hand-drawn FrogAI frog on a lily pad reaching toward a new real estate lead"
          />
          <div className="journey-panel">
            <div className="journey-head">
              <span>Live lead journey</span>
              <b>In progress</b>
            </div>
            <div className="journey-row">
              <span className="journey-number">01</span>
              <div><b>Listing video viewed</b><small>Facebook campaign · 82% watched</small></div>
              <strong>Leap</strong>
            </div>
            <div className="journey-row active">
              <span className="journey-number">02</span>
              <div><b>Reply sent in 2.4s</b><small>Budget and timeline captured</small></div>
              <strong>Ribbit</strong>
            </div>
            <div className="journey-row">
              <span className="journey-number">03</span>
              <div><b>Tour held for Friday</b><small>Agent summary ready</small></div>
              <strong>Booked</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="page-shell hero-footnote">
        <span>Built for independent agents, teams, and modern brokerages</span>
        <div><b>Facebook</b><b>CRM</b><b>SMS</b><b>Calendar</b><b>Listings</b></div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, body, align = "left" }: { eyebrow: string; title: ReactNode; body?: string; align?: "left" | "center" }) {
  return (
    <div className={`section-intro ${align === "center" ? "section-intro-center" : ""}`}>
      <p className="eyebrow"><span /> {eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function Tension() {
  return (
    <section className="section section-tension">
      <div className="page-shell tension-grid">
        <SectionIntro
          eyebrow="The opportunity gap"
          title={<>Your lead problem is rarely <em>just a lead problem.</em></>}
          body="Good opportunities disappear between the ad, the first reply, the fifth follow-up, and the moment a prospect is finally ready. FrogAI closes those gaps without adding another inbox for your team to babysit."
        />
        <div className="tension-notes">
          <article>
            <span>Demand</span>
            <h3>Your listings need creative that earns the click.</h3>
            <p>Property photos alone are not a Facebook ad strategy. Leap turns the story of the listing into video creative designed to start useful buyer and seller conversations.</p>
          </article>
          <article>
            <span>Response</span>
            <h3>Interest cools while the lead waits.</h3>
            <p>Ribbit answers while intent is fresh, asks the right qualifying questions, and makes the handoff useful instead of dropping a name and number into the CRM.</p>
          </article>
          <article>
            <span>Follow-through</span>
            <h3>Your database is an asset, not an archive.</h3>
            <p>Lily restarts relevant conversations with stale inquiries, past clients, and quiet prospects—then tracks which outreach creates a real opportunity.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function VideoStudio() {
  const [stage, setStage] = useState(0);
  const stages = ["Upload", "Direct", "Generate", "Ready"];

  useEffect(() => {
    const timer = window.setInterval(() => setStage((current) => (current + 1) % stages.length), 2400);
    return () => window.clearInterval(timer);
  }, [stages.length]);

  return (
    <div className={`product-window video-studio studio-stage-${stage}`} aria-label="Animated Leap Studio virtual staging workflow">
      <div className="window-bar">
        <div><span className="window-mark">L</span><b>Leap Studio</b></div>
        <span className="studio-live"><i /> Project live</span>
      </div>
      <div className="studio-progress" aria-label={`Current stage: ${stages[stage]}`}>
        {stages.map((label, index) => <span className={index <= stage ? "active" : ""} key={label}><i>{index + 1}</i>{label}</span>)}
      </div>
      <div className="studio-workspace">
        <aside className="asset-dock">
          <span className="dock-label">Listing assets</span>
          {["Front elevation", "Living room", "Kitchen"].map((label, index) => (
            <div className={`asset-thumb asset-${index + 1}`} key={label}>
              <img src={index === 1 ? "/leap/empty-room.png" : "/leap/staged-room.png"} alt="" />
              <small>{label}</small>
            </div>
          ))}
          <button type="button" aria-label="Add listing photos">+ Add photos</button>
        </aside>
        <div className="studio-canvas">
          <div className="canvas-label"><span>18 Oak Street · Living room</span><b>{stage === 3 ? "Generated" : "Source"}</b></div>
          <div className="room-preview">
            <img className="room-empty" src="/leap/empty-room.png" alt="Empty luxury living room ready for virtual staging" />
            <img className="room-staged" src="/leap/staged-room.png" alt="The same living room virtually staged with refined furnishings" />
            <div className="drop-target"><span>↘</span> Living room added</div>
            <div className="generation-scan" />
            <div className="render-status">
              <i />
              <span><b>{stage === 2 ? "Generating scene" : "Virtual staging ready"}</b><small>{stage === 2 ? "24 editorial frames" : "Facebook video · 00:18"}</small></span>
            </div>
          </div>
          <div className="prompt-composer">
            <span>Creative direction</span>
            <p>Virtually stage this room in a warm editorial style. Ivory curves, deep emerald accent chair, natural oak. Preserve the architecture.</p>
            <button type="button">Generate video <Arrow /></button>
          </div>
        </div>
      </div>
      <div className="studio-timeline">
        <button type="button" aria-label="Play generated listing video">▶</button>
        <div className="timeline-track"><i /><span /></div>
        <b>00:18</b>
        <span>Facebook 4:5</span>
      </div>
    </div>
  );
}

type MessageScenario = {
  label: string;
  contact: string;
  context: string;
  messages: { from: "agent" | "lead"; text: string }[];
  outcome: string;
};

const MESSAGE_SCENARIOS: MessageScenario[] = [
  {
    label: "Buyer inquiry",
    contact: "Jordan M.",
    context: "Facebook lead · 18 Oak Street",
    messages: [
      { from: "lead", text: "Hi—is 18 Oak Street still available? We could tour this week." },
      { from: "agent", text: "It is, Jordan. I can help with that. Are you already pre-approved, and what day works best?" },
      { from: "lead", text: "Yes, up to $625k. Friday after 3 would be perfect." },
      { from: "agent", text: "Great. I have 4:00 PM available Friday. I’ll hold it and send the details now." },
    ],
    outcome: "Tour held · Friday at 4:00 PM",
  },
  {
    label: "Seller inquiry",
    contact: "Elena R.",
    context: "Home valuation campaign",
    messages: [
      { from: "lead", text: "We may sell this fall. Is it too early to talk about pricing?" },
      { from: "agent", text: "Not at all. A short planning call now can make the fall much easier. What neighborhood are you in?" },
      { from: "lead", text: "Blue Hills. Four bedrooms, updated kitchen." },
      { from: "agent", text: "That helps. I can prepare a focused range before we talk. Would Tuesday at 12:30 work?" },
    ],
    outcome: "Seller consultation · Tuesday at 12:30 PM",
  },
  {
    label: "Quiet lead",
    contact: "Maya T.",
    context: "CRM follow-up · last active 92 days ago",
    messages: [
      { from: "agent", text: "Hi Maya—the home you saved is pending, but a similar one just listed nearby with the office you wanted. Want the link?" },
      { from: "lead", text: "Yes please. We paused for a bit but are looking again." },
      { from: "agent", text: "Welcome back. I’ll send it now and update your search so the best matches reach you first." },
    ],
    outcome: "Search reactivated · preferences refreshed",
  },
];

function PhoneDemo() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(1);
  const scenario = MESSAGE_SCENARIOS[active];

  useEffect(() => {
    setRevealed(1);
  }, [active]);

  useEffect(() => {
    if (revealed >= scenario.messages.length) return;
    const timer = window.setTimeout(() => setRevealed((value) => value + 1), 1250);
    return () => window.clearTimeout(timer);
  }, [revealed, scenario]);

  return (
    <div className="phone-demo-wrap">
      <div className="phone-tabs" role="tablist" aria-label="Real estate messaging scenarios">
        {MESSAGE_SCENARIOS.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === active}
            key={item.label}
            onClick={() => setActive(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="phone-shell">
        <div className="phone-screen">
          <div className="phone-status"><span>9:41</span><i /><span>5G&nbsp;&nbsp;●</span></div>
          <div className="phone-header">
            <span className="phone-avatar">R</span>
            <div><b>{scenario.contact}</b><small>{scenario.context}</small></div>
            <span className="phone-live">Ribbit live</span>
          </div>
          <div className="phone-messages" aria-live="polite">
            {scenario.messages.slice(0, revealed).map((message, index) => (
              <div key={`${active}-${index}`} className={`phone-message ${message.from === "agent" ? "out" : "in"}`}>
                {message.text}
              </div>
            ))}
            {revealed < scenario.messages.length && (
              <div className="typing-row"><i /><i /><i /><span>Ribbit is writing</span></div>
            )}
          </div>
          <div className={`phone-outcome ${revealed === scenario.messages.length ? "is-visible" : ""}`}>
            <span>✓</span><div><b>Next step confirmed</b><small>{scenario.outcome}</small></div>
          </div>
          <div className="phone-compose"><span>Message</span><b>↑</b></div>
        </div>
      </div>
      <button type="button" className="phone-replay" onClick={() => setRevealed(1)}>Replay conversation ↻</button>
    </div>
  );
}

const REACTIVATION_STAGES = ["Import", "Analyze", "Curate", "Review"];

function ReactivationStudio() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setStage((value) => (value + 1) % REACTIVATION_STAGES.length), 1900);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`reactivation-studio reactivation-stage-${stage}`} aria-label="Animated database reactivation workflow">
      <div className="reactivation-studio-bar">
        <div><i /><i /><i /></div>
        <span>Lily · Reactivation workspace</span>
        <b>Private preview</b>
      </div>
      <div className="reactivation-progress">
        {REACTIVATION_STAGES.map((label, index) => (
          <button type="button" key={label} className={index <= stage ? "active" : ""} onClick={() => setStage(index)}>
            <i>{index < stage ? "✓" : index + 1}</i><span>{label}</span>
          </button>
        ))}
      </div>
      <div className="reactivation-workspace">
        <aside className="reactivation-source">
          <span>Source</span>
          <div className="csv-file"><b>CRM-export.csv</b><small>1,247 contacts · 4.8 MB</small><i>CSV</i></div>
          <div className="crm-source-list">
            <p><i /> Follow Up Boss</p><p><i /> LionDesk</p><p><i /> CSV upload</p>
          </div>
        </aside>
        <div className="reactivation-main">
          <div className="reactivation-dropzone">
            <span>Drop CRM export here</span><small>CSV · XLSX · direct connection</small>
            <div className="csv-drag"><b>CRM-export.csv</b><i>↗</i></div>
          </div>
          <div className="reactivation-analysis">
            <div className="analysis-head"><span>Database analysis</span><b>{stage < 2 ? "Scanning…" : "1,247 contacts mapped"}</b></div>
            <div className="analysis-bars">
              <p><span>Quiet buyers</span><i><b style={{ "--bar": "82%" } as CSSProperties} /></i><em>438</em></p>
              <p><span>Past clients</span><i><b style={{ "--bar": "61%" } as CSSProperties} /></i><em>302</em></p>
              <p><span>Seller inquiries</span><i><b style={{ "--bar": "44%" } as CSSProperties} /></i><em>187</em></p>
            </div>
          </div>
          <div className="reactivation-curation">
            <div className="curation-head"><span>Messages curated for review</span><b>3 segments</b></div>
            <article><i>MT</i><div><b>Maya Thompson</b><small>Quiet buyer · last active 92 days ago</small><p>Hi Maya—the home you saved is pending, but a similar one just listed nearby with the office you wanted. Want the link?</p></div><span>Ready</span></article>
            <article><i>DR</i><div><b>Daniel Ruiz</b><small>Past client · move anniversary</small><p>Hi Daniel—one year already. If you're curious what the neighborhood market has done since your move, I can send a quick update.</p></div><span>Ready</span></article>
            <article><i>AC</i><div><b>Avery Chen</b><small>Seller inquiry · no appointment</small><p>Hi Avery—you asked about selling earlier this year. Has your timing changed, or would a fresh pricing range be useful?</p></div><span>Review</span></article>
          </div>
        </div>
      </div>
      <div className="reactivation-status"><i /><span><b>{REACTIVATION_STAGES[stage]} in progress</b><small>{stage === 0 ? "Preparing secure import" : stage === 1 ? "Finding relationship and timing signals" : stage === 2 ? "Writing from approved context" : "Messages populated—nothing sent automatically"}</small></span><button type="button" onClick={() => setStage(0)}>Replay ↻</button></div>
    </div>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="section solutions-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow="From first impression to next appointment"
          title={<>One operating system for <em>the moments that make the deal.</em></>}
          body="Each FrogAI agent has a focused job. Together, they create a connected real estate lead generation and nurturing system."
          align="center"
        />

        <article id="lead-generation" className="solution-story solution-story-video">
          <div className="story-copy">
            <p className="story-index">01 — LEAD GENERATION</p>
            <h3>Make the listing worth stopping for.</h3>
            <p>Leap turns listing photos and property information into polished Facebook ad videos, social content, and search-ready assets. Your campaign starts with a stronger story—and your team owns the creative.</p>
            <ul className="feature-list">
              <li>Facebook ads for real estate agents, formatted for the feed</li>
              <li>Listing marketing automation from one source of truth</li>
              <li>Local search and LLM-ready property content</li>
            </ul>
            <a className="text-link" href="/demos#leap">Explore Leap <Arrow /></a>
          </div>
          <VideoStudio />
        </article>

        <article id="speed-to-lead" className="solution-story solution-story-phone">
          <PhoneDemo />
          <div className="story-copy">
            <p className="story-index">02 — SPEED-TO-LEAD</p>
            <h3>Answer while the intent is still warm.</h3>
            <p>Ribbit delivers AI lead response for real estate in seconds—not hours. It handles common questions, qualifies the prospect conversationally, books a tour or consultation, and sends the agent a clear summary.</p>
            <div className="response-metrics">
              <div><b>2.4s</b><span>example first response</span></div>
              <div><b>24/7</b><span>coverage for new inquiries</span></div>
              <div><b>1</b><span>clean handoff to the agent</span></div>
            </div>
            <p className="small-note">Response examples are representative product scenarios, not a guarantee of results.</p>
            <a className="text-link" href="/demos#ribbit">Try the Ribbit demo <Arrow /></a>
          </div>
        </article>

        <div className="service-separator" aria-hidden="true"><span>03</span><i /><b>Database reactivation</b></div>

        <article id="database-reactivation" className="solution-story solution-story-reactivation lily-story">
          <div className="story-copy">
            <p className="story-index">03 — DATABASE REACTIVATION</p>
            <h3>The next opportunity may already know your name.</h3>
            <p>Lily analyzes quiet contacts, identifies useful context, and curates personal outreach for approval before anything reaches a lead.</p>
            <ul className="feature-list">
              <li>Past clients with a relevant reason to reconnect</li>
              <li>Buyers whose timing or search may have changed</li>
              <li>Seller inquiries that never reached an appointment</li>
            </ul>
            <a className="text-link" href="/demos#lily">See database reactivation <Arrow /></a>
          </div>
          <ReactivationStudio />
        </article>

        <div className="service-separator" aria-hidden="true"><span>04</span><i /><b>Spatial property experience</b></div>

          <article id="property-experience" className="secondary-story croak-story croak-spatial-story">
            <div className="secondary-number">04</div>
            <p className="story-index">CROAK SPATIAL · PREMIUM PROPERTY EXPERIENCE</p>
            <h3>Let buyers walk the listing before the showing.</h3>
            <p>Croak Spatial is our premium direction for high-value listings: a photorealistic Gaussian-splat scene buyers can explore freely in a browser, with engagement signals that make follow-up more specific.</p>
            <div className="croak-spatial-preview">
              <iframe
                src="https://superspl.at/s?id=7df22856"
                title="Reference Gaussian-splat real estate walkthrough in SuperSplat"
                loading="lazy"
                allow="fullscreen; accelerometer; gyroscope"
              />
              <div className="croak-spatial-overlay">
                <span><i /> Interactive technology preview</span>
                <p>Tap the scene, then choose Walk mode to move through the property.</p>
              </div>
            </div>
            <div className="croak-spatial-features">
              <span>Free-walk navigation</span><span>Browser delivery</span><span>Spatial analytics</span>
            </div>
            <p className="croak-disclosure">Reference experience by SuperSplat. FrogAI is evaluating capture, processing, hosting, and analytics as a custom premium production service.</p>
            <div className="croak-links">
              <a className="text-link" href="https://superspl.at/scene/7df22856" target="_blank" rel="noreferrer">Open full-screen reference <Arrow /></a>
              <a className="text-link" href="/demos#croak">Explore the Croak concept <Arrow /></a>
            </div>
          </article>
      </div>
    </section>
  );
}

function Agents() {
  return (
    <section id="agents" className="section agents-section">
      <div className="page-shell">
        <div className="agents-heading">
          <SectionIntro
            eyebrow="Meet the agents"
            title={<>Four specialists.<br /><em>One continuous journey.</em></>}
            body="The team is coordinated around the lead—not scattered across disconnected tools."
          />
          <a className="button button-outline" href="/demos">Explore all live demos <Arrow /></a>
        </div>
        <div className="agent-grid">
          {AGENTS.map((agent, index) => (
            <article className={`agent-card agent-${agent.color}`} key={agent.name}>
              <div className={`agent-portrait ${agent.className}`}>
                <img src="/agents-team.png" alt={`${agent.name}, FrogAI ${agent.role} agent`} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="agent-card-copy">
                <p>{agent.eyebrow}</p>
                <h3>{agent.name}</h3>
                <span className="agent-role">{agent.role}</span>
                <div className="agent-detail">
                  <p>{agent.body}</p>
                  <ul>{agent.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <a href={`/demos#${agent.name.toLowerCase()}`}>View demo <Arrow /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: "01", title: "Map the journey", body: "We review your lead sources, CRM, calendar, response rules, brand voice, and the moments where opportunities currently stall." },
    { number: "02", title: "Train the playbooks", body: "FrogAI is configured around your listings, qualification criteria, handoff preferences, and approved tone—before anything goes live." },
    { number: "03", title: "Launch one useful flow", body: "Start with the highest-value gap: Facebook ad creative, speed-to-lead, or database reactivation. Expand once the workflow earns trust." },
    { number: "04", title: "Measure the outcome", body: "See response time, conversations, appointments, reactivated contacts, and attributed opportunities in one operating view." },
  ];
  return (
    <section id="how-it-works" className="section how-section">
      <div className="page-shell how-grid">
        <div className="how-sticky">
          <SectionIntro
            eyebrow="How it works"
            title={<>Practical AI,<br /><em>fitted to your business.</em></>}
            body="FrogAI works with the systems your team already uses. Setup is guided, tone is approved, and the agent never has to decode a mystery handoff."
          />
          <a className="button button-green" href={CAL_URL} target="_blank" rel="noreferrer">Plan your first workflow <Arrow /></a>
        </div>
        <div className="how-steps">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="section results-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow="A clearer operating picture"
          title={<>Measure movement, <em>not AI activity.</em></>}
          body="FrogAI is designed to report the outcomes a real estate team can act on. Representative dashboard views below show how workflows can be measured once connected to your data."
          align="center"
        />
        <div className="results-dashboard">
          <div className="results-topline">
            <div><span>Journey overview</span><b>Last 30 days</b></div>
            <span className="status-pill"><i /> Workflows live</span>
          </div>
          <div className="results-metrics">
            <article><span>Median first reply</span><b>2.8<span>s</span></b><small>New lead response workflow</small></article>
            <article><span>Qualified conversations</span><b>47</b><small>Buyer + seller inquiries</small></article>
            <article><span>Appointments created</span><b>18</b><small>Tours + consultations</small></article>
            <article><span>Contacts reactivated</span><b>126</b><small>Database nurture workflow</small></article>
          </div>
          <div className="results-flow">
            <div className="flow-chart">
              <div className="chart-label"><b>Conversations created</b><span>By workflow</span></div>
              <div className="bars">
                {[42, 58, 52, 74, 66, 88, 82, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
              </div>
              <div className="chart-key"><span><i /> Lead response</span><span><i /> Reactivation</span><span><i /> Listing campaigns</span></div>
            </div>
            <div className="activity-list">
              <p>Recent attributed moments</p>
              <div><span>Tour booked</span><b>Facebook listing lead</b><small>Ribbit · 4m ago</small></div>
              <div><span>Consultation requested</span><b>Seller valuation inquiry</b><small>Ribbit · 21m ago</small></div>
              <div><span>Search reactivated</span><b>Quiet buyer · 92 days</b><small>Lily · 37m ago</small></div>
            </div>
          </div>
          <p className="results-disclaimer">Illustrative product data shown to demonstrate reporting structure. Actual outcomes depend on lead volume, market, offer, data quality, and team follow-through.</p>
        </div>
      </div>
    </section>
  );
}

function OpportunityEstimator() {
  const [leads, setLeads] = useState(80);
  const [slow, setSlow] = useState(35);
  const [commission, setCommission] = useState(11000);
  const estimate = Math.round(leads * (slow / 100) * 0.025 * commission);
  return (
    <section className="section estimator-section">
      <div className="page-shell estimator-grid">
        <div>
          <SectionIntro
            eyebrow="Opportunity estimator"
            title={<>What could better follow-up make <em>worth another look?</em></>}
            body="Use a conservative planning model to size the conversation. This is an estimate—not a promise or financial forecast."
          />
          <div className="sliders">
            <RangeControl label="New leads per month" value={leads} min={10} max={300} step={10} onChange={setLeads} />
            <RangeControl label="Leads receiving slow or inconsistent follow-up" value={slow} min={5} max={80} step={5} suffix="%" onChange={setSlow} />
            <RangeControl label="Average gross commission" value={commission} min={3000} max={30000} step={500} prefix="$" onChange={setCommission} />
          </div>
        </div>
        <div className="estimator-output">
          <span>Conservative monthly opportunity model</span>
          <b>${estimate.toLocaleString()}</b>
          <p>Assumes 2.5% of the leads receiving slow or inconsistent follow-up become an attributable closing opportunity.</p>
          <div className="estimator-formula"><span>{leads} leads</span><i>×</i><span>{slow}% at risk</span><i>×</i><span>2.5% modeled</span></div>
          <a className="button button-ink" href={CAL_URL} target="_blank" rel="noreferrer">Model my actual funnel <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function RangeControl({ label, value, min, max, step, onChange, prefix = "", suffix = "" }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; prefix?: string; suffix?: string }) {
  return (
    <label className="range-control">
      <span>{label}<b>{prefix}{value.toLocaleString()}{suffix}</b></span>
      <input type="range" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function FreeAudit() {
  return (
    <section id="free-audit" className="section audit-section">
      <div className="page-shell audit-grid">
        <div className="audit-copy">
          <SectionIntro eyebrow="Free lead journey audit" title={<>Find the moments where <em>good leads go quiet.</em></>} body="Bring us your current Facebook creative, response workflow, and follow-up process. We’ll map where opportunity is leaking and show you the three fixes most likely to create momentum." />
          <ul>
            <li><b>Creative audit</b><span>Is the ad earning attention from the right buyer or seller?</span></li>
            <li><b>Response audit</b><span>How quickly does a new inquiry reach a useful first conversation?</span></li>
            <li><b>Follow-up audit</b><span>Where do active and dormant leads fall out of view?</span></li>
          </ul>
          <div className="audit-actions">
            <a className="button button-green" href="/audit">Start my free audit <Arrow /></a>
            <span>30 minutes · no prep deck · practical takeaways</span>
          </div>
        </div>
        <div className="audit-card" aria-label="Representative FrogAI lead journey audit scorecard">
          <div className="audit-card-head"><div><span>Lead journey scorecard</span><b>Northstar Realty Group</b></div><i>Free audit</i></div>
          <div className="audit-score"><span>Opportunity readiness</span><b>62<small>/100</small></b><div><i /></div></div>
          <div className="audit-rows">
            <div><span>Facebook creative</span><b className="strong">Strong</b><i style={{ "--score": "78%" } as CSSProperties} /></div>
            <div><span>First response</span><b className="attention">Needs attention</b><i style={{ "--score": "42%" } as CSSProperties} /></div>
            <div><span>Lead nurture</span><b>Developing</b><i style={{ "--score": "58%" } as CSSProperties} /></div>
            <div><span>Database reactivation</span><b className="attention">Untapped</b><i style={{ "--score": "31%" } as CSSProperties} /></div>
          </div>
          <div className="audit-insight"><span>Highest-leverage fix</span><b>Respond while Facebook intent is still warm.</b><p>Connect lead routing to an immediate, conversational qualification flow.</p></div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    ["Will the messages sound robotic?", "No. We build an approved playbook around your tone, market, qualification style, and escalation rules. Messages use relevant lead context and are designed to feel like a capable member of your team—not a generic blast."],
    ["Which CRMs can FrogAI work with?", "FrogAI is designed to fit common real estate CRM follow-up workflows through direct connections, automation platforms, or a structured export when needed. We confirm compatibility and the exact data flow before launch."],
    ["How quickly can we get set up?", "A focused first workflow can usually be scoped and prepared quickly once access, lead routing, calendars, and tone are approved. More complex brokerage environments or custom integrations take longer and are planned upfront."],
    ["What happens when a lead asks something the AI should not answer?", "The agent follows defined boundaries. It can acknowledge the question, collect useful context, and route the conversation to a person. Your team controls what the AI can answer, book, or escalate."],
    ["How do you handle privacy and access?", "We limit access to the systems and fields needed for the approved workflow, document the data flow, and define retention and handoff rules during setup. Sensitive decisions and exceptions stay with your team."],
    ["Does this improve lead quality?", "FrogAI cannot make every inquiry a fit. It improves the system around lead quality: stronger creative can attract more relevant interest, and conversational qualification helps your team quickly see motivation, budget, timing, and next steps."],
    ["Can we start with only speed-to-lead or reactivation?", "Yes. The best first deployment is usually one painful, measurable workflow. You can start with Ribbit, Lily, or Leap and add the rest of the agent ecosystem once the first flow is working well."],
    ["What is a Gaussian-splat property walkthrough?", "It is a spatial scene reconstructed from captured imagery and depth data, rendered as millions of small 3D Gaussians. Unlike a stitched 360 tour, a buyer can move through the space from a first-person perspective. Croak Spatial is currently presented as a premium technology direction; capture method, processing, hosting, device performance, and scope would be confirmed for each property."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section faq-section">
      <div className="page-shell faq-grid">
        <div className="faq-heading">
          <SectionIntro eyebrow="Questions worth asking" title={<>Trust comes before <em>automation.</em></>} body="Clear boundaries, visible handoffs, and a workflow your team understands are part of the product." />
          <a className="text-link" href={CAL_URL} target="_blank" rel="noreferrer">Ask us something specific <Arrow /></a>
        </div>
        <div className="faq-list">
          {items.map(([question, answer], index) => {
            const expanded = open === index;
            return (
              <article key={question} className={expanded ? "expanded" : ""}>
                <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{question}<i>{expanded ? "−" : "+"}</i>
                </button>
                <div className="faq-answer"><p>{answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-cta">
        <p className="eyebrow"><span /> Your next best lead may already be in motion</p>
        <h2>Build a lead journey that responds <em>like your business depends on it.</em></h2>
        <p>See where stronger creative, faster response, and more consistent real estate lead nurturing could create the most leverage for your team.</p>
        <div>
          <a className="button button-green" href={CAL_URL} target="_blank" rel="noreferrer">Book a strategy call <Arrow /></a>
          <a className="button button-ghost" href="/demos">Explore the live demos</a>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <BrandLogo />
        <p>AI agents for real estate lead generation, response, reactivation, and nurturing.</p>
        <nav aria-label="Footer navigation"><a href="#solutions">Solutions</a><a href="#agents">Agents</a><a href="/demos">Demos</a><a href="/audit">Free audit</a><a href="#faq">FAQ</a></nav>
        <span>© {new Date().getFullYear()} FrogAI</span>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "FrogAI | Real Estate Lead Generation & Speed-to-Lead AI";
  }, []);

  return (
    <main className="site-main">
      <Nav />
      <Hero />
      <Tension />
      <Solutions />
      <Agents />
      <HowItWorks />
      <Results />
      <OpportunityEstimator />
      <FreeAudit />
      <FAQ />
      <Footer />
      <FrogSupport />
    </main>
  );
}
