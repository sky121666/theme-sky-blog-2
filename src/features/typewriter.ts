import Alpine from "alpinejs";

interface TypewriterState {
  display: string;
  init: () => void;
  text: string;
}

export function registerTypewriterComponent() {
  Alpine.data(
    "typewriter",
    (text: string = "", speed: number = 50): TypewriterState => ({
      display: "",
      init() {
        let index = 0;
        this.display = "";
        const typedSpeed = typeof speed === "number" ? speed : 50;

        const timer = window.setInterval(() => {
          if (index < this.text.length) {
            this.display += this.text.charAt(index);
            index += 1;
            return;
          }

          window.clearInterval(timer);
        }, typedSpeed);
      },
      text,
    }),
  );
}
