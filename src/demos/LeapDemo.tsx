import { useState, useEffect } from "react";

const EMERALD = "#10b981";

const SAMPLES = ["/hero.png", "/leap.png", "/ribbit.png", "/network.png"];

const STEPS = ["Import", "Prompt", "Output", "Model", "Generate"];

const PROMPTS = [
  "Cinematic sunset reveal",
  "Neighborhood lifestyle b-roll",
  "Luxury slow walkthrough",
  "First-time buyer friendly",
];

const FORMATS = [
  { key: "reel", label: "Reel 9:16", badge: "REEL · 9:16" },
  { key: "fb", label: "Facebook Ad 1:1", badge: "FACEBOOK AD · 1:1" },
  { key: "showcase", label: "Showcase to Client 16:9", badge: "SHOWCASE · 16:9" },
  { key: "hero", label: "Listing Site Hero", badge: "SITE HERO · 16:9" },
];

const MODELS = ["FrogAI Vision", "Claude Sonnet 4", "Seedance 2.0"];
const QUALITIES = ["Light", "Medium", "High", "Extra High"];

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

function Stepper({ step, setStep }: { step: number; setStep: (n: number) => void }) {
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

export default function LeapDemo() {
  const [step, setStep] = useState(0);

  // Step 1 — import
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  // Step 2 — prompt
  const [prompt, setPrompt] = useState("");

  // Step 3 — output
  const [format, setFormat] = useState("reel");

  // Step 4 — model / quality
  const [model, setModel] = useState("FrogAI Vision");
  const [quality, setQuality] = useState("Extra High");

  // Step 5 — generate
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const addSamples = () => {
    if (images.length === 0) {
      setImages(SAMPLES);
      setSelected(SAMPLES);
    }
  };

  const toggle = (src: string) => {
    setSelected((s) =>
      s.includes(src) ? s.filter((x) => x !== src) : [...s, src].slice(0, 4),
    );
  };

  const hero = selected[0] ?? images[0] ?? null;
  const fmt = FORMATS.find((f) => f.key === format) ?? FORMATS[0];

  const heroCaption = prompt.trim()
    ? prompt.trim()
    : "A cinematic reveal of your listing — calm, premium, ready to post.";

  // Animated render loop
  useEffect(() => {
    if (!generating) return;
    const id = setInterval(() => {
      setProgress((p) => Math.min(100, p + 4.6));
    }, 100);
    return () => clearInterval(id);
  }, [generating]);

  useEffect(() => {
    if (generating && progress >= 100) {
      setGenerating(false);
      setDone(true);
    }
  }, [generating, progress]);

  const startGenerate = () => {
    setDone(false);
    setProgress(0);
    setGenerating(true);
  };

  const status =
    progress < 35
      ? "Rendering 4K frames…"
      : progress < 70
        ? "Matching brand palette…"
        : "Finalizing reel…";

  const canAdvance = step !== 0 || selected.length >= 2;

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
                Leap
              </h2>
              <p className="text-xs text-frogai-ink-soft">Listing & Content studio</p>
            </div>
          </div>
          <Stepper step={step} setStep={setStep} />
        </div>
        <p className="text-sm text-frogai-ink-soft">
          Leap turns listing photos into cinematic 4K video and social cutdowns —
          you pick the shots, we do the edit.
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
              onClick={() => canAdvance && setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="rounded-xl bg-frogai-ink px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next: {STEPS[step + 1]} →
            </button>
          ) : (
            <button
              onClick={startGenerate}
              disabled={generating}
              className="rounded-xl bg-frogai-primary px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition-all duration-200 hover:bg-frogai-accent disabled:opacity-60"
            >
              {generating ? "Generating…" : "Generate listing video"}
            </button>
          )}
        </div>
      </div>

      {/* 3-pane IDE */}
      <div className="grid gap-5 lg:grid-cols-[300px_1fr_320px]">
        {/* LEFT — import */}
        <div className="rounded-2xl border border-frogai-line bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
            Import photos
          </h3>

          <button
            onClick={addSamples}
            className="group mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-frogai-line bg-frogai-surface-2/60 px-4 py-8 text-center transition-all duration-200 hover:border-frogai-primary/60 hover:bg-frogai-surface-2"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-frogai-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke={EMERALD} strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm font-medium text-frogai-ink">
              {images.length === 0 ? "Drop photos here" : "Add sample listing"}
            </span>
            <span className="text-xs text-frogai-ink-soft">or click to load demo set</span>
          </button>

          <p className="mt-4 text-xs text-frogai-ink-soft">
            Selected {selected.length}/4 · pick 2–4 shots
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {images.map((src) => {
              const on = selected.includes(src);
              return (
                <button
                  key={src}
                  onClick={() => toggle(src)}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    on
                      ? "border-frogai-primary ring-2 ring-frogai-primary/30"
                      : "border-frogai-line hover:border-frogai-primary/50"
                  }`}
                >
                  <img src={src} alt="Listing sample" className="h-full w-full object-cover" />
                  {on && (
                    <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-frogai-primary text-white">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5l4 4 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
            {images.length === 0 &&
              [0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl border border-frogai-line bg-frogai-surface-2/60"
                />
              ))}
          </div>
        </div>

        {/* CENTER — preview canvas */}
        <div className="rounded-2xl border border-frogai-line bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
              Preview
            </h3>
            <span className="rounded-full bg-frogai-surface-2 px-2.5 py-1 text-[11px] font-semibold text-frogai-accent">
              {fmt.badge}
            </span>
          </div>

          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-frogai-line bg-frogai-surface-2">
            {/* film-frame bars */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-3 justify-between bg-black/70">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="my-1 h-1 w-1 rounded-full bg-white/40" />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-3 justify-between bg-black/70">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="my-1 h-1 w-1 rounded-full bg-white/40" />
              ))}
            </div>

            {hero ? (
              <img src={hero} alt="Selected hero" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-center">
                <div className="px-8">
                  <FrogMark size={34} />
                  <p className="mt-3 text-sm text-frogai-ink-soft">
                    Add listing photos to see your reel preview
                  </p>
                </div>
              </div>
            )}

            {/* caption overlay */}
            {hero && (
              <div className="absolute inset-x-0 bottom-3 z-20 px-5 pb-1">
                <div className="rounded-xl bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <p className="font-display text-lg leading-snug text-white md:text-xl">
                    {heroCaption}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Generate / progress / result */}
          {step === STEPS.length - 1 && (
            <div className="mt-4">
              {generating && (
                <div className="rounded-2xl border border-frogai-line bg-frogai-surface-2/60 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-frogai-ink-soft">
                    <span className="text-frogai-accent">{status}</span>
                    <span className="tabular-nums text-frogai-ink">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-frogai-line">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-frogai-accent transition-[width] duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {done && !generating && (
                <div className="animate-floaty rounded-2xl border border-frogai-primary/40 bg-white p-4 shadow-[0_12px_40px_rgba(16,185,129,0.18)]">
                  <div className="relative overflow-hidden rounded-xl border border-frogai-line">
                    <img src={hero ?? ""} alt="Result" className="aspect-video w-full object-cover" />
                    <button className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-frogai-primary shadow-lg transition-transform duration-300 hover:scale-110">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                    <span className="absolute left-2 top-2 rounded-full bg-frogai-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
                      {fmt.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-frogai-ink">{heroCaption}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-xl bg-frogai-ink px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-frogai-accent">
                      Download
                    </button>
                    <button className="flex-1 rounded-xl border border-frogai-line bg-white px-4 py-2.5 text-sm font-semibold text-frogai-ink transition-all duration-200 hover:border-frogai-primary/50">
                      Send to client
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — step controls */}
        <div className="rounded-2xl border border-frogai-line bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-frogai-primary">
            Step {step + 1} · {STEPS[step]}
          </h3>

          <div className="mt-4">
            {step === 0 && (
              <p className="text-sm text-frogai-ink-soft">
                Drag in your listing photos or load the sample set, then select
                2–4 hero shots. We'll build the edit around them.
              </p>
            )}

            {step === 1 && (
              <div>
                <p className="mb-3 text-sm text-frogai-ink-soft">
                  Start from a library prompt or write your own.
                </p>
                <div className="flex flex-wrap gap-2">
                  {PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrompt(p)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                        prompt === p
                          ? "bg-frogai-primary text-white"
                          : "border border-frogai-line text-frogai-ink-soft hover:border-frogai-primary/50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  placeholder="Describe the vibe, the buyer, the moment…"
                  className="mt-4 w-full resize-none rounded-xl border border-frogai-line bg-frogai-surface-2/50 p-3 text-sm text-frogai-ink outline-none transition-colors duration-200 placeholder:text-frogai-ink-soft/70 focus:border-frogai-primary/60"
                />
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 gap-2.5">
                {FORMATS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFormat(f.key)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                      format === f.key
                        ? "border-transparent bg-frogai-primary text-white shadow-[0_6px_18px_rgba(16,185,129,0.3)]"
                        : "border-frogai-line text-frogai-ink hover:border-frogai-primary/50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="mb-2 text-xs font-medium text-frogai-ink-soft">Model</p>
                <div className="grid grid-cols-1 gap-2">
                  {MODELS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setModel(m)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        model === m
                          ? "border-frogai-primary bg-frogai-primary/10 text-frogai-accent"
                          : "border-frogai-line text-frogai-ink hover:border-frogai-primary/50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <p className="mb-2 mt-5 text-xs font-medium text-frogai-ink-soft">
                  Speed / Quality
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {QUALITIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`relative rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        quality === q
                          ? "border-frogai-primary bg-frogai-primary/10 text-frogai-accent"
                          : "border-frogai-line text-frogai-ink hover:border-frogai-primary/50"
                      }`}
                    >
                      {q}
                      {q === "Extra High" && (
                        <span className="absolute -right-1.5 -top-2 rounded-full bg-frogai-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                          Rec
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="text-sm text-frogai-ink-soft">
                  Ready to render. Your settings:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex justify-between rounded-lg bg-frogai-surface-2/60 px-3 py-2">
                    <span className="text-frogai-ink-soft">Shots</span>
                    <span className="font-semibold text-frogai-ink">{selected.length}</span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-frogai-surface-2/60 px-3 py-2">
                    <span className="text-frogai-ink-soft">Format</span>
                    <span className="font-semibold text-frogai-ink">{fmt.label}</span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-frogai-surface-2/60 px-3 py-2">
                    <span className="text-frogai-ink-soft">Model</span>
                    <span className="font-semibold text-frogai-ink">{model}</span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-frogai-surface-2/60 px-3 py-2">
                    <span className="text-frogai-ink-soft">Quality</span>
                    <span className="font-semibold text-frogai-ink">{quality}</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-frogai-ink-soft">
                  Hit <span className="font-semibold text-frogai-accent">Generate</span> to
                  produce your 4K reel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
