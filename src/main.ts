import "./styles/tailwind.css";
import "./styles/main.css";

import { bootstrapRuntime } from "./common/runtime";
import { registerAsciiTitleComponent } from "./features/ascii-title";
import { registerFileListNavComponent } from "./features/file-list-nav";
import { registerPostViewerComponent } from "./features/post-viewer";
import { registerTerminalInputComponent } from "./features/terminal-input";
import { registerTypewriterComponent } from "./features/typewriter";

registerAsciiTitleComponent();
registerTypewriterComponent();
registerTerminalInputComponent();
registerFileListNavComponent();
registerPostViewerComponent();

bootstrapRuntime();
