import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface SampleRow {
  name: string;
  touch: string;
}

interface Bucket {
  id: string;
  label: string;
  count: number;
  def: string;
  rows: SampleRow[];
}

interface Sequence {
  id: string;
  label: string;
  person: string;
  draft: string;
  recovered: number;
}

/* ------------------------------------------------------------------ */
/*  Hardcoded data                                                     */
/* ------------------------------------------------------------------ */
const TOTAL_ROWS = 1284;
const FILE_NAME = "crm_export_aug2026.csv";

const BUCKETS: Bucket[] = [
  {
    id: "cold",
    label: "Cold leads",
    count: 412,
    def: "Toured or engaged, then went quiet.",
    rows: [
      { name: "Sarah Nguyen", touch: "Toured Maple St condo · Mar 14" },
      { name: "Derek Cole", touch: "Priced West Ave · Feb 2" },
    ],
  },
  {
    id: "lapsed",
    label: "Lapsed clients",
    count: 293,
    def: "Closed 2+ yrs ago — a life event makes them move again.",
    rows: [
      { name: "Tom Becker", touch: "Closed 2023 · kid graduated" },
      { name: "Priya Shah", touch: "Closed 2022 · new job" },
    ],
  },
  {
    id: "stale",
    label: "Stale inquiries",
    count: 179,
    def: "Priced or asked, but never listed.",
    rows: [
      { name: "Mia Romano", touch: "Asked about Hartford colonial · Apr 8" },
      { name: "Jordan Lee", touch: "Requested comps · May 1" },
    ],
  },
];

const SEQUENCES: Sequence[] = [
  {
    id: "cold",
    label: "Cold leads",
    person: "Sarah Nguyen",
    draft:
      "Hi Sarah, it's Aayan — back in March you toured the Maple St condo and we talked about schools. Rates just dipped and two new listings hit your range. Want the top two?",
    recovered: 11400,
  },
  {
    id: "lapsed",
    label: "Lapsed clients",
    person: "Tom Becker",
    draft:
      "Hi Tom, congrats on the graduation — with the kids off to college, are you thinking about downsizing? I've got two listings that'd fit the next chapter perfectly.",
    recovered: 18900,
  },
  {
    id: "stale",
    label: "Stale inquiries",
    person: "Mia Romano",
    draft:
      "Hi Mia, the Hartford colonial you liked went under contract, but a similar one just hit $20k under. Want the link before it's gone?",
    recovered: 9500,
  },
];

const TOTAL_MESSAGES = BUCKETS.reduce((s, b) => s + b.count, 0); // 884
const TOTAL_RECOVERED = SEQUENCES.reduce((s, x) => s + x.recovered, 0); // 39,800

const STEPS = ["Upload", "Classify", "Draft", "Review & Send"];

const fmt = (n: number) => `$${n.toLocaleString()}`;

