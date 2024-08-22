import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";

const App = () => {
  return (
    <div>
      <p>Our React App</p>
    </div>
  );
};

domReady(() => {
  const root = createRoot(
    document.getElementById("add-media-from-third-party-service")
  );
  root.render(<App />);
});
