import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  Clapperboard,
  Clock3,
  Film,
  LineChart,
  MessageSquareText,
  MousePointer2,
  Sparkles,
  Target,
  Video,
  Wand2,
  Zap
} from "lucide-react";
import "./styles.css";

const interiorHero = "/assets/frogai-hero-clean.jpg";
const interiorBefore = "/assets/frogai-before.jpg";
const interiorAfter = "/assets/frogai-after.jpg";

const logos = [
  "Compass",
  "William Raveis",
  "Sotheby's International Realty",
  "Coldwell Banker",
  "Keller Williams",
  "Berkshire Hathaway HomeServices",
  "RE/MAX",
  "Douglas Elliman"
];

const featureCards = [
  {
    title: "Cinematic Listing Video Generation",
    body: "Leap turns listing photos into polished, luxury-grade interior video assets for launches, ads, and agent reels.",
    icon: Clapperboard
  },
  {
    title: "Instant Speed-to-Lead Response",
    body: "Ribbit answers inquiries while buyer intent is hot, qualifies the conversation, and routes clean context to your team.",
    icon: Zap
  },
  {
    title: "AI Follow-Up Sequences",
    body: "Every lead gets timely, on-brand nurture so no showing request or valuation inquiry disappears into the night.",
    icon: MessageSquareText
  },
  {
    title: "Listing Launch Systems",
    body: "From cinematic cuts to social captions, FrogAI helps agents launch listings with a repeatable media engine.",
    icon: Film
  },
  {
    title: "Brokerage-Grade Brand Control",
    body: "Your voice, your market, your standards. The AI execution stays aligned to the way elite brokerages sell trust.",
    icon: Target
  },
  {
    title: "Performance Feedback Loop",
    body: "We tighten video hooks, lead scripts, and follow-up flows around actual listing and inquiry performance.",
    icon: LineChart
  }
];

const pricing = [
  {
    name: "Tadpole",
    price: "$299",
    cadence: "/month",
    description: "For solo agents who want AI-assisted listing media and faster lead response without adding headcount.",
    features: [
      "2 Leap cinematic listing videos per month",
      "Ribbit chatbot for one primary lead source",
      "AI follow-up scripts for new buyer inquiries",
      "Monthly optimization check-in",
      "Listing launch caption pack"
    ]
  },
  {
    name: "Bullfrog",
    price: "$599",
    cadence: "/month",
    description: "For top producers and brokerages ready to run a sharper, always-on listing and lead conversion engine.",
    features: [
      "5 Leap cinematic listing videos per month",
      "Ribbit across website, social, and portal inquiries",
      "Priority lead routing and agent handoff notes",
      "Weekly performance review",
      "Brokerage brand prompt system",
      "Priority launch support"
    ],
    highlighted: true
  }
];

const testimonials = [
  {
    quote:
      "FrogAI makes our listings feel elevated before a buyer ever walks through the door. The video assets finally match the caliber of the homes.",
    name: "Fairfield County Listing Specialist",
    meta: "Connecticut Realtor"
  },
  {
    quote:
      "The speed-to-lead flow is the part I did not realize we were missing. Serious inquiries get handled immediately and my team gets the context.",
    name: "New Haven County Team Lead",
    meta: "Connecticut Brokerage"
  },
  {
    quote:
      "It feels like having a sharp AI media and follow-up desk behind the agent. That is the kind of leverage our market rewards.",
    name: "West Hartford Luxury Agent",
    meta: "Connecticut Realtor"
  }
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function GlassCard({ children, className = "" }) {
  return <div className={`glass-card backdrop-blur-xl border-white/10 ${className}`}>{children}</div>;
}

function CTAButton({ children, variant = "primary" }) {
  return (
    <motion.a
      href="#strategy"
      className={`cta-button ${variant}`}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.4} />
    </motion.a>
  );
}

function HeroVisual() {
  return (
    <motion.div
      className="hero-visual clean"
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
    >
      <img src={interiorHero} alt="Cinematic luxury interior listing visual" />
    </motion.div>
  );
}

