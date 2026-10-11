import { sveltekit } from '@sveltejs/kit/vite';
import { quicklook } from 'quicklook-kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), quicklook()],
});
