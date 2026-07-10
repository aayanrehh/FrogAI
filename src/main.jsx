import React from "react";
import { createRoot } from "react-dom/client";
import "./design-system.css";
import "./components/components.css";
import {
  Nav,
  Hero,
  LogoMarquee,
  BentoFeatures,
  BeforeAfter,
  RibbitChat,
  Pricing,
  Testimonials,
  FAQ,
  FinalCTA,
  Footer,
} from "./components/ui.jsx";

function App() {
  return (
    <>
      <div className="pond-bg" />
      <div className="pond-blob" />
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <BeforeAfter />
        <RibbitChat />
        <BentoFeatures />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
