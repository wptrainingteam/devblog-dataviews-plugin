import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import App from './App';

domReady( () => {
	const container = document.getElementById(
		'add-media-from-third-party-service'
	);

	if ( container ) {
		const root = createRoot( container );
		root.render( <App /> );
	} else {
		console.error( 'Container element not found' );
	}
} );
