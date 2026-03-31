import figlet from "figlet";

import Banner from "figlet/importable-fonts/Banner";
import Big from "figlet/importable-fonts/Big";
import Block from "figlet/importable-fonts/Block";
import Doom from "figlet/importable-fonts/Doom";
import Lean from "figlet/importable-fonts/Lean";
import Mini from "figlet/importable-fonts/Mini";
import Script from "figlet/importable-fonts/Script";
import Shadow from "figlet/importable-fonts/Shadow";
import Slant from "figlet/importable-fonts/Slant";
import Small from "figlet/importable-fonts/Small";
import Speed from "figlet/importable-fonts/Speed";
import Standard from "figlet/importable-fonts/Standard";

let fontsRegistered = false;

export function registerFigletFonts() {
  if (fontsRegistered) {
    return;
  }

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
}
