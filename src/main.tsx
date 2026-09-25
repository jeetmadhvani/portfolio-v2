import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  autoRaf: true,
  anchors: false,
  allowNestedScroll: true,
});



lenis.on("scroll", ScrollTrigger.update);

// Keep Lenis + ScrollTrigger in sync after viewport changes
window.addEventListener("resize", () => {
  requestAnimationFrame(() => {
    lenis.resize();
    ScrollTrigger.refresh();
  });
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);