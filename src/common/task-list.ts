export function initTaskListInteraction() {
  document.querySelectorAll<HTMLElement>('ul[data-type="taskList"] li[data-type="taskItem"]').forEach((item) => {
    const label = item.querySelector<HTMLLabelElement>("label");
    if (!label) {
      return;
    }

    const checkbox = item.querySelector<HTMLInputElement>('input[type="checkbox"]');

    if (checkbox) {
      // Keep the native checkbox as the only semantic and keyboard control.
      label.removeAttribute("role");
      label.removeAttribute("aria-checked");
      label.removeAttribute("aria-disabled");
      label.removeAttribute("aria-label");
      label.removeAttribute("tabindex");
      item.setAttribute("data-checked", String(checkbox.checked));

      if (checkbox.dataset.boundTaskList !== "true") {
        checkbox.dataset.boundTaskList = "true";
        checkbox.addEventListener("change", () => {
          item.setAttribute("data-checked", String(checkbox.checked));
        });
      }

      return;
    }

    if (label.dataset.boundTaskList === "true") {
      return;
    }

    const setChecked = (checked: boolean) => {
      item.setAttribute("data-checked", String(checked));
      label.setAttribute("aria-checked", String(checked));
    };

    const toggleChecked = () => setChecked(item.getAttribute("data-checked") !== "true");

    label.dataset.boundTaskList = "true";
    label.setAttribute("role", "checkbox");
    label.setAttribute("aria-checked", String(item.getAttribute("data-checked") === "true"));
    label.setAttribute("aria-label", label.textContent?.trim() || "Toggle task");
    label.tabIndex = 0;

    label.addEventListener("click", (event) => {
      event.preventDefault();
      toggleChecked();
    });

    label.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggleChecked();
      }
    });
  });
}
