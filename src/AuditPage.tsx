import { useEffect, useMemo, useState } from "react";
import FrogSupport from "./FrogSupport";

const CAL_URL = "https://cal.com/aayan-rehman-ndvc9i/30min?utm_source=frogai_site&utm_medium=free_audit&utm_campaign=lead_journey_audit";

type Option = { label: string; note: string; risk: number };
type Question = { id: string; eyebrow: string; question: string; options: Option[]; recommendation: string };

const QUESTIONS: Question[] = [
  {
    id: "response",
    eyebrow: "First response",
    question: "How quickly does a new internet lead usually receive a useful reply?",
    options: [
      { label: "Under 5 minutes", note: "Consistent, even outside business hours", risk: 0 },
      { label: "5–15 minutes", note: "Usually fast, but not always", risk: 7 },
      { label: "15–60 minutes", note: "Depends on who sees the alert", risk: 16 },
      { label: "Later that day", note: "Or the next morning", risk: 24 },
    ],
    recommendation: "Connect every inbound source to an immediate, conversational first response with clear escalation rules.",
  },
  {
    id: "followup",
    eyebrow: "Active nurture",
    question: "What happens after a lead does not reply to the first message?",
    options: [
      { label: "Structured 7+ touch plan", note: "Across more than one channel", risk: 0 },
      { label: "Three to six follow-ups", note: "Mostly consistent", risk: 7 },
      { label: "One or two reminders", note: "Then the lead goes quiet", risk: 16 },
      { label: "It depends on the agent", note: "No shared follow-up system", risk: 24 },
    ],
    recommendation: "Build a human-sounding nurture sequence that changes with intent instead of repeating the same check-in.",
  },
  {
    id: "database",
    eyebrow: "Database value",
    question: "How consistently do you re-engage quiet leads and past clients?",
    options: [
      { label: "Always-on campaigns", note: "Segmented by relationship and timing", risk: 0 },
      { label: "A few times a year", note: "Usually around a campaign or event", risk: 8 },
      { label: "Occasionally", note: "When someone remembers", risk: 17 },
      { label: "The database is untouched", note: "Most contacts receive no relevant nurture", risk: 24 },
    ],
    recommendation: "Segment dormant contacts by context, then restart conversations with a specific reason to respond.",
  },
  {
    id: "creative",
    eyebrow: "Listing demand",
    question: "What does your Facebook listing creative usually look like?",
    options: [
      { label: "Video-led campaigns", note: "Multiple hooks and formats per listing", risk: 0 },
      { label: "A mix of photos and video", note: "Quality varies by listing", risk: 6 },
      { label: "Mostly static photos", note: "Little creative testing", risk: 13 },
      { label: "Inconsistent or ad hoc", note: "No repeatable creative system", risk: 19 },
    ],
    recommendation: "Turn each listing into a small creative system: several hooks, a strong first frame, and multiple feed-native cuts.",
  },
  {
    id: "measurement",
    eyebrow: "Attribution",
    question: "Can you see which campaign and follow-up created each appointment?",
    options: [
      { label: "Yes, end to end", note: "Source through appointment or closing", risk: 0 },
      { label: "Partially", note: "Some sources and stages are visible", risk: 7 },
      { label: "Only inside the CRM", note: "Handoffs are difficult to connect", risk: 14 },
      { label: "Mostly manual", note: "Attribution is based on memory", risk: 20 },
    ],
    recommendation: "Define a small shared attribution model so creative, response, nurture, and appointments connect to one journey.",
  },
];

function AuditLogo() {
  return <span className="brand-logo"><img src="/frogai-wordmark.png" alt="FrogAI" /></span>;
}

