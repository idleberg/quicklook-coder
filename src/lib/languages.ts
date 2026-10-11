// Maps file extensions to every language twinkleplop ships, see
// https://twinkleplop.pngwn.at/docs/languages-ref
// After editing, rerun: node scripts/languages.ts
import { language as bash } from '@twinkleplop/bash';
import { language as c } from '@twinkleplop/c';
import { language as cpp } from '@twinkleplop/cpp';
import { language as css } from '@twinkleplop/css';
import { language as diff } from '@twinkleplop/diff';
import { language as dockerfile } from '@twinkleplop/dockerfile';
import { language as dotenv } from '@twinkleplop/dotenv';
import { language as go } from '@twinkleplop/go';
import { language as graphql } from '@twinkleplop/graphql';
import { language as html } from '@twinkleplop/html';
import { language as http } from '@twinkleplop/http';
import { language as ini } from '@twinkleplop/ini';
import { language as javascript } from '@twinkleplop/javascript';
import { language as json } from '@twinkleplop/json';
import { language as jsonc } from '@twinkleplop/jsonc';
import { language as markdown } from '@twinkleplop/markdown';
import { language as powershell } from '@twinkleplop/powershell';
import { language as python } from '@twinkleplop/python';
import { language as rust } from '@twinkleplop/rust';
import { language as shellsession } from '@twinkleplop/shellsession';
import { language as sql } from '@twinkleplop/sql';
import { language as svelte } from '@twinkleplop/svelte';
import { language as toml } from '@twinkleplop/toml';
import { language as tsx } from '@twinkleplop/tsx';
import { language as typescript } from '@twinkleplop/typescript';
import { language as yaml } from '@twinkleplop/yaml';

export const extensions: Record<string, () => (input: string) => string> = {
	bash,
	c,
	'c++': cpp,
	cc: cpp,
	cjs: javascript,
	cpp,
	css,
	cts: typescript,
	cxx: cpp,
	diff,
	dockerfile,
	// A bare .env has no extension to claim, see the readme.
	env: dotenv,
	go,
	gql: graphql,
	graphql,
	h: c,
	hh: cpp,
	hpp: cpp,
	htm: html,
	html,
	http,
	hxx: cpp,
	ini,
	js: javascript,
	json,
	jsonc,
	markdown,
	md: markdown,
	mjs: javascript,
	mts: typescript,
	patch: diff,
	ps1: powershell,
	psd1: powershell,
	psm1: powershell,
	py: python,
	pyi: python,
	rest: http,
	rs: rust,
	sh: bash,
	'sh-session': shellsession,
	sql,
	svelte,
	toml,
	ts: typescript,
	tsx,
	yaml,
	yml: yaml
};
