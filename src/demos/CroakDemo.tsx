import { useState, useEffect } from "react";

const EMERALD = "#10b981";

const STEPS = ["Build", "Play", "Signals"];

const ROOM_CHIPS = [
  "Living Room",
  "Kitchen",
  "Primary Suite",
  "Backyard",
  "Home Office",
];

type RoomInfo = { top: string; left: string; fact: string; caption: string };

const ROOM_INFO: Record<string, RoomInfo> = {
  "Living Room": {
    top: "46%",
    left: "27%",
    fact: "Living room · 10-ft ceilings, south light all day",
    caption: "Living Room — sun-warmed and open",
  },
  Kitchen: {
    top: "61%",
    left: "64%",
    fact: "Kitchen renovated 2024 · quartz counters",
    caption: "Kitchen — the 2024 renovation",
  },
  "Primary Suite": {
    top: "29%",
    left: "76%",
    fact: "Primary suite · spa bath, walk-in closet",
    caption: "Primary Suite — calm and private",
  },
  Backyard: {
    top: "77%",
    left: "52%",
    fact: "Backyard · covered patio, mature oaks",
    caption: "Backyard — your own green room",
  },
  "Home Office": {
    top: "69%",
    left: "17%",
    fact: "Home office · quiet, bright, and ready for deep work",
    caption: "Home Office — quiet and bright",
  },
};

// Faux buyer engagement reported back after the tour is played.
const BUYER_VISITS = [
  { room: "Kitchen", count: 3 },
  { room: "Primary Suite", count: 2 },
  { room: "Living Room", count: 2 },
  { room: "Backyard", count: 1 },
];

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

