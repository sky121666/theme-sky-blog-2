import "./styles/tailwind.css";
import "./styles/main.css";

import { registerFigletFonts } from "./common/figlet-fonts";
import { bootstrapRuntime } from "./common/runtime";
import { registerAsciiTitleComponent } from "./features/ascii-title";
import { registerFileListNavComponent } from "./features/file-list-nav";
import { registerPostViewerComponent } from "./features/post-viewer";
import { registerTerminalInputComponent } from "./features/terminal-input";
import { registerTypewriterComponent } from "./features/typewriter";

registerFigletFonts();
registerAsciiTitleComponent();
registerTypewriterComponent();
registerTerminalInputComponent();
registerFileListNavComponent();
registerPostViewerComponent();

bootstrapRuntime();
