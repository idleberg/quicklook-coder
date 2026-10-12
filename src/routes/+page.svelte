<script lang="ts">
	import { browserFile, nativeFile, type QuickLookFile } from 'virtual:quicklook';
	import FileViewer from '$lib/FileViewer.svelte';

	let file = $state<QuickLookFile | undefined>(nativeFile());

	async function open(files: FileList | null | undefined) {
		const picked = files?.[0];
		if (picked) {
			file = await browserFile(picked);
		}
	}
</script>

<!-- Only reachable in the browser: Quick Look always injects a file. -->
<svelte:window
	ondragover={(e) => e.preventDefault()}
	ondrop={(e) => {
		e.preventDefault();
		open(e.dataTransfer?.files);
	}}
/>

{#if file}
	<FileViewer {file} />
{:else}
	<label class="drop">
		Drop a file here, or click to pick one
		<input type="file" hidden onchange={(e) => open(e.currentTarget.files)} />
	</label>
{/if}

<style>
	.drop {
		display: grid;
		place-items: center;
		height: 100vh;
		font: 14px system-ui;
		color: GrayText;
		cursor: pointer;
	}
</style>
