import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		// A static build; the extension serves it and sets the CSP from quicklook.config.ts.
		adapter: adapter(),
		// Builds a client-only app shell, which is all the preview needs.
		router: { type: 'hash' },
	},
};
