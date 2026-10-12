import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { quicklook } from 'quicklook-kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			// A static build; the extension serves it and sets the CSP from quicklook.config.ts.
			adapter: adapter(),

			// Builds a client-only app shell, which is all the preview needs.
			router: { type: 'hash' },
		}),
		quicklook(),
	],
});
