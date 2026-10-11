// Works out which UTIs to claim for the extensions in src/lib/languages.ts and
// writes src/lib/types.json. Rerun after editing that list: node scripts/languages.ts
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { extensions } from '../src/lib/languages.ts';

const bundleId = 'com.idleberg.QuickLookDev';
// Claiming these would make the preview the fallback for every text file.
const abstractTypes = new Set([
	'public.text',
	'public.plain-text',
	'public.utf8-plain-text',
	'public.source-code',
	'public.script',
	'public.data'
]);
// macOS types .ts and .mts as video, and an app can't override a system type,
// so the preview claims these too and FileViewer.svelte spots actual video files.
const videoTypes = ['public.mpeg-2-transport-stream', 'public.avchd-mpeg-2-transport-stream'];
// Descriptions for extensions macOS doesn't know, which get a type declared here.
const names: Record<string, string> = {
	cjs: 'CommonJS',
	dockerfile: 'Dockerfile',
	env: 'dotenv',
	gql: 'GraphQL',
	graphql: 'GraphQL',
	http: 'HTTP Request',
	jsonc: 'JSON with Comments',
	ps1: 'PowerShell',
	psd1: 'PowerShell Data',
	psm1: 'PowerShell Module',
	pyi: 'Python Stub',
	rest: 'HTTP Request',
	'sh-session': 'Shell Session'
};

// Extensions macOS already knows as text keep their system type; the rest get one declared here.
const swift = `import UniformTypeIdentifiers
for ext in CommandLine.arguments.dropFirst() {
	if let type = UTType(filenameExtension: ext), !type.isDynamic, type.conforms(to: .text) || [${videoTypes.map((t) => `"${t}"`).join(', ')}].contains(type.identifier) {
		print("\\(ext)\\t\\(type.identifier)")
	}
}`;
const system = new Map(
	execFileSync('swift', ['-', ...Object.keys(extensions)], { input: swift, encoding: 'utf8' })
		.trim()
		.split('\n')
		.map((line) => line.split('\t') as [string, string])
		// Types from a registered build of this or an earlier preview aren't the system's.
		.filter(([, type]) => !abstractTypes.has(type) && !type.toLowerCase().startsWith('com.idleberg.'))
);

const declared = Object.keys(extensions).filter((extension) => !system.has(extension));
const missing = declared.filter((extension) => !names[extension]);
if (missing.length) {
	throw new Error(`Add a description for ${missing.join(', ')} to scripts/languages.ts`);
}
const types = [
	...new Set(system.values()),
	...declared.map((extension) => ({
		id: `${bundleId}.${extension}`,
		description: `${names[extension]} Source`,
		extensions: [extension],
		conformsTo: ['public.source-code']
	}))
].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

writeFileSync('src/lib/types.json', `${JSON.stringify(types, null, '\t')}\n`);
console.log(`${Object.keys(extensions).length} extensions, ${types.length} types`);
