import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
  Menu,
  X,
  Sparkles,
  Wand2,
  Film,
  Bot,
  Zap,
  MessageSquareText,
  Target,
  LineChart,
  CalendarCheck,
  ShieldCheck,
  MousePointer2,
  ChevronDown,
  Star,
  Quote,
} from "lucide-react";
import { Reveal, MagneticButton, FrogMark, fadeUp, stagger, ease } from "./primitives.jsx";

/* ====================== NAV ====================== */
const navLinks = [
  { href: "#leap", label: "Leap" },
  { href: "#ribbit", label: "Ribbit" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
    >
      <a href="#top" className="brand" aria-label="FrogAI home">
        <FrogMark size={30} />
        <span>FrogAI</span>
      </a>
      <nav className="nav-links">
        {navLinks.map((l, i) => (
          <motion.a
            key={l.href}
            href={l.href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.06 }}
          >
            {l.label}
          </motion.a>
        ))}
      </nav>
      <div className="nav-right">
        <MagneticButton href="#pricing" variant="primary" className="nav-cta">
          Book a demo
        </MagneticButton>
        <button
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <motion.div
          className="nav-mobile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#pricing" onClick={() => setOpen(false)}>
            Book a demo
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ====================== HERO ====================== */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow">
              <Sparkles size={13} /> AI agency for elite real estate
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display h1 hero-title">
              Leap into cinematic listings.
              <br />
              <span className="shiny">Ribbit</span> back leads in seconds.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lede hero-lede">
              FrogAI is the AI agency partner for top agents. <strong>Leap</strong> turns
              listing photos into luxury video. <strong>Ribbit</strong> answers every lead
              while intent is hot — so you sell like a media company and respond like a
              machine.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-actions">
              <MagneticButton href="#pricing" variant="primary">
                Book your strategy session <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton href="#leap" variant="ghost">
                See Leap in action
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="hero-stats">
              <div>
                <strong>&lt;3s</strong>
                <span>median lead reply</span>
              </div>
              <div>
                <strong>4K</strong>
                <span>cinematic listing video</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>speed-to-lead desk</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="hero-visual-col">
          <HeroVisual />
        </Reveal>
      </div>
      <div className="hero-fade" />
    </section>
  );
}

function HeroVisual() {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlaying(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="hero-visual liquid-glass"
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, ease, delay: 0.2 }}
      style={{ transformPerspective: 1000 }}
    >
      <div className="hv-topbar">
        <span className="hv-lights">
          <i style={{ background: "#ff5f57" }} />
          <i style={{ background: "#febc2e" }} />
          <i style={{ background: "#28c840" }} />
        </span>
        <span className="hv-title">FrogAI — Listing Launch</span>
        <span className="hv-live">● LIVE</span>
      </div>

      <div className="hv-body">
        <div className="hv-side">
          <div className="hv-compose">
            <Sparkles size={13} /> Compose with Leap
          </div>
          <div className="hv-navitem active">
            <Film size={14} /> Cinematic cuts <em>3</em>
          </div>
          <div className="hv-navitem">
            <MessageSquareText size={14} /> Lead replies <em>12</em>
          </div>
          <div className="hv-navitem">
            <CalendarCheck size={14} /> Tours booked <em>5</em>
          </div>
          <div className="hv-navitem">
            <LineChart size={14} /> Performance
          </div>
        </div>

        <div className="hv-stage">
          <span className="hv-badge">
            <Wand2 size={13} /> AI camera path
          </span>
          <button
            className={`hv-play ${playing ? "is-playing" : ""}`}
            onClick={() => setPlaying((p) => !p)}
            aria-label="Preview listing video"
          >
            {playing ? <PauseGlyph /> : <Play size={26} fill="currentColor" />}
          </button>
          {playing && (
            <div className="hv-progress">
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
          )}
          <div className="hv-scan" />
          <div className="hv-foot">
            <div className="hv-chip">
              <Film size={14} /> Cinematic cut
            </div>
            <div className="hv-chip">
              <Sparkles size={14} /> Luxury grade
            </div>
            <div className="hv-chip">
              <ArrowUpRight size={14} /> Social-ready
            </div>
          </div>
        </div>

        <div className="hv-reader">
          <div className="hv-rhead">
            <strong>18 Harbor View</strong>
            <span>Leap · 4K</span>
          </div>
          <div className="hv-summary">
            <Sparkles size={13} className="hv-summary-ic" />
            <div>
              <b>Summary by Leap</b>
              <p>
                Rebuilt the flat interior into a cinematic 4K tour — depth, motion, and a
                luxury grade applied in one pass.
              </p>
            </div>
          </div>
          <p className="hv-line">Your listing just dropped a film-grade asset.</p>
          <p className="hv-line hv-muted">
            Ready to publish across Instagram, YouTube, and the MLS.
          </p>
          <div className="hv-pill">
            <Play size={12} /> harbor-view-4k.mp4
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PauseGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