function Stepper({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {STEPS.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => i <= step && setStep(i)}
              disabled={i > step}
              className="flex items-center gap-2 rounded-full transition-all duration-200"
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-all duration-300 ${
                  active
                    ? "bg-frogai-primary text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]"
                    : done
                      ? "bg-frogai-primary/15 text-frogai-accent"
                      : "bg-frogai-surface-2 text-frogai-ink-soft"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  active ? "text-frogai-ink" : "text-frogai-ink-soft"
                }`}
              >
                {label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px w-4 sm:w-8 transition-colors duration-300 ${
                  done ? "bg-frogai-primary/50" : "bg-frogai-line"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CroakDemo() {
  const [step, setStep] = useState(0);

  // Step 1 — build
  const [rooms, setRooms] = useState<string[]>([
    "Living Room",
    "Kitchen",
    "Primary Suite",
  ]);
  const [recipient, setRecipient] = useState("buyer@email.com");
  const [link, setLink] = useState<string | null>(null);

  // Step 2 — play
  const [activeSpot, setActiveSpot] = useState<string | null>(null);
  const [captionIdx, setCaptionIdx] = useState(0);

  const includedOrder = ROOM_CHIPS.filter((r) => rooms.includes(r));
  const currentRoom =
    includedOrder.length > 0
      ? includedOrder[captionIdx % includedOrder.length]
      : null;
  const caption =
    includedOrder.length > 0
      ? `Exploring ${ROOM_INFO[currentRoom!].caption}`
      : "Add rooms in Build to start the tour";

  const toggleRoom = (r: string) => {
    setRooms((s) => (s.includes(r) ? s.filter((x) => x !== r) : [...s, r]));
    setLink(null);
  };

  const generateLink = () => {
    if (rooms.length === 0) return;
    setLink("frogai.show/maple-st-9");
  };

  const openSpot = (id: string) => {
    setActiveSpot((cur) => (cur === id ? null : id));
    if (id === "next" && includedOrder.length > 0) {
      setCaptionIdx((i) => (i + 1) % includedOrder.length);
    }
  };

  // Whatever step we land on, close any open tooltip.
  useEffect(() => {
    setActiveSpot(null);
  }, [step]);

  const canAdvanceFromBuild = rooms.length > 0 && link !== null;
  const nextLabel =
    step < STEPS.length - 1 ? `Next: ${STEPS[step + 1]} →` : null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      {/* Header + stepper */}
      <div className="mb-6 flex flex-col gap-5 rounded-3xl border border-frogai-line bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.06)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-frogai-surface-2">
              <FrogMark />
            </span>
            <div>
              <h2 className="font-display text-2xl leading-none text-frogai-ink md:text-3xl">
                Croak
              </h2>
              <p className="text-xs text-frogai-ink-soft">
                Premium Gaussian-splat walkthrough concept
              </p>
            </div>
          </div>
          <Stepper step={step} setStep={setStep} />
        </div>
        <p className="text-sm text-frogai-ink-soft">
          Croak Spatial is designed to turn a high-value listing into a
          photorealistic scene buyers can walk through in their browser — then
          report which rooms held their attention.
        </p>

        <div className="overflow-hidden rounded-2xl border border-emerald-900/20 bg-[#071712]">
          <iframe
            src="https://superspl.at/s?id=7df22856"
            title="Reference Gaussian-splat real estate walkthrough in SuperSplat"
            loading="lazy"
            allow="fullscreen; accelerometer; gyroscope"
            className="h-[390px] w-full border-0 sm:h-[480px]"
          />
          <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3 text-[10px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold uppercase tracking-[0.14em] text-emerald-300">Interactive technology preview · Tap to walk</span>
            <a href="https://superspl.at/scene/7df22856" target="_blank" rel="noreferrer" className="text-white underline decoration-white/30 underline-offset-4">Open the full scene ↗</a>
          </div>
        </div>
        <p className="text-[10px] leading-relaxed text-frogai-ink-soft">
          Reference scene hosted by SuperSplat. FrogAI is evaluating the
          capture, processing, hosting, and analytics workflow as a custom
          premium production service.
        </p>

        {/* Step nav */}
        <div className="flex items-center justify-between border-t border-frogai-line pt-4">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-xl border border-frogai-line bg-white px-5 py-2.5 text-sm font-semibold text-frogai-ink transition-all duration-200 hover:border-frogai-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 && !canAdvanceFromBuild}
              className="rounded-xl bg-frogai-ink px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {nextLabel}
            </button>
          ) : (
            <button
              onClick={() => {
                setStep(0);
                setCaptionIdx(0);
                setLink(null);
              }}
              className="rounded-xl border border-frogai-line bg-white px-6 py-2.5 text-sm font-semibold text-frogai-ink transition-all duration-200 hover:border-frogai-primary/50"
            >
              ↺ Build a new tour
            </button>
          )}
        </div>
      </div>

      {/* ---------- STEP 1 — BUILD ---------- */}
      {step === 0 && (
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          {/* Scene picker */}
          <div className="rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
              Scene picker
            </h3>
            <p className="mt-1 text-sm text-frogai-ink-soft">
              Pick the rooms to drop into the walkthrough.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {ROOM_CHIPS.map((r) => {
                const on = rooms.includes(r);
                return (
                  <button
                    key={r}
                    onClick={() => toggleRoom(r)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                      on
                        ? "bg-frogai-primary text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
                        : "border border-dashed border-frogai-line text-frogai-ink-soft hover:border-frogai-primary/50"
                    }`}
                  >
                    {on && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12.5l4 4 10-10"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {r}
                  </button>
                );
              })}
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
              Recipient
            </label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              type="email"
              className="mt-2 w-full rounded-xl border border-frogai-line bg-frogai-surface-2/50 px-4 py-2.5 text-sm text-frogai-ink outline-none transition-colors duration-200 placeholder:text-frogai-ink-soft/70 focus:border-frogai-primary/60"
              placeholder="buyer@email.com"
            />

            <button
              onClick={generateLink}
              disabled={rooms.length === 0}
              className="mt-5 w-full rounded-xl bg-frogai-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition-all duration-200 hover:bg-frogai-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Generate walkthrough link
            </button>

            {link && (
              <div className="msg-in mt-4 flex items-center gap-2 rounded-xl border border-frogai-primary/40 bg-frogai-primary/10 px-4 py-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-frogai-primary text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 12h8M12 8v8"
                      stroke="#fff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-frogai-accent">
                  {link}
                </span>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
                Tour preview
              </h3>
              <span className="rounded-full bg-frogai-surface-2 px-2.5 py-1 text-[11px] font-semibold text-frogai-accent">
                {rooms.length} SCENES
              </span>
            </div>

            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-frogai-line bg-frogai-surface-2">
              <img
                src="/hero.png"
                alt="Listing hero"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-xl leading-snug text-white md:text-2xl">
                  Maple St · 9
                </p>
                <p className="mt-1 text-sm text-white/80">
                  {rooms.length > 0
                    ? `${rooms.length} rooms staged for the buyer`
                    : "No scenes selected yet"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {rooms.length > 0 ? (
                rooms.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-frogai-line bg-frogai-surface-2/60 px-3 py-1 text-xs font-medium text-frogai-ink"
                  >
                    {r}
                  </span>
                ))
              ) : (
                <p className="text-sm text-frogai-ink-soft">
                  Toggle rooms on the left to build the showcase.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- STEP 2 — PLAY ---------- */}
      {step === 1 && (
        <div className="rounded-2xl border border-frogai-line bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.06)] md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
              Walkthrough · frogai.show/maple-st-9
            </h3>
            <span className="rounded-full bg-frogai-surface-2 px-2.5 py-1 text-[11px] font-semibold text-frogai-accent">
              {recipient}
            </span>
          </div>

          <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-frogai-line bg-frogai-surface-2">
            <img
              src="/hero.png"
              alt="Walkthrough backdrop"
              className="h-full w-full object-cover"
            />

            {/* floaty emerald glow overlay */}
            <div className="animate-floaty pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-frogai-primary/20 blur-3xl" />

            {/* control hint */}
            <div className="absolute left-4 top-4 z-20 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Tap rooms to explore
            </div>

            {/* hotspots */}
            {includedOrder.map((r) => {
              const info = ROOM_INFO[r];
              const open = activeSpot === r;
              return (
                <button
                  key={r}
                  onClick={() => openSpot(r)}
                  style={{ top: info.top, left: info.left }}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  aria-label={r}
                >
                  <span className="relative grid h-6 w-6 place-items-center">
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-frogai-primary/50" />
                    <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-frogai-primary shadow-[0_2px_8px_rgba(16,185,129,0.6)] transition-transform duration-200 group-hover:scale-125" />
                  </span>
                  {open && (
                    <span className="msg-in absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-xl border border-frogai-line bg-white p-3 text-left text-xs font-medium text-frogai-ink shadow-[0_8px_24px_rgba(16,185,129,0.18)]">
                      {info.fact}
                    </span>
                  )}
                </button>
              );
            })}

            {/* go-to-next-room control */}
            {includedOrder.length > 0 && (
              <button
                onClick={() => openSpot("next")}
                style={{ top: "84%", left: "12%" }}
                className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-frogai-primary/50 bg-white/90 px-3 py-1.5 text-xs font-semibold text-frogai-accent shadow-[0_4px_14px_rgba(16,185,129,0.2)] backdrop-blur-sm transition-all duration-200 hover:bg-frogai-primary hover:text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Go to next room
              </button>
            )}

            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
              <div className="rounded-xl bg-gradient-to-t from-black/65 to-transparent px-4 py-3">
                <p className="font-display text-lg leading-snug text-white md:text-xl">
                  {caption}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-sm text-frogai-ink-soft">
            Every hotspot is a room fact — explore freely, then send it and see
            who came back.
          </p>
        </div>
      )}

      {/* ---------- STEP 3 — SIGNALS ---------- */}
      {step === 2 && (
        <div className="banner-in rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)] md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl text-frogai-ink md:text-3xl">
                The buyer played it
              </h3>
              <p className="mt-1 text-sm text-frogai-ink-soft">
                Real engagement from {recipient} on frogai.show/maple-st-9
              </p>
            </div>
            <span className="rounded-full bg-frogai-primary/15 px-4 py-1.5 text-sm font-semibold text-frogai-accent">
              ★ High-intent lead
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* summary */}
            <div className="rounded-2xl border border-frogai-line bg-frogai-surface-2/60 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-frogai-primary" />
                Engagement
              </div>
              <p className="mt-3 text-sm leading-relaxed text-frogai-ink">
                Buyer spent <span className="font-semibold">4m 12s</span> ·
                visited <span className="font-semibold">Kitchen 3×</span>,
                <span className="font-semibold"> Primary Suite 2×</span> ·{" "}
                <span className="font-semibold text-frogai-accent">
                  saved tour
                </span>
              </p>
              <p className="mt-4 text-sm text-frogai-ink-soft">
                Croak tells you which rooms they loved — so your follow-up is
                personal, not generic.
              </p>
            </div>

            {/* bar chart */}
            <div className="rounded-2xl border border-frogai-line bg-frogai-surface-2/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
                Rooms visited
              </div>
              <div className="mt-4 space-y-3">
                {BUYER_VISITS.map((v) => {
                  const max = Math.max(...BUYER_VISITS.map((b) => b.count));
                  const pct = (v.count / max) * 100;
                  return (
                    <div key={v.room}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-frogai-ink">
                          {v.room}
                        </span>
                        <span className="tabular-nums text-frogai-ink-soft">
                          {v.count}×
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-frogai-accent transition-[width] duration-700 ease-out"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="flex-1 rounded-xl bg-frogai-ink px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent">
              Draft a personal follow-up
            </button>
            <button className="flex-1 rounded-xl border border-frogai-line bg-white px-5 py-3 text-sm font-semibold text-frogai-ink transition-all duration-200 hover:border-frogai-primary/50">
              Send another tour
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
