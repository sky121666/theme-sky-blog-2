export function initTaskListInteraction() {
  document.querySelectorAll<HTMLElement>('ul[data-type="taskList"] li[data-type="taskItem"]').forEach((item) => {
    const label = item.querySelector<HTMLLabelElement>("label");
    if (!label || label.dataset.boundTaskList === "true") {
      return;
    }

    label.dataset.boundTaskList = "true";
    label.addEventListener("click", (event) => {
      event.preventDefault();

      const listItem = label.closest<HTMLElement>('li[data-type="taskItem"]');
      if (!listItem) {
        return;
      }

      const isChecked = listItem.getAttribute("data-checked") === "true";
      listItem.setAttribute("data-checked", isChecked ? "false" : "true");

      const checkbox = listItem.querySelector<HTMLInputElement>('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !isChecked;
      }
    });
  });
}
