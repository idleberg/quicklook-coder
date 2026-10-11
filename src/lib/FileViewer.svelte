<!--
	Highlights the file with the twinkleplop language its extension maps to, see
	languages.ts. Its grammars compile to plain JavaScript state machines: no
	regexes to compile on first use and no WebAssembly, which the page's CSP
	would block.
-->
<script lang="ts" module>
	import { extensions } from './languages.ts';
	import './theme.css';
</script>

<script lang="ts">
	import type { QuickLookFile } from 'virtual:quicklook';

	let { file }: { file: QuickLookFile } = $props();

	const text = $derived(new TextDecoder().decode(file.bytes));
	// .ts is also MPEG transport stream video: 188-byte packets, each starting with 0x47.
	const video = $derived(
		['ts', 'mts'].includes(file.extension) &&
			file.bytes[0] === 0x47 &&
			(file.bytes.length <= 188 || file.bytes[188] === 0x47)
	);
	const highlight = $derived(extensions[file.extension]?.());
</script>

{#if video}
	<pre class="twinkleplop">This looks like an MPEG transport stream video, not TypeScript.</pre>
{:else if highlight}
	<!-- twinkleplop escapes the source, so the untrusted file can't inject markup. -->
	{@html highlight(text)}
{:else}
	<pre class="twinkleplop">{text}</pre>
{/if}

<style>
	:global(body) {
		margin: 0;
		background: var(--twp-background);
	}

	:global(.twinkleplop) {
		margin: 0;
		padding: 1rem;
		color: var(--twp-identifier);
		font:
			12px ui-monospace,
			monospace;
		white-space: pre-wrap;
	}
</style>
