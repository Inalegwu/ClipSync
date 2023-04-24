import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import { App } from "./App";
import Settings from "./pages/Settings";
import About from "./pages/About";

createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
