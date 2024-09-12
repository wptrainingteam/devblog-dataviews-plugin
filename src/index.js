import { jsx as _jsx } from "react/jsx-runtime";
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import App from './App';
domReady(function () {
    var container = document.getElementById('add-media-from-third-party-service');
    if (container) {
        var root = createRoot(container);
        root.render(_jsx(App, {}));
    }
    else {
        console.error('Container element not found');
    }
});
