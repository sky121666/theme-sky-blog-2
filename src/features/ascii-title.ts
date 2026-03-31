import Alpine from "alpinejs";
import figlet from "figlet";

interface AsciiTitleState {
  asciiArt: string;
  font: string;
  init: () => void;
  title: string;
}

export function registerAsciiTitleComponent() {
  Alpine.data(
    "asciiTitle",
    (title: string = "", font: string = "Standard"): AsciiTitleState => ({
      asciiArt: "",
      font,
      init() {
        if (!this.title) {
          return;
        }

        figlet.text(
          this.title,
          {
            font: this.font || "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
          },
          (error, result) => {
            if (!error && result) {
              this.asciiArt = result;
            }
          },
        );
      },
      title,
    }),
  );
}