/* ====================== LOGO MARQUEE ====================== */
const brokers = [
  "Compass",
  "Sotheby's",
  "Coldwell Banker",
  "Keller Williams",
  "Berkshire Hathaway",
  "RE/MAX",
  "Douglas Elliman",
  "William Raveis",
];

export function LogoMarquee() {
  const row = [...brokers, ...brokers];
  return (
    <section className="marquee-section">
      <p className="marquee-label kicker">Trusted by teams at top brokerages</p>
      <div className="marquee">
        <motion.div
          className="marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {row.map((b, i) => (
            <span key={`${b}-${i}`} className="marquee-chip">
              {b}
            </span>
          ))}
        </motion.div>
        <div className="marquee-mask left" />
        <div className="marquee-mask right" />
      </div>
    </section>
  );
}

/* ====================== BENTO FEATURES ====================== */
const bento = [
  {
    icon: Film,
    title: "Cinematic listing video",
    body: "Leap turns a photo set into a luxury 4K listing film with AI camera paths and a color grade that matches the home.",
    span: "wide",
    tag: "Leap",
  },
  {
    icon: Zap,
    title: "Instant speed-to-lead",
    body: "Ribbit replies in seconds, qualifies intent, and routes clean context to your phone.",
    span: "tall",
    tag: "Ribbit",
  },
  {
    icon: MessageSquareText,
    title: "AI follow-up sequences",
    body: "Every inquiry gets timely, on-brand nurture — no lead goes dark.",
  },
  {
    icon: Target,
    title: "Brokerage-grade brand control",
    body: "Your voice, your market, your standards — locked into the AI.",
  },
  {
    icon: LineChart,
    title: "Performance feedback loop",
    body: "We tune hooks, scripts, and follow-up around real listing performance.",
    span: "wide",
  },
];

