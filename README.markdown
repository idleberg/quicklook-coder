# quicklook-dev

> A macOS QuickLook plugin that highlights source code with [twinkleplop](https://twinkleplop.pngwn.at)

Built with [quicklook-kit](https://www.npmjs.com/package/quicklook-kit) and SvelteKit.

## Installation

```sh
brew install idleberg/asahi/quicklook-dev
```

## Development

### Requirements

- macOS 14 or later, with Xcode installed
- [mise](https://mise.jdx.dev), which installs Node, pnpm and XcodeGen

```sh
mise trust
mise install
```

### Theme

The preview uses Catppuccin Latte, and Mocha when the system is in dark mode. To change it, install another [twinkleplop theme](https://twinkleplop.pngwn.at/docs/themes) and update the imports in `src/lib/theme.css`.

### Usage

```sh
pnpm dev        # drop a file on the page to preview it
pnpm register   # build, install to /Applications and register with QuickLook
pnpm unregister
```

### Languages

Every language [twinkleplop ships](https://twinkleplop.pngwn.at/docs/languages-ref): **Bash, C, C++, CSS, Diff, Dockerfile, dotenv, Go, GraphQL, HTML, HTTP, INI, JavaScript, JSON, JSONC, Markdown, PowerShell, Python, Rust, Shell session, SQL, Svelte, TOML, TSX, TypeScript** and **YAML**.

QuickLook picks a preview by file extension, so files without one can't be claimed: a bare `.env` or `Dockerfile` keeps the system preview, while `production.env` or `app.dockerfile` get highlighted.

HTML files show their highlighted source instead of the system's rendered page.

Files over 500 KB get QuickLook's generic preview.

macOS types `.ts` and `.mts` as MPEG transport stream video, so the preview claims those types too. Actual video files get a notice instead of their bytes, and lose the system's video preview.

The extension list lives in `src/lib/languages.ts`. `scripts/languages.ts` works out which file types to claim and writes `src/lib/types.json`: extensions macOS already knows as text keep their system type, the rest get a type declared by the app. After editing the list:

```sh
node scripts/languages.ts
```

## License

This work is licensed under [The MIT License](LICENSE).
