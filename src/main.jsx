import React from "react";
import { createRoot } from "react-dom/client";
import "./design-system.css";
import "./components/components.css";
import {
  Nav,
  Hero,
  RibbitChat,
  Testimonials,
  FAQ,
  FinalCTA,
  Footer,
} from "./components/ui.jsx";

function App() {
  return (
    <>
      <div className="pond-bg" />
      <Nav />
      <main>
        <Hero />
        <RibbitChat />
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
