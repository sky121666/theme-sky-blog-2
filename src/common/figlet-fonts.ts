import figlet from "figlet";

let fontsRegistered = false;
let fontsLoading: Promise<void> | null = null;

export function registerFigletFonts(): Promise<void> {
  if (fontsRegistered) {
    return Promise.resolve();
  }

  if (fontsLoading) {
    return fontsLoading;
  }

  fontsLoading = (async () => {
    const [
      { default: Banner },
      { default: Big },
      { default: Block },
      { default: Doom },
      { default: Lean },
      { default: Mini },
      { default: Script },
      { default: Shadow },
      { default: Slant },
      { default: Small },
      { default: Speed },
      { default: Standard },
    ] = await Promise.all([
      import("figlet/importable-fonts/Banner"),
      import("figlet/importable-fonts/Big"),
      import("figlet/importable-fonts/Block"),
      import("figlet/importable-fonts/Doom"),
      import("figlet/importable-fonts/Lean"),
      import("figlet/importable-fonts/Mini"),
      import("figlet/importable-fonts/Script"),
      import("figlet/importable-fonts/Shadow"),
      import("figlet/importable-fonts/Slant"),
      import("figlet/importable-fonts/Small"),
      import("figlet/importable-fonts/Speed"),
      import("figlet/importable-fonts/Standard"),
    ]);

    const fonts: Array<[string, string]> = [
      ["Standard", Standard],
      ["Banner", Banner],
      ["Big", Big],
      ["Block", Block],
      ["Doom", Doom],
      ["Lean", Lean],
      ["Mini", Mini],
      ["Script", Script],
      ["Shadow", Shadow],
      ["Slant", Slant],
      ["Small", Small],
      ["Speed", Speed],
    ];

    fonts.forEach(([name, font]) => {
      figlet.parseFont(name, font);
    });

    fontsRegistered = true;
  })();

  return fontsLoading;
}
