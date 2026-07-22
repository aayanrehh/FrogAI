import { useState, useEffect } from "react";

/* ----------------------------------------------------------------------------
 * RibbitDemo — RIBBIT, the Speed-to-Lead agent (FrogAI product demo screen)
 * Self-contained, state-driven walkthrough: Connect → Inbound → Qualify → Book
 * -------------------------------------------------------------------------- */

type Step = 1 | 2 | 3 | 4;
type Source = "facebook" | "website";
type Sender = "agent" | "lead";
type ChatMsg = { from: Sender; text: string };

const EMERALD = "#10b981";

/* the qualifying script Ribbit runs once a lead arrives */
const SCRIPT: ChatMsg[] = [
  { from: "agent", text: "Awesome — what's your budget range?" },
  { from: "lead", text: "Around $420k–$460k" },
  { from: "agent", text: "What are you looking for (beds / area)?" },
  { from: "lead", text: "3 bed, ideally near downtown" },
  { from: "agent", text: "Ideal timeline to move?" },
  { from: "lead", text: "ASAP — hoping to tour this week" },
];

/* lead opener, varies by source */
const INBOUND: Record<Source, { text: string; label: string }> = {
  facebook: { text: "Hey! Is the Maple St place still available? 🏡", label: "Facebook · just now" },
  website: { text: "Hi! Is the Maple St listing still on the market? 🏡", label: "Website chat · just now" },
};

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Connect" },
  { n: 2, label: "Inbound" },
  { n: 3, label: "Qualify" },
  { n: 4, label: "Email & Book" },
];

/* ---- small frog avatar ---- */
function FrogMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" aria-hidden="true">
      <path
        d="M128 44c-30 0-54 22-54 50 0 22 13 38 32 47v26a10 10 0 0 0 18 0v-22h8v22a10 10 0 0 0 18 0v-26c19-9 32-25 32-47 0-28-24-50-54-50Z"
        fill={EMERALD}
      />
      <circle cx="104" cy="96" r="11" fill="#fff" />
      <circle cx="152" cy="96" r="11" fill="#fff" />
      <circle cx="104" cy="96" r="5" fill="#0a1f18" />
      <circle cx="152" cy="96" r="5" fill="#0a1f18" />
    </svg>
  );
}

