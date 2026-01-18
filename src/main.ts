import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";
import Pjax from "pjax";
import NProgress from "nprogress";
import lozad from "lozad";

// Typewriter Effect Component
Alpine.data("typewriter", (text = "", speed = 50) => ({
  text: text,
  display: "",
  init() {
    let i = 0;
    this.display = "";
    const timer = setInterval(() => {
      if (i < this.text.length) {
        this.display += this.text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  },
}));

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
  scrollRestoration: false,
});

// Sound Effects (Simulated)
const playKeystroke = () => {
  // Ideally, use Web Audio API here.
  // For now, we keep it silent as requested resources are limited.
};

document.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON") {
    playKeystroke();
  }
});

// Pjax events
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
    
    // Re-initialize Alpine.js
    // @ts-ignore
    Alpine.initTree(main);

    // Re-initialize Lozad
    observer.observe();

    // Scroll to top with "smooth" behavior (Terminal style jump)
    window.scrollTo(0, 0);
  }
});

document.addEventListener("pjax:error", () => {
  NProgress.done();
  console.error("Pjax error");
});
