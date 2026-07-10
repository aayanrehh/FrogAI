import { motion } from "framer-motion";
import { useRef, useState } from "react";

/* ---- Shared motion variants (design-system consistency) ---- */
export const ease = [0.22, 1, 0.36, 1];
export const spring = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/* ---- Reveal: scroll-into-view wrapper ---- */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </M>
  );
}

/* ---- Frog logo mark (original, minimal) ---- */
export function FrogMark({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="frogG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6ff77" />
          <stop offset="1" stopColor="#aef01f" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="13" fill="url(#frogG)" />
      {/* eyes */}
      <circle cx="17" cy="19" r="5.4" fill="#09140a" />
      <circle cx="31" cy="19" r="5.4" fill="#09140a" />
      <circle cx="18.4" cy="17.6" r="1.7" fill="#e6ff77" />
      <circle cx="32.4" cy="17.6" r="1.7" fill="#e6ff77" />
      {/* smile / mouth */}
      <path
        d="M14 31c3 4 17 4 20 0"
        stroke="#09140a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ---- Magnetic button (pointer-tracking tilt) ---- */
export function MagneticButton({ children, className = "", variant = "primary", href = "#", strength = 0.4 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    setPos({ x, y });
  }
  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

/* ---- Section heading block ---- */
export function SectionHeading({ eyebrow, title, lede, align = "left" }) {
  return (
    <Reveal className={`section-head ${align === "center" ? "center" : ""}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="display h2">{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </Reveal>
  );
}