/* ---- stepper ---- */
function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {STEPS.map((s, i) => {
        const state = step > s.n ? "done" : step === s.n ? "active" : "idle";
        return (
          <div key={s.n} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  state === "done"
                    ? "bg-frogai-primary text-white"
                    : state === "active"
                    ? "bg-frogai-ink text-white ring-4 ring-frogai-primary/20"
                    : "bg-frogai-surface-2 text-frogai-ink-soft"
                }`}
              >
                {state === "done" ? "✓" : s.n}
              </span>
              <span
                className={`hidden text-sm font-medium transition-colors duration-300 sm:inline ${
                  state === "idle" ? "text-frogai-ink-soft" : "text-frogai-ink"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px w-6 transition-colors duration-300 sm:w-10 ${
                  step > s.n ? "bg-frogai-primary" : "bg-frogai-line"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---- mock CRM + OAuth connect panel (step 1) ---- */
function CrmPanel({
  connected,
  oauthOpen,
  onConnect,
  onAllow,
  onDeny,
}: {
  connected: boolean;
  oauthOpen: boolean;
  onConnect: () => void;
  onAllow: () => void;
  onDeny: () => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-frogai-surface-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16v10H4z" stroke={EMERALD} strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M4 7l8 5 8-5" stroke={EMERALD} strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-frogai-ink">Your CRM</div>
              <div className="text-xs text-frogai-ink-soft">Follow Up Boss · 1,284 contacts</div>
            </div>
          </div>
          {connected ? (
            <span className="flex items-center gap-1.5 rounded-full bg-frogai-primary/12 px-3 py-1 text-xs font-semibold text-frogai-accent">
              <FrogMark size={14} /> Connected ✓
            </span>
          ) : (
            <span className="rounded-full border border-frogai-line px-3 py-1 text-xs font-medium text-frogai-ink-soft">
              Not linked
            </span>
          )}
        </div>

        <div className="mt-5 rounded-xl border border-frogai-line bg-frogai-surface-2/70 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-frogai-ink-soft">
            FrogAI agent
          </div>
          <div className="mt-1 flex items-center gap-2">
            <FrogMark />
            <span className="font-display text-xl text-frogai-ink">Ribbit</span>
            <span className="rounded-md bg-frogai-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-frogai-accent">
              Speed-to-Lead
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-frogai-ink-soft">
            Replies to every new lead in under 3 seconds, qualifies them by text, and books the tour — straight into your pipeline.
          </p>
        </div>

        {connected ? (
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-frogai-primary/8 p-4">
            <FrogMark size={28} />
            <div>
              <div className="text-sm font-semibold text-frogai-ink">Ribbit is live</div>
              <div className="text-xs text-frogai-ink-soft">Listening for inbound leads…</div>
            </div>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="mt-5 w-full rounded-xl bg-frogai-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent"
          >
            Connect Ribbit
          </button>
        )}
      </div>

      {oauthOpen && (
        <div className="banner-in absolute inset-0 grid place-items-center rounded-2xl bg-frogai-bg/80 backdrop-blur-sm">
          <div className="w-[88%] rounded-2xl border border-frogai-line bg-white p-5 shadow-[0_24px_70px_rgba(16,185,129,0.18)]">
            <div className="flex items-center gap-2">
              <FrogMark />
              <span className="font-display text-lg text-frogai-ink">FrogAI</span>
            </div>
            <p className="mt-3 text-sm font-medium text-frogai-ink">
              FrogAI is requesting access to:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-frogai-ink-soft">
              {["Contacts", "Messages", "Calendars"].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4 4 10-10" stroke={EMERALD} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <button
                onClick={onDeny}
                className="flex-1 rounded-xl border border-frogai-line px-4 py-2.5 text-sm font-medium text-frogai-ink-soft transition-colors hover:border-frogai-ink/30"
              >
                Deny
              </button>
              <button
                onClick={onAllow}
                className="flex-1 rounded-xl bg-frogai-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- iPhone-ish chat frame ---- */
function PhoneChat({
  source,
  inbound,
  conv,
  typing,
}: {
  source: Source;
  inbound: ChatMsg;
  conv: ChatMsg[];
  typing: boolean;
}) {
  const all: ChatMsg[] = [inbound, ...conv];
  return (
    <div className="demo-phone-shell mx-auto w-[300px] rounded-[2.5rem] border-[10px] border-frogai-ink bg-frogai-ink p-2.5 shadow-2xl">
      <div className="demo-phone-screen flex min-h-0 flex-col overflow-hidden rounded-[1.7rem] bg-white">
        <div className="flex flex-none items-center justify-between border-b border-frogai-line bg-frogai-surface-2 px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-frogai-ink">Aayan Rehman</div>
            <div className="text-xs text-frogai-ink-soft">
              {source === "facebook" ? "Facebook lead" : "Website chat"}
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-frogai-primary/12 px-2 py-0.5 text-[10px] font-semibold text-frogai-accent">
            <FrogMark size={12} /> Ribbit
          </span>
        </div>

        <div className="demo-phone-viewport min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
          {all.map((m, i) => (
            <div
              key={i}
              className={`msg-in max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                m.from === "agent"
                  ? "ml-auto bg-frogai-primary text-white rounded-bl-md"
                  : "mr-auto bg-frogai-surface-2 text-frogai-ink rounded-br-md"
              }`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="mr-auto flex items-center gap-2 rounded-2xl bg-frogai-surface-2 px-3 py-2.5 text-[12px] text-frogai-ink-soft rounded-br-md">
              <span className="typing text-frogai-primary">
                <span />
                <span />
                <span />
              </span>
              Ribbit is typing
            </div>
          )}
        </div>
        <div className="demo-phone-footer flex-none border-t border-frogai-line bg-white px-4 py-3">
          <div className="flex h-9 items-center justify-between rounded-full border border-frogai-line px-3 text-[10px] text-frogai-ink-soft">
            <span>Message</span><span className="grid h-6 w-6 place-items-center rounded-full bg-frogai-primary text-white">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- branded email + booking panel (step 4) ---- */
function EmailPanel() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
      <div className="flex items-center justify-between border-b border-frogai-line pb-4">
        <div className="flex items-center gap-2">
          <FrogMark size={20} />
          <span className="font-display text-lg text-frogai-ink">
            Aayan Rehman <span className="text-frogai-ink-soft">· Realty</span>
          </span>
        </div>
        <span className="rounded-full bg-frogai-primary/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-frogai-accent">
          Ribbit
        </span>
      </div>

      <div className="mt-4 text-xs text-frogai-ink-soft">
        <div><span className="font-semibold text-frogai-ink">To:</span> Jordan M.</div>
        <div className="mt-1"><span className="font-semibold text-frogai-ink">Subject:</span> Maple St tour — let's get you in 🏡</div>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-frogai-ink">
        <p>Hi Jordan,</p>
        <p>
          Great news — the Maple St place is still available, and based on what you
          shared (budget ~$420k–$460k, 3 bed near downtown, looking ASAP) it's a
          strong fit.
        </p>
        <p>I've held a tour for you:</p>
        <div className="rounded-xl border border-frogai-line bg-frogai-surface-2/70 p-3">
          <div className="text-frogai-accent">📅 Friday, 4:00 PM</div>
          <a className="mt-1 inline-block text-frogai-primary underline decoration-frogai-primary/40 underline-offset-2" href="#" onClick={(e) => e.preventDefault()}>
            👉 Confirm your spot: frogai.realty/book/maple-jordan
          </a>
        </div>
        <p>Reply with any questions — happy to help.</p>
        <p className="font-semibold">Aayan Rehman · Realty</p>
      </div>

      <div className="banner-in mt-5 rounded-xl border border-frogai-primary/40 bg-frogai-primary/12 px-3 py-2.5 text-center text-xs font-semibold text-frogai-accent">
        ✓ Tour booked: Fri 4:00 PM
      </div>
    </div>
  );
}

/* ---- the demo ---- */
export default function RibbitDemo() {
  const [step, setStep] = useState<Step>(1);
  const [connected, setConnected] = useState(false);
  const [oauthOpen, setOauthOpen] = useState(false);
  const [source, setSource] = useState<Source>("facebook");
  const [conv, setConv] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);

  const reset = () => {
    setStep(1);
    setConnected(false);
    setOauthOpen(false);
    setConv([]);
    setTyping(false);
  };

  const allow = () => {
    setOauthOpen(false);
    setConnected(true);
  };

  /* step 1 → 2 once connected */
  useEffect(() => {
    if (!connected) return;
    const t = setTimeout(() => setStep(2), 1200);
    return () => clearTimeout(t);
  }, [connected]);

  /* step 2 → 3 after the inbound lead lands */
  useEffect(() => {
    if (step !== 2) return;
    setConv([]);
    setTyping(false);
    const t = setTimeout(() => setStep(3), 1800);
    return () => clearTimeout(t);
  }, [step]);

  /* step 3 → run the qualifying script, then advance to 4 */
  useEffect(() => {
    if (step !== 3) return;
    setConv([]);
    setTyping(false);
    const timers: number[] = [];
    let delay = 400;
    for (const m of SCRIPT) {
      if (m.from === "agent") {
        timers.push(window.setTimeout(() => setTyping(true), delay));
        delay += 550;
        timers.push(
          window.setTimeout(() => {
            setTyping(false);
            setConv((c) => [...c, m]);
          }, delay)
        );
        delay += 320;
      } else {
        timers.push(
          window.setTimeout(() => setConv((c) => [...c, m]), delay)
        );
        delay += 360;
      }
    }
    timers.push(window.setTimeout(() => setStep(4), delay + 600));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [step]);

  const inbound: ChatMsg = { from: "lead", text: INBOUND[source].text };
  const canNext = step === 1 ? connected : step < 4;

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-frogai-primary">
          <span className="h-px w-6 bg-frogai-primary" /> RIBBIT · Speed-to-Lead
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-frogai-ink sm:text-5xl">
          The lead lands. Ribbit <span className="italic text-frogai-primary">answers in 2.4s.</span>
        </h2>
        <p className="mt-4 text-frogai-ink-soft">
          Connect your CRM, watch a live inbound lead get qualified by text, and see the branded email + booked tour — no 15-hour gaps.
        </p>
      </div>

      <div className="mt-10">
        <Stepper step={step} />
        <p className="mt-4 text-center text-sm text-frogai-ink-soft">
          Ribbit replies to every lead in under 3 seconds, by text, and books the tour — no 15-hour gaps.
        </p>
      </div>

      <div className="mt-10">
        {step === 1 && (
          <CrmPanel
            connected={connected}
            oauthOpen={oauthOpen}
            onConnect={() => setOauthOpen(true)}
            onAllow={allow}
            onDeny={() => setOauthOpen(false)}
          />
        )}

        {step === 2 && (
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="mx-auto w-full max-w-sm">
              <div className="rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-frogai-ink-soft">
                  Inbound lead — choose source
                </div>
                <div className="mt-3 flex gap-2">
                  {(["facebook", "website"] as Source[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSource(s)}
                      className={`flex-1 rounded-xl px-3 py-2 text-xs font-medium capitalize transition-all duration-200 ${
                        source === s
                          ? "bg-frogai-primary text-white"
                          : "border border-frogai-line text-frogai-ink-soft hover:border-frogai-primary/50"
                      }`}
                    >
                      {s === "facebook" ? "Facebook lead" : "Website chat"}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-frogai-surface-2/70 px-3 py-2.5 text-xs text-frogai-ink-soft">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-frogai-primary" />
                  {INBOUND[source].label}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-frogai-ink-soft">
                  A new lead just hit your CRM. Ribbit sees it the instant it lands and opens the conversation — before they close the tab.
                </p>
              </div>
            </div>
            <PhoneChat source={source} inbound={inbound} conv={conv} typing={typing} />
          </div>
        )}

        {step === 3 && (
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="mx-auto w-full max-w-sm">
              <div className="rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-frogai-primary">
                  <FrogMark size={14} /> Qualifying in real time
                </div>
                <p className="mt-3 text-sm leading-relaxed text-frogai-ink-soft">
                  Ribbit asks only what it needs — budget, must-haves, timeline — and listens to the replies. No forms, no friction, all in the lead's own thread.
                </p>
                <div className="mt-4 space-y-2">
                  {["Budget captured", "Beds / area captured", "Timeline captured"].map((t, i) => (
                    <div
                      key={t}
                      className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${
                        conv.length >= i * 2 + 1 ? "text-frogai-ink opacity-100" : "text-frogai-ink-soft opacity-40"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5l4 4 10-10" stroke={EMERALD} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <PhoneChat source={source} inbound={inbound} conv={conv} typing={typing} />
          </div>
        )}

        {step === 4 && (
          <div className="grid items-start gap-10 md:grid-cols-2">
            <PhoneChat source={source} inbound={inbound} conv={conv} typing={false} />
            <div>
              <div className="banner-in mb-4 inline-flex items-center gap-2 rounded-full bg-frogai-primary/12 px-3 py-1.5 text-xs font-semibold text-frogai-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-frogai-primary" />
                Speed-to-lead: 2.4s · Qualified · Tour booked
              </div>
              <EmailPanel />
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
          disabled={step === 1}
          className="rounded-xl border border-frogai-line bg-white px-5 py-2.5 text-sm font-medium text-frogai-ink transition-all duration-200 hover:border-frogai-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        {step === 4 ? (
          <button
            onClick={reset}
            className="rounded-xl bg-frogai-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent"
          >
            ↻ Replay demo
          </button>
        ) : (
          <button
            onClick={() => setStep((s) => (canNext ? ((s + 1) as Step) : s))}
            disabled={!canNext}
            className="rounded-xl bg-frogai-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 1 ? "Connect to continue" : "Next"}
          </button>
        )}
      </div>
    </section>
  );
}