export function BentoFeatures() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <SectionHeadingWrap
          eyebrow="Capabilities"
          title="One AI agency. Total listing leverage."
          lede="Six systems that give elite agents the unfair operating advantage of a media team and a 24/7 response desk — without the headcount."
        />
        <motion.div
          className="bento"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {bento.map((c) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                className={`bento-card glass ${c.span || ""}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="bento-icon">
                  <Icon size={20} />
                </div>
                {c.tag && <span className="bento-tag kicker">{c.tag}</span>}
                <h3 className="display h3">{c.title}</h3>
                <p className="lede">{c.body}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeadingWrap({ eyebrow, title, lede }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display h2">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}

/* ====================== BEFORE / AFTER (LEAP) ====================== */

export function BeforeAfter() {
  const [value, setValue] = useState(52);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="leap">
      <div className="container leap-grid">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Film size={13} /> Leap
          </span>
          <h2 className="display h2">
            From static photo
            <br />
            to cinematic asset.
          </h2>
          <p className="lede">
            Drag to see how Leap rebuilds a flat interior shot into a launch-ready listing
            film — depth, motion cues, color grade, and social export included.
          </p>
          <ul className="leap-points">
            <li>
              <Wand2 size={16} /> AI camera path
            </li>
            <li>
              <Sparkles size={16} /> Luxury color grade
            </li>
            <li>
              <ArrowUpRight size={16} /> Social-ready export
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            ref={ref}
            className="compare glass-strong"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="compare-frame" style={{ "--split": `${value}%` }}>
              <img src="/assets/frogai-after.jpg" alt="After: cinematic Leap listing" className="after" />
              <div className="before-layer">
                <img src="/assets/frogai-before.jpg" alt="Before: static listing photo" />
              </div>
              <div className="compare-divider">
                <MousePointer2 size={18} />
              </div>
              <span className="compare-label before">Before</span>
              <span className="compare-label after">Leap</span>
              <input
                aria-label="Reveal before and after"
                type="range"
                min="6"
                max="94"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================== RIBBIT CHAT DEMO ====================== */
const chat = [
  ["lead", "Hi, is 18 Harbor View still available?"],
  [
    "ribbit",
    "Yes — and it just dropped a fresh cinematic film. Pre-approved, or want the agent to connect you with a lender?",
  ],
  ["lead", "Pre-approved. Can I tour after 5?"],
  ["ribbit", "Perfect. Checking the agent calendar now — does 5:30 or 6:15 work better?"],
  ["lead", "6:15."],
  ["ribbit", "Booked. Context sent to the agent: pre-approved buyer, tour at 6:15 PM."],
];

export function RibbitChat() {
  const [visible, setVisible] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setVisible((v) => (v < chat.length ? v + 1 : v));
    }, 850);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="section" id="ribbit">
      <div className="container ribbit-grid">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Bot size={13} /> Ribbit
          </span>
          <h2 className="display h2">
            Speed-to-lead that
            <br />
            books the tour.
          </h2>
          <p className="lede">
            Ribbit runs the first response, qualifies serious buyers, and hands your team a
            context-rich handoff the moment speed matters most.
          </p>
          <ul className="leap-points">
            <li>
              <Zap size={16} /> Replies in &lt;3 seconds
            </li>
            <li>
              <ShieldCheck size={16} /> Qualifies intent
            </li>
            <li>
              <CalendarCheck size={16} /> Books the next step
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            ref={ref}
            className="phone glass-strong"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="phone-top">
              <span className="phone-avatar">
                <FrogMark size={22} />
              </span>
              <div>
                <strong>Ribbit Concierge</strong>
                <small>Speed-to-lead active</small>
              </div>
              <span className="phone-pulse" />
            </div>
            <div className="phone-msgs">
              {chat.slice(0, visible).map(([type, text], i) => (
                <motion.div
                  key={i}
                  className={`bubble ${type}`}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {text}
                </motion.div>
              ))}
              {visible < chat.length && (
                <div className="bubble typing">
                  <span /> <span /> <span />
                </div>
              )}
            </div>
            <div className="phone-handoff">
              <div>
                <span className="kicker">Agent handoff</span>
                <strong>Pre-approved buyer · tour 6:15 PM</strong>
              </div>
              <CalendarCheck size={20} />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================== PRICING ====================== */
const plans = [
  {
    name: "Tadpole",
    price: "$299",
    cadence: "/mo",
    desc: "For solo agents who want AI listing media and instant lead response without adding headcount.",
    features: [
      "2 Leap cinematic listing videos / mo",
      "Ribbit on one primary lead source",
      "AI follow-up scripts for new buyers",
      "Listing launch caption pack",
      "Monthly optimization check-in",
    ],
  },
  {
    name: "Bullfrog",
    price: "$599",
    cadence: "/mo",
    desc: "For top producers and brokerages running a sharper, always-on listing + lead engine.",
    features: [
      "5 Leap cinematic listing videos / mo",
      "Ribbit across web, social & portals",
      "Priority lead routing + handoff notes",
      "Weekly performance review",
      "Brokerage brand prompt system",
      "Priority launch support",
    ],
    featured: true,
  },
];

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHeadingWrap
          eyebrow="Pricing"
          title="Productized AI agency plans."
          lede="Pick the level of leverage. Both plans plug Leap and Ribbit into your existing listing and lead flow."
        />
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.article
                className={`price-card glass ${p.featured ? "featured" : ""}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease }}
              >
                {p.featured && <span className="plan-badge">Most popular</span>}
                <h3 className="display h3">{p.name}</h3>
                <div className="price-line">
                  <span className="display">{p.price}</span>
                  <small>{p.cadence}</small>
                </div>
                <p className="lede">{p.desc}</p>
                <ul className="price-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={17} /> {f}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  href="#strategy"
                  variant={p.featured ? "primary" : "ghost"}
                  className="price-cta"
                >
                  Book a demo <ArrowRight size={17} />
                </MagneticButton>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== TESTIMONIALS ====================== */
const quotes = [
  {
    quote:
      "Our listings feel elevated before a buyer walks in. The video finally matches the caliber of the homes we sell.",
    name: "Fairfield County Specialist",
    meta: "Connecticut Realtor",
  },
  {
    quote:
      "The speed-to-lead flow is what we didn't know we were missing. Hot inquiries get handled instantly and my team gets the context.",
    name: "New Haven Team Lead",
    meta: "Connecticut Brokerage",
  },
  {
    quote:
      "It's like having a sharp AI media and follow-up desk behind every agent. That's the leverage this market rewards.",
    name: "West Hartford Luxury Agent",
    meta: "Connecticut Realtor",
  },
];

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeadingWrap
          eyebrow="Agents say"
          title="Built for the pace of competitive markets."
        />
        <div className="quote-grid">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="quote-card glass">
                <Quote size={26} className="quote-mark" />
                <blockquote>“{q.quote}”</blockquote>
                <figcaption>
                  <span className="stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" />
                    ))}
                  </span>
                  <strong>{q.name}</strong>
                  <span className="kicker">{q.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== FAQ ====================== */
const faqs = [
  {
    q: "Do I need to learn new software?",
    a: "No. FrogAI plugs into the listing photos and lead sources you already use. Leap works from your photo sets; Ribbit connects to your website, social, and portal inquiries.",
  },
  {
    q: "How fast does Ribbit reply to leads?",
    a: "Median reply is under three seconds. Ribbit qualifies intent and books the next step, then hands your team a clean context note.",
  },
  {
    q: "Can it match my brokerage's brand?",
    a: "Yes. Bullfrog includes a brokerage brand prompt system so every video, message, and follow-up stays in your voice and standards.",
  },
  {
    q: "What do I get each month?",
    a: "Tadpole includes 2 Leap videos and Ribbit on one source. Bullfrog includes 5 Leap videos, Ribbit everywhere, weekly reviews, and priority launch support.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container faq-grid">
        <SectionHeadingWrap
          eyebrow="FAQ"
          title="Questions, answered."
          lede="Everything agents ask before plugging FrogAI into their listing and lead flow."
        />
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`faq-item glass ${open === i ? "open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span>{f.q}</span>
                  <ChevronDown size={20} className="faq-caret" />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p className="lede">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== FINAL CTA ====================== */
export function FinalCTA() {
  return (
    <section className="section final" id="strategy">
      <div className="container">
        <Reveal>
          <div className="final-card glass-strong">
            <div className="final-glow" />
            <span className="eyebrow">
              <Sparkles size={13} /> FrogAI
            </span>
            <h2 className="display h2">
              Book your free AI strategy session.
            </h2>
            <p className="lede">
              See how Leap and Ribbit drop into your listing launch and lead response — and
              where the leverage is hiding in your current process.
            </p>
            <div className="hero-actions">
              <MagneticButton href="#" variant="primary">
                Book your session <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton href="#leap" variant="ghost">
                Rewatch Leap
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================== FOOTER ====================== */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#top" className="brand">
            <FrogMark size={30} />
            <span>FrogAI</span>
          </a>
          <p className="lede">
            The AI agency partner for elite real estate agents. Leap into cinematic listings.
            Ribbit back leads in seconds.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4 className="kicker">Product</h4>
            <a href="#leap">Leap</a>
            <a href="#ribbit">Ribbit</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <h4 className="kicker">Company</h4>
            <a href="#strategy">Strategy session</a>
            <a href="#">About</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <h4 className="kicker">Social</h4>
            <a href="#">X / Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="kicker">© {new Date().getFullYear()} FrogAI</span>
        <span className="kicker">Built for agents who sell like a media company.</span>
      </div>
    </footer>
  );
}
