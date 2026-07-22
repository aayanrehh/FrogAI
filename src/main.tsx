import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AuditPage from "./AuditPage.tsx";
import DemosPage from "./DemosPage.tsx";
import "./index.css";

const Page = window.location.pathname.startsWith("/demos")
  ? DemosPage
  : window.location.pathname.startsWith("/audit")
    ? AuditPage
    : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