/* ------------------------------------------------------------------ */
/*  Small shared bits                                                  */
/* ------------------------------------------------------------------ */
function FrogMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" aria-hidden="true">
      <path
        d="M128 44c-30 0-54 22-54 50 0 22 13 38 32 47v26a10 10 0 0 0 18 0v-22h8v22a10 10 0 0 0 18 0v-26c19-9 32-25 32-47 0-28-24-50-54-50Z"
        fill="#10b981"
      />
      <circle cx="104" cy="96" r="11" fill="#fff" />
      <circle cx="152" cy="96" r="11" fill="#fff" />
      <circle cx="104" cy="96" r="5" fill="#0a1f18" />
      <circle cx="152" cy="96" r="5" fill="#0a1f18" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-frogai-primary/30 border-t-frogai-primary" />
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-frogai-primary text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
                    : done
                    ? "bg-frogai-primary/15 text-frogai-accent"
                    : "border border-frogai-line bg-frogai-surface-2 text-frogai-ink-soft"
                }`}
              >
                {done ? "✓" : n}
              </span>
              <span
                className={`hidden text-sm font-medium sm:block transition-colors duration-200 ${
                  active ? "text-frogai-ink" : "text-frogai-ink-soft"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px w-6 transition-colors duration-300 sm:w-12 ${
                  done ? "bg-frogai-primary" : "bg-frogai-line"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileChip() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-xl border border-frogai-line bg-frogai-surface-2 px-3.5 py-2 text-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 3v4a1 1 0 0 0 1 1h4M9 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1Z"
          stroke="#059669"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium text-frogai-ink">{FILE_NAME}</span>
      <span className="text-frogai-ink-soft">· {TOTAL_ROWS.toLocaleString()} rows</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main demo                                                          */
/* ------------------------------------------------------------------ */
export default function LilyDemo() {
  const [step, setStep] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [drafting, setDrafting] = useState(false);

  const loadSample = () => {
    setLoaded(true);
    setStep(2);
    setClassifying(true);
    window.setTimeout(() => setClassifying(false), 1700);
  };

  const startDraft = () => {
    setStep(3);
    setDrafting(true);
    window.setTimeout(() => setDrafting(false), 1500);
  };

  const handleNext = () => {
    if (step === 1 && !loaded) return;
    if (step === 1) loadSample();
    else if (step === 2 && !classifying) startDraft();
    else if (step === 3 && !drafting) setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="min-h-screen w-full bg-frogai-bg px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* ---- header ---- */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-frogai-primary/30 bg-frogai-surface-2 px-4 py-2 text-sm font-medium text-frogai-ink">
            <FrogMark />
            Frog<span className="font-semibold text-frogai-primary">AI</span>
            <span className="text-frogai-ink-soft">·</span>
            <span className="text-frogai-ink-soft">Lily</span>
          </div>
          <h1 className="font-display text-4xl leading-tight text-frogai-ink sm:text-5xl">
            Database Reactivation
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-frogai-ink-soft">
            Drop in your CRM export. Lily reads it, sorts the buried contacts, and
            drafts the outreach — attributed to the dollar.
          </p>
        </div>

        {/* ---- stepper ---- */}
        <div className="mt-10">
          <Stepper step={step} />
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-frogai-ink-soft sm:text-sm">
            Lily reactivates the cold leads, lapsed clients, and stale inquiries
            already buried in your CRM — attributed to the dollar.
          </p>
        </div>

        {/* ===== STEP 1 · UPLOAD ===== */}
        {step === 1 && (
          <div className="mt-10 mx-auto max-w-xl">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                if (!loaded) loadSample();
              }}
              className={`rounded-2xl border-2 border-dashed p-10 text-center transition-colors duration-200 ${
                dragging
                  ? "border-frogai-primary bg-frogai-surface-2"
                  : "border-frogai-line bg-white"
              }`}
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-frogai-surface-2">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 15V4m0 0L8 8m4-4 4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
                    stroke="#059669"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-medium text-frogai-ink">
                Drag &amp; drop your CRM / leads export
              </p>
              <p className="mt-1 text-xs text-frogai-ink-soft">
                .csv — contacts, last touch, and notes
              </p>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-frogai-ink-soft">
              <span className="h-px flex-1 bg-frogai-line" />
              or
              <span className="h-px flex-1 bg-frogai-line" />
            </div>

            <button
              onClick={loadSample}
              className="w-full rounded-xl bg-frogai-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-200 hover:bg-frogai-accent"
            >
              Use sample CRM export
            </button>
            <p className="mt-3 text-center text-xs text-frogai-ink-soft">
              No upload needed — we'll load a realistic 1,284-contact book.
            </p>
          </div>
        )}

        {/* ===== STEP 2 · CLASSIFY ===== */}
        {step === 2 && (
          <div className="mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-frogai-ink sm:text-3xl">
                What's knowable in your book
              </h2>
              <FileChip />
            </div>

            {classifying ? (
              <div className="mx-auto max-w-md rounded-2xl border border-frogai-line bg-white p-8 text-center shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-frogai-surface-2">
                  <Spinner />
                </div>
                <p className="text-sm font-medium text-frogai-ink">
                  Lily is reading {TOTAL_ROWS.toLocaleString()} contacts…
                </p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-frogai-surface-2">
                  <div className="h-full w-full animate-pulse rounded-full bg-frogai-primary" />
                </div>
                <p className="mt-3 text-xs text-frogai-ink-soft">
                  Sorting by last touch, intent, and life events
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {BUCKETS.map((b) => (
                  <div
                    key={b.id}
                    className="banner-in rounded-2xl border border-frogai-line bg-white p-6 shadow-[0_8px_30px_rgba(16,185,129,0.06)]"
                  >
                    <div className="flex items-end justify-between">
                      <span className="font-display text-4xl text-frogai-accent">
                        {b.count}
                      </span>
                      <span className="rounded-full bg-frogai-surface-2 px-2.5 py-1 text-[11px] font-semibold text-frogai-ink-soft">
                        {((b.count / TOTAL_ROWS) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-semibold text-frogai-ink">
                      {b.label}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-frogai-ink-soft">
                      {b.def}
                    </p>
                    <div className="mt-4 space-y-2 border-t border-frogai-line pt-4">
                      {b.rows.map((r) => (
                        <div key={r.name} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-frogai-primary" />
                          <div>
                            <div className="text-xs font-medium text-frogai-ink">
                              {r.name}
                            </div>
                            <div className="text-[11px] text-frogai-ink-soft">
                              {r.touch}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 3 · DRAFT ===== */}
        {step === 3 && (
          <div className="mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-frogai-ink sm:text-3xl">
                Personalized sequences, drafted
              </h2>
              <FileChip />
            </div>

            {drafting ? (
              <div className="mx-auto max-w-md rounded-2xl border border-frogai-line bg-white p-8 text-center shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-frogai-surface-2">
                  <Spinner />
                </div>
                <p className="text-sm font-medium text-frogai-ink">
                  Lily is drafting {TOTAL_MESSAGES.toLocaleString()} messages…
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-frogai-ink-soft">
                  <span className="typing text-frogai-primary">
                    <span />
                    <span />
                    <span />
                  </span>
                  Writing from your voice + their history
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {SEQUENCES.map((s, i) => (
                  <div
                    key={s.id}
                    style={{ animationDelay: `${i * 120}ms` }}
                    className="msg-in rounded-2xl border border-frogai-line bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.06)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-frogai-surface-2 px-2.5 py-1 text-[11px] font-semibold text-frogai-ink">
                        {s.label}
                      </span>
                      <span className="text-[11px] font-semibold text-frogai-accent">
                        {fmt(s.recovered)} recovered
                      </span>
                    </div>
                    <div className="mt-3 rounded-2xl rounded-tl-md bg-frogai-primary px-3.5 py-3 text-[13px] leading-snug text-white shadow-[0_6px_18px_rgba(16,185,129,0.25)]">
                      {s.draft}
                    </div>
                    <p className="mt-3 text-[11px] text-frogai-ink-soft">
                      Personalized to {s.person} · 1 of{" "}
                      {BUCKETS.find((b) => b.id === s.id)?.count}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 4 · REVIEW & SEND ===== */}
        {step === 4 && (
          <div className="mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-frogai-ink sm:text-3xl">
                Review &amp; send
              </h2>
              <FileChip />
            </div>

            {/* sequences table */}
            <div className="overflow-hidden rounded-2xl border border-frogai-line bg-white shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
              <div className="grid grid-cols-12 border-b border-frogai-line bg-frogai-surface-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-frogai-ink-soft">
                <div className="col-span-5">Sequence</div>
                <div className="col-span-2 text-right">Contacts</div>
                <div className="col-span-3 text-center">Status</div>
                <div className="col-span-2 text-right">$ Recovered</div>
              </div>
              {SEQUENCES.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-12 items-center border-b border-frogai-line px-4 py-3.5 text-sm last:border-0"
                >
                  <div className="col-span-5 font-medium text-frogai-ink">
                    {s.label}
                  </div>
                  <div className="col-span-2 text-right text-frogai-ink-soft">
                    {BUCKETS.find((b) => b.id === s.id)?.count}
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-frogai-primary/12 px-2.5 py-1 text-[11px] font-semibold text-frogai-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-frogai-primary" />
                      Ready
                    </span>
                  </div>
                  <div className="col-span-2 text-right font-semibold text-frogai-ink">
                    {fmt(s.recovered)}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-12 items-center bg-frogai-surface-2 px-4 py-4 text-sm">
                <div className="col-span-7 font-semibold text-frogai-ink">
                  Total · {TOTAL_MESSAGES.toLocaleString()} messages
                </div>
                <div className="col-span-5 text-right font-display text-xl text-frogai-accent">
                  {fmt(TOTAL_RECOVERED)}
                </div>
              </div>
            </div>

            {/* email summary panel */}
            <div className="mt-6 rounded-2xl border border-frogai-line bg-frogai-surface-2 p-6 shadow-[0_8px_30px_rgba(16,185,129,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FrogMark />
                  <div>
                    <div className="text-sm font-semibold text-frogai-ink">
                      Lily · Email summary
                    </div>
                    <div className="text-xs text-frogai-ink-soft">
                      To: you@yourbrokerage.com
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-frogai-primary/12 px-2.5 py-1 text-[11px] font-semibold text-frogai-accent">
                  Draft
                </span>
              </div>

              <p className="mt-4 rounded-xl border border-frogai-line bg-white p-4 text-sm leading-relaxed text-frogai-ink">
                <span className="font-semibold">Aayan</span> — Lily drafted{" "}
                {TOTAL_MESSAGES.toLocaleString()} reactivation messages across 3
                sequences. Review &amp; approve in 1 click. Estimated recovery:{" "}
                <span className="font-semibold text-frogai-accent">
                  {fmt(TOTAL_RECOVERED)}
                </span>
                .
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-frogai-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-200 hover:bg-frogai-accent"
                >
                  Approve &amp; schedule
                </button>
                <span className="text-xs text-frogai-ink-soft">
                  Sent to your inbox
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ---- Back / Next ---- */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`rounded-xl border border-frogai-line bg-white px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              step === 1
                ? "cursor-not-allowed opacity-40"
                : "text-frogai-ink hover:border-frogai-primary/50"
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !loaded) ||
              (step === 2 && classifying) ||
              (step === 3 && drafting) ||
              step === 4
            }
            className={`rounded-xl bg-frogai-ink px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent ${
              ((step === 1 && !loaded) ||
                (step === 2 && classifying) ||
                (step === 3 && drafting) ||
                step === 4)
                ? "cursor-not-allowed opacity-40"
                : ""
            }`}
          >
            {step === 4 ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