export default function AuditPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const complete = step >= QUESTIONS.length;

  useEffect(() => {
    document.title = "Free Real Estate Lead Journey Audit | FrogAI";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = "Score your real estate lead response, Facebook ad creative, CRM follow-up, database reactivation, and attribution in five focused questions.";
  }, []);

  const result = useMemo(() => {
    const ranked = QUESTIONS.map((question) => ({ question, risk: answers[question.id]?.risk ?? 0 })).sort((a, b) => b.risk - a.risk);
    const totalRisk = ranked.reduce((sum, item) => sum + item.risk, 0);
    return {
      score: Math.max(18, 100 - totalRisk),
      priorities: ranked.filter((item) => item.risk > 0).slice(0, 3),
    };
  }, [answers]);

  function select(option: Option) {
    const question = QUESTIONS[step];
    setAnswers((current) => ({ ...current, [question.id]: option }));
    window.setTimeout(() => setStep((current) => current + 1), 180);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <main className="audit-page">
      <nav className="audit-nav">
        <a href="/" aria-label="FrogAI home"><AuditLogo /></a>
        <div><a href="/demos">Explore demos</a><a className="button button-ink button-small" href={CAL_URL} target="_blank" rel="noreferrer">Book a strategy call</a></div>
      </nav>

      <section className="audit-page-shell">
        <div className="audit-page-intro">
          <p className="eyebrow"><span /> Five-minute diagnostic</p>
          <h1>Where does your lead journey <em>lose momentum?</em></h1>
          <p>Answer five focused questions. You’ll get an immediate readiness score and a practical priority list for your creative, response, nurture, and attribution workflow.</p>
          <div className="audit-assurance"><span>✓ No email required</span><span>✓ No data uploaded</span><span>✓ Immediate result</span></div>
        </div>

        <div className="audit-tool">
          {!complete ? (
            <>
              <div className="audit-tool-progress">
                <span>Question {step + 1} of {QUESTIONS.length}</span>
                <div><i style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} /></div>
              </div>
              <div className="audit-question" key={QUESTIONS[step].id}>
                <p>{QUESTIONS[step].eyebrow}</p>
                <h2>{QUESTIONS[step].question}</h2>
                <div className="audit-options">
                  {QUESTIONS[step].options.map((option) => (
                    <button type="button" key={option.label} onClick={() => select(option)}>
                      <span><b>{option.label}</b><small>{option.note}</small></span><i>↗</i>
                    </button>
                  ))}
                </div>
                {step > 0 && <button type="button" className="audit-back" onClick={() => setStep((current) => current - 1)}>← Previous question</button>}
              </div>
            </>
          ) : (
            <div className="audit-result">
              <p className="eyebrow"><span /> Your lead journey snapshot</p>
              <div className="audit-result-score"><span>Opportunity readiness</span><b>{result.score}<small>/100</small></b><div><i style={{ width: `${result.score}%` }} /></div></div>
              <h2>{result.score >= 78 ? "Your foundation is strong. Now connect the handoffs." : result.score >= 55 ? "The opportunity is in the gaps between your tools." : "Good leads are carrying too much of the journey themselves."}</h2>
              <div className="audit-priorities">
                {(result.priorities.length ? result.priorities : QUESTIONS.slice(0, 3).map((question) => ({ question, risk: 0 }))).map((item, index) => (
                  <article key={item.question.id}><span>0{index + 1}</span><div><b>{item.question.eyebrow}</b><p>{item.question.recommendation}</p></div></article>
                ))}
              </div>
              <div className="audit-result-actions">
                <a className="button button-green" href={CAL_URL} target="_blank" rel="noreferrer">Review this with FrogAI ↗</a>
                <button type="button" onClick={restart}>Retake the audit</button>
              </div>
              <small className="audit-disclaimer">This diagnostic is a planning tool, not a performance guarantee. A strategy call validates the workflow against your actual lead sources, CRM, and team.</small>
            </div>
          )}
        </div>
      </section>

      <footer className="audit-page-footer"><span>FrogAI · AI agents for the real estate journey</span><a href="/">Return to frogai.app ↗</a></footer>
      <FrogSupport />
    </main>
  );
}
