import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";
import Pjax from "pjax";
import NProgress from "nprogress";
import lozad from "lozad";

// Initialize Alpine
window.Alpine = Alpine;
Alpine.start();

// Initialize NProgress
NProgress.configure({ showSpinner: false, minimum: 0.1 });

// Initialize Lozad (Lazy Loading)
const observer = lozad(".lozad", {
  loaded: (el) => {
    el.classList.add("loaded");
  },
});
observer.observe();

// Initialize Pjax
const pjax = new Pjax({
  elements: 'a[href]:not([target="_blank"])',
  selectors: ["title", "#main"],
  cacheBust: false,
  analytics: false,
  scrollRestoration: false, // We'll handle scroll manually for smoother experience if needed
});

// Pjax events for NProgress and Transitions
document.addEventListener("pjax:send", () => {
  NProgress.start();
  const main = document.getElementById("main");
  if (main) {
    main.classList.add("loading");
  }
});

document.addEventListener("pjax:complete", () => {
  NProgress.done();
  const main = document.getElementById("main");
  if (main) {
    main.classList.remove("loading");
    
    // Re-initialize Alpine.js for new content
    // @ts-ignore
    Alpine.initTree(main);

    // Re-initialize Lozad for new content
    observer.observe();
  }
});

document.addEventListener("pjax:error", () => {
  NProgress.done();
  console.error("Pjax error");
});
