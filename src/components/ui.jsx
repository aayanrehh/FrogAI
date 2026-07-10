import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Bot,
  ChevronDown,
  Star,
  Quote,
} from "lucide-react";
import { Reveal, MagneticButton, FrogMark, fadeUp, stagger, ease } from "./primitives.jsx";

/* Booking destination for every "strategy session" CTA */
const CALENDLY = "https://cal.com/aayan-rehman-ndvc9i/30min";

/* ====================== NAV ====================== */
const navLinks = [
  { href: "#ribbit", label: "Ribbit" },
  { href: "#faq", label: "FAQ" },
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
        <MagneticButton href={CALENDLY} variant="primary" className="nav-cta">
          Book a strategy session
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
          <a href={CALENDLY} onClick={() => setOpen(false)}>
            Book a strategy session
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ====================== HERO (clean, centered, minimal) ====================== */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <Reveal delay={0.06}>
          <h1 className="display h1 hero-title">
            Leap into cinematic listings.
            <br />
            <span className="shiny">Ribbit</span> back leads in seconds.
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="lede hero-lede">
            Leap turns listing photos into luxury video. Ribbit answers every lead in
            seconds, so you sell like a media company and respond like a machine.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="hero-actions">
            <MagneticButton href={CALENDLY} variant="primary">
              Book your strategy session <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton href="#ribbit" variant="ghost">
              See Ribbit in action
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
      <Reveal delay={0.12} className="container">
        <div className="hero-visual">
          <img
            src="/assets/frogai-hero-clean.jpg"
            alt="FrogAI turns a listing interior into a cinematic, AI-graded scene"
            loading="eager"
          />
        </div>
      </Reveal>
      <div className="hero-fade" />
    </section>
  );
}

/* ====================== RIBBIT CHAT DEMO ====================== */
const chat = [
  ["lead", "Hi, is 18 Harbor View still available?"],
  [
    "ribbit",
    "Yes, and it just dropped a fresh cinematic film. Pre-approved, or want the agent to connect you with a lender?",
  ],
  ["lead", "Pre-approved. Can I tour after 5?"],
  ["ribbit", "Perfect. Checking the agent calendar now. Does 5:30 or 6:15 work better?"],
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
            </div>
          </motion.div>
        </Reveal>
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
    a: "Yes. We lock your voice, market, and standards into the AI so every video, message, and follow-up stays on-brand.",
  },
  {
    q: "What do I get each month?",
    a: "Leap cinematic listing videos plus always-on Ribbit speed-to-lead across your sources, tuned monthly around your real listing performance.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
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
              See how Leap and Ribbit drop into your listing launch and lead response, and
              where the leverage is hiding in your current process.
            </p>
            <div className="hero-actions">
              <MagneticButton href={CALENDLY} variant="primary">
                Book your strategy session <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton href="#ribbit" variant="ghost">
                See Ribbit in action
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
            <a href="#ribbit">Ribbit</a>
            <a href="#strategy">Book a session</a>
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

function SectionHeadingWrap({ eyebrow, title, lede }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display h2">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}
