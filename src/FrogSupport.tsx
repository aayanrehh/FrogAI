import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = { id: number; from: "frog" | "visitor"; text: string };

const QUALIFIERS = ["More listing leads", "Faster lead response", "Reactivate my database", "Immersive property tours"];

const RESPONSES: Record<string, string> = {
  "More listing leads": "Leap is the best place to start. It turns listing media into Facebook-ready creative and gives your team a repeatable campaign workflow.",
  "Faster lead response": "Ribbit is built for that gap. It can answer a new inquiry, qualify intent, and move a good-fit prospect toward a tour while the lead is still warm.",
  "Reactivate my database": "Lily can segment quiet contacts and restart relevant conversations with past clients, stale inquiries, and leads whose timing may have changed.",
  "Immersive property tours": "Croak Spatial is our premium property experience: a browser-based Gaussian-splat walkthrough with room-level engagement signals.",
};

function FrogFace() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M11 27C11 16 20 8 32 8s21 8 21 19v12c0 10-9 17-21 17S11 49 11 39V27Z" fill="currentColor" />
      <circle cx="20" cy="16" r="9" fill="currentColor" /><circle cx="44" cy="16" r="9" fill="currentColor" />
      <circle cx="21" cy="17" r="3" fill="#fbfcf9" /><circle cx="43" cy="17" r="3" fill="#fbfcf9" />
      <path d="M20 38c7 5 17 5 24 0" fill="none" stroke="#fbfcf9" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function replyFor(text: string) {
  const value = text.toLowerCase();
  if (value.includes("tour") || value.includes("splat") || value.includes("property")) return RESPONSES["Immersive property tours"];
  if (value.includes("database") || value.includes("past client") || value.includes("reactivat")) return RESPONSES["Reactivate my database"];
  if (value.includes("reply") || value.includes("response") || value.includes("lead")) return RESPONSES["Faster lead response"];
  if (value.includes("ad") || value.includes("listing") || value.includes("creative")) return RESPONSES["More listing leads"];
  return "That sounds worth mapping. The free lead-journey audit will identify the highest-leverage workflow, or you can book a strategy call if you already know where the gap is.";
}

export default function FrogSupport() {
  const [open, setOpen] = useState(false);
  const [ping, setPing] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "frog", text: "Hi—I'm Frog Support. What would create the most value for your real estate business right now?" },
  ]);
  const [showQualifiers, setShowQualifiers] = useState(true);
  const nextId = useRef(2);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setPing(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function toggle() {
    setOpen((value) => !value);
    setPing(false);
  }

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setShowQualifiers(false);
    setMessages((current) => [...current, { id: nextId.current++, from: "visitor", text: clean }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: nextId.current++, from: "frog", text: RESPONSES[clean] ?? replyFor(clean) }]);
    }, 420);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  return (
    <aside className={`frog-support ${open ? "frog-support-open" : ""}`} aria-label="Frog Support">
      {ping && !open && (
        <button className="frog-support-ping" type="button" onClick={toggle}>
          <span>Quick question</span>Where are leads slipping through today?
        </button>
      )}
      {open && (
        <div className="frog-support-panel" role="dialog" aria-modal="false" aria-labelledby="frog-support-title">
          <header>
            <span className="frog-support-avatar"><FrogFace /></span>
            <div><b id="frog-support-title">Frog Support</b><small><i /> Online · qualifying assistant</small></div>
            <button type="button" onClick={toggle} aria-label="Close Frog Support">×</button>
          </header>
          <div className="frog-support-feed" ref={feedRef} aria-live="polite">
            <p className="frog-support-time">Usually replies instantly</p>
            {messages.map((message) => <div className={`frog-support-message ${message.from}`} key={message.id}>{message.text}</div>)}
            {showQualifiers && (
              <div className="frog-support-choices" aria-label="Choose a goal">
                {QUALIFIERS.map((choice) => <button type="button" key={choice} onClick={() => send(choice)}>{choice}</button>)}
              </div>
            )}
            {messages.length > 1 && (
              <div className="frog-support-next">
                <a href="/audit">Start the free audit</a>
                <a href="https://cal.com/aayan-rehman-ndvc9i/30min" target="_blank" rel="noreferrer">Book a strategy call</a>
              </div>
            )}
          </div>
          <form onSubmit={submit}>
            <label className="sr-only" htmlFor="frog-support-input">Message Frog Support</label>
            <input id="frog-support-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your lead journey…" autoComplete="off" />
            <button type="submit" aria-label="Send message">↗</button>
          </form>
          <footer>Hardcoded preview · AI connection coming next</footer>
        </div>
      )}
      <button className="frog-support-launcher" type="button" onClick={toggle} aria-expanded={open} aria-label={open ? "Close Frog Support" : "Open Frog Support"}>
        {open ? <span aria-hidden="true">×</span> : <FrogFace />}{!open && <i aria-hidden="true" />}
      </button>
    </aside>
  );
}