function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <section className="proof-section">
      <p>Built for top producers and teams at real estate brokerages like</p>
      <div className="logo-rail glass-card">
        <motion.div
          className="logo-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {row.map((logo, index) => (
            <span key={`${logo}-${index}`} className="logo-chip">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    ["Time drain", "Listings need video, copy, launch assets, follow-up, and reporting before the next appointment starts."],
    ["Lead leakage", "Portal, website, and social inquiries decay in minutes when a human cannot respond instantly."],
    ["Media gap", "Elite listings deserve interior visuals that feel cinematic, not rushed, static, or forgettable."]
  ];

  return (
    <section className="section problem-grid">
      <Reveal className="section-copy">
        <p className="eyebrow">The Bottleneck</p>
        <h2>Realtors are expected to move like media companies and respond like call centers.</h2>
        <p>
          FrogAI removes the operational drag around listing media and lead follow-up so agents can spend more energy on
          relationships, pricing strategy, negotiations, and winning inventory.
        </p>
      </Reveal>
      <div className="problem-cards">
        {problems.map(([title, body], index) => (
          <Reveal key={title} delay={index * 0.08}>
            <GlassCard className="problem-card">
              <div className="problem-number">0{index + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SolutionOverview() {
  return (
    <section className="section solution-grid">
      <Reveal>
        <GlassCard className="product-panel leap-panel">
          <div className="icon-orbit">
            <Video size={28} />
          </div>
          <span className="product-kicker">Leap</span>
          <h2>AI Cinematic Listing Video Generation.</h2>
          <p>
            Turn ordinary listing photo sets into premium interior video moments that help your listing launch feel
            expensive, intentional, and ready for social distribution.
          </p>
        </GlassCard>
      </Reveal>
      <Reveal delay={0.12}>
        <GlassCard className="product-panel ribbit-panel">
          <div className="icon-orbit">
            <Bot size={28} />
          </div>
          <span className="product-kicker">Ribbit</span>
          <h2>AI Speed-to-Lead & Follow-Up Chatbot.</h2>
          <p>
            Respond in seconds, qualify buyer intent, book next steps, and hand agents the exact context they need before
            they pick up the phone.
          </p>
        </GlassCard>
      </Reveal>
    </section>
  );
}

function BeforeAfter() {
  const [value, setValue] = useState(55);

  return (
    <section className="section leap-section">
      <Reveal className="section-copy narrow">
        <p className="eyebrow">Leap</p>
        <h2>Before-and-after listing photo transformation.</h2>
        <p>
          Drag the control to see how FrogAI reframes a static interior photo into a cinematic listing asset with depth,
          movement cues, color grade, and launch-ready polish.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassCard className="comparison-card">
          <div className="comparison-frame" style={{ "--split": `${value}%` }}>
            <img src={interiorAfter} alt="After FrogAI cinematic listing transformation" className="after-img" />
            <div className="before-layer">
              <img src={interiorBefore} alt="Before static listing photo" />
            </div>
            <div className="compare-divider">
              <MousePointer2 size={18} />
            </div>
            <span className="compare-label before">Before photo</span>
            <span className="compare-label after">Leap cinematic</span>
            <input
              aria-label="Compare before and after listing transformation"
              type="range"
              min="8"
              max="92"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <div className="comparison-stats">
            <span>
              <Wand2 size={16} /> AI camera path
            </span>
            <span>
              <Sparkles size={16} /> Luxury color grade
            </span>
            <span>
              <Film size={16} /> Social-ready export
            </span>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}

function RibbitDemo() {
  const messages = useMemo(
    () => [
      ["lead", "Hi, is 18 Harbor View still available?"],
      [
        "ribbit",
        "Yes. I can help you see it today. Are you pre-approved, or would you like the agent to connect you with a lender?"
      ],
      ["lead", "Pre-approved. Can I tour after 5?"],
      ["ribbit", "Perfect. I am checking the agent calendar now. Does 5:30 PM or 6:15 PM work better?"],
      ["lead", "6:15."],
      ["ribbit", "Booked. I sent the details and alerted the agent with the buyer profile."]
    ],
    []
  );

  return (
    <section className="section ribbit-section">
      <Reveal className="section-copy narrow">
        <p className="eyebrow">Ribbit</p>
        <h2>Interactive SMS follow-up that turns intent into appointments.</h2>
        <p>
          Ribbit keeps the first response sharp, qualifies serious buyers, and gives agents context-rich handoffs when
          speed matters most.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassCard className="phone-shell">
          <div className="phone-top">
            <span className="signal-dot" />
            <div>
              <strong>Ribbit AI Concierge</strong>
              <small>Lead response active</small>
            </div>
            <Clock3 size={18} />
          </div>
          <div className="message-list">
            {messages.map(([type, text], index) => (
              <motion.div
                key={`${type}-${index}`}
                className={`bubble ${type}`}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.38 }}
              >
                {text}
              </motion.div>
            ))}
          </div>
          <div className="handoff-panel">
            <div>
              <span>Agent handoff</span>
              <strong>Pre-approved buyer, tour requested at 6:15 PM</strong>
            </div>
            <CalendarCheck size={20} />
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="section">
      <Reveal className="center-copy">
        <p className="eyebrow">Agency Systems</p>
        <h2>Six ways FrogAI gives elite agents unfair operating leverage.</h2>
      </Reveal>
      <div className="feature-grid">
        {featureCards.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={(index % 3) * 0.08}>
              <GlassCard className="feature-card">
                <Icon size={24} />
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section pricing-section">
      <Reveal className="center-copy">
        <p className="eyebrow">Pricing</p>
        <h2>Productized AI Agency Plans: Invest in Your Growth.</h2>
      </Reveal>
      <div className="pricing-grid">
        {pricing.map((plan) => (
          <Reveal key={plan.name} delay={plan.highlighted ? 0.1 : 0}>
            <GlassCard className={`pricing-card ${plan.highlighted ? "featured" : ""}`}>
              {plan.highlighted && <span className="plan-badge">Best for teams</span>}
              <h3>{plan.name}</h3>
              <div className="price-line">
                <span>{plan.price}</span>
                <small>{plan.cadence}</small>
              </div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
              <CTAButton variant={plan.highlighted ? "primary" : "secondary"}>Schedule Your Session</CTAButton>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <Reveal className="section-copy narrow">
        <p className="eyebrow">Connecticut Realtors</p>
        <h2>Built for the pace and polish of competitive Connecticut markets.</h2>
      </Reveal>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <GlassCard className="testimonial-card">
              <p>"{item.quote}"</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.meta}</span>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" id="strategy">
      <Reveal>
        <GlassCard className="final-panel">
          <p className="eyebrow">FrogAI</p>
          <h2>Schedule Your Free AI Strategy Session.</h2>
          <p>
            See how Leap and Ribbit can plug into your listing launch process, response workflow, and brokerage growth
            goals.
          </p>
          <CTAButton>Schedule Your Free AI Strategy Session</CTAButton>
        </GlassCard>
      </Reveal>
    </section>
  );
}

function App() {
  return (
    <main>
      <div className="ambient-bg" />
      <nav className="nav glass-card">
        <a href="#top" className="brand-mark">
          <span>F</span>
          FrogAI
        </a>
        <div className="nav-links">
          <a href="#leap">Leap</a>
          <a href="#ribbit">Ribbit</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a href="#strategy" className="nav-cta">
          Strategy Session
        </a>
      </nav>

      <header className="hero" id="top">
        <Reveal className="hero-copy">
          <h1>Your AI-Powered Agency for Real Estate Dominance.</h1>
          <p>
            FrogAI helps top agents launch cinematic interior listing media with Leap and convert inquiries instantly
            with Ribbit, the AI speed-to-lead and follow-up concierge.
          </p>
          <div className="hero-actions">
            <CTAButton>Schedule Your Free AI Strategy Session</CTAButton>
          </div>
        </Reveal>
        <HeroVisual />
      </header>

      <LogoMarquee />
      <ProblemSection />
      <SolutionOverview />
      <div id="leap">
        <BeforeAfter />
      </div>
      <div id="ribbit">
        <RibbitDemo />
      </div>
      <FeatureGrid />
      <div id="pricing">
        <PricingSection />
      </div>
      <Testimonials />
      <FinalCTA />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
