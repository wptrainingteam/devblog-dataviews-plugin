import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";

import App from "./App";

domReady(() => {
  const root = createRoot(
    document.getElementById("add-media-from-third-party-service")
  );
  root.render(<App />);
});
