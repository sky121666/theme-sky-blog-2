import Alpine from "alpinejs";
import figlet from "figlet";

import { registerFigletFonts } from "../common/figlet-fonts";

interface AsciiTitleState {
  asciiArt: string;
  font: string;
  init: () => Promise<void>;
  title: string;
}

export function registerAsciiTitleComponent() {
  Alpine.data(
    "asciiTitle",
    (title: string = "", font: string = "Standard"): AsciiTitleState => ({
      asciiArt: "",
      font,
      async init() {
        if (!this.title) {
          return;
        }

        await registerFigletFonts();

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
