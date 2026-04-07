import Alpine from "alpinejs";

interface TypewriterState {
  _timerId: number | null;
  destroy: () => void;
  display: string;
  init: () => void;
  text: string;
}

export function registerTypewriterComponent() {
  Alpine.data(
    "typewriter",
    (text: string = "", speed: number = 50): TypewriterState => ({
      _timerId: null,
      destroy() {
        if (this._timerId !== null) {
          window.clearInterval(this._timerId);
          this._timerId = null;
        }
      },
      display: "",
      init() {
        let index = 0;
        this.display = "";
        const typedSpeed = typeof speed === "number" ? speed : 50;

        this._timerId = window.setInterval(() => {
          if (index < this.text.length) {
            this.display += this.text.charAt(index);
            index += 1;
            return;
          }

          if (this._timerId !== null) {
            window.clearInterval(this._timerId);
            this._timerId = null;
          }
        }, typedSpeed);
      },
      text,
    }),
  );
}
