import { useEffect } from "react";
import LeapDemo from "./demos/LeapDemo";
import RibbitDemo from "./demos/RibbitDemo";
import LilyDemo from "./demos/LilyDemo";
import CroakDemo from "./demos/CroakDemo";
import FrogSupport from "./FrogSupport";

const STEPS = [
  {
    id: "leap",
    name: "Leap",
    role: "Facebook Ad Video + Visibility Agent",
    blurb:
      "Drag in listing photos, pick a prompt, choose a format, and generate a Facebook-ready lead-generation video.",
    Comp: LeapDemo,
    accent: "#168d63",
  },
  {
    id: "ribbit",
    name: "Ribbit",
    role: "Speed-to-Lead Agent",
    blurb:
      "Connect the agent to your CRM, watch an inbound lead get qualified and booked in seconds.",
    Comp: RibbitDemo,
    accent: "#087d58",
  },
  {
    id: "lily",
    name: "Lily",
    role: "Database Reactivation Agent",
    blurb:
      "Drop in your CRM export; Lily sorts, drafts, and attributes every recovered dollar.",
    Comp: LilyDemo,
    accent: "#7567a7",
  },
  {
    id: "croak",
    name: "Croak",
    role: "Premium Gaussian-Splat Walkthroughs",
    blurb:
      "Preview a browser-based spatial listing experience and learn which rooms hold a buyer's attention.",
    Comp: CroakDemo,
    accent: "#477fa7",
  },
];

function FrogLogo() {
  return (
    <span className="brand-logo brand-logo-compact">
      <img src="/frogai-wordmark.png" alt="FrogAI" />
    </span>
  );
}

export default function DemosPage() {
  useEffect(() => {
    document.title = "FrogAI Live Demos | AI Agents for Real Estate";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = "Try FrogAI's real estate AI agents for Facebook ad video, speed-to-lead, database reactivation, and interactive property walkthroughs.";
    }
  }, []);

  return (
    <main className="min-h-screen bg-frogai-bg text-frogai-ink">
      <nav className="sticky top-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-frogai-line bg-white/70 px-5 py-3 shadow-[0_8px_30px_rgba(16,185,129,0.08)] backdrop-blur-md">
          <a href="/" className="mr-1">
            <FrogLogo />
          </a>
          <span className="hidden text-sm text-frogai-ink-soft sm:inline">
            Live product walkthrough
          </span>
          <a
            href="/"
            className="ml-1 rounded-xl border border-frogai-line px-4 py-2 text-sm font-semibold text-frogai-ink transition-all hover:border-frogai-primary/50"
          >
            ← Back to site
          </a>
        </div>
      </nav>

      <header className="mx-auto max-w-3xl px-4 pt-20 pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-frogai-primary">
          Interactive real estate AI demos
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-frogai-ink sm:text-6xl">
          See how each agent moves the lead journey forward.
        </h1>
        <p className="mt-4 text-frogai-ink-soft">
          Create a listing campaign, answer and qualify a new lead, reactivate a
          quiet database, and explore a property experience. No signup required.
        </p>
      </header>

      <div className="mx-auto max-w-5xl space-y-28 px-4 pb-32">
        {STEPS.map((s, i) => {
          const Comp = s.Comp;
          return (
            <section id={s.id} key={s.id} className="scroll-mt-24">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-white"
                      style={{ background: s.accent }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-display text-4xl text-frogai-ink">
                      {s.name}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-frogai-primary">
                    {s.role}
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-frogai-ink-soft">
                    {s.blurb}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-frogai-line bg-white p-4 shadow-[0_24px_70px_rgba(16,185,129,0.08)] sm:p-8">
                <Comp />
              </div>
            </section>
          );
        })}
      </div>

      <footer className="border-t border-frogai-line bg-frogai-surface-2/60 px-4 py-16 text-center">
        <h2 className="font-display text-4xl text-frogai-ink">
          Turn more real estate attention into useful conversations.
        </h2>
        <a
          href="https://cal.com/aayan-rehman-ndvc9i/30min"
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-block rounded-xl bg-frogai-ink px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-frogai-accent"
        >
          Book a FrogAI strategy call ↗
        </a>
      </footer>
      <FrogSupport />
    </main>
  );
}
