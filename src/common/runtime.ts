import Alpine from "alpinejs";
import lozad from "lozad";
import Pjax from "pjax";

import { logError } from "./logger";
import { setPjaxInstance } from "./navigation";
import { syncHaloDataFromDocument, updateSeoMeta } from "./page-data";
import { initTaskListInteraction } from "./task-list";

let observer: ReturnType<typeof lozad> | null = null;

function initLazyLoading() {
  observer = lozad(".lozad", {
    loaded: (element) => {
      element.classList.add("loaded");
    },
  });

  observer.observe();
}

function createPjaxInstance() {
  const instance = new Pjax({
    analytics: false,
    cacheBust: false,
    elements:
      'a[href]:not([target="_blank"]):not([data-pjax="false"]):not([href^="javascript:"]):not([href^="/login"]):not([href^="/signup"]):not([href^="/password-reset"]):not([href^="/logout"])',
    scrollRestoration: false,
    selectors: ["title", "#main"],
  });

  setPjaxInstance(instance);
}

function bindGlobalEvents() {
  document.addEventListener("pjax:send", () => {
    const main = document.getElementById("main");
    if (main) {
      main.classList.add("loading");
    }
  });

  document.addEventListener("pjax:complete", () => {
    const main = document.getElementById("main");

    syncHaloDataFromDocument();
    updateSeoMeta();

    if (main) {
      main.classList.remove("loading");
      Alpine.initTree(main);
      observer?.observe();
      main.scrollTo({ top: 0 });
    }

    initTaskListInteraction();
  });

  document.addEventListener("pjax:error", () => {
    logError("Pjax navigation failed.");
  });
}

export function bootstrapRuntime() {
  syncHaloDataFromDocument();

  window.Alpine = Alpine;
  Alpine.start();

  initLazyLoading();
  createPjaxInstance();
  bindGlobalEvents();
  initTaskListInteraction();
}
