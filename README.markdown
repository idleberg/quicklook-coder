# quicklook-coder

[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/quicklook-coder/ci.yml?style=for-the-badge)](https://github.com/idleberg/quicklook-coder/actions)
[![Version](https://img.shields.io/github/v/release/idleberg/quicklook-coder?style=for-the-badge)](https://github.com/idleberg/quicklook-coder/releases)

> A macOS Quick Look plugin that highlights source code with [Twinkleplop](https://twinkleplop.pngwn.at)

Built with [quicklook-kit](https://www.npmjs.com/package/quicklook-kit) and SvelteKit.

## Installation

### macOS

The easiest way to install the plugin is via my own Homebrew tap:

```sh
brew install idleberg/asahi/quicklook-coder
```

> [!IMPORTANT]
> To register the plugin, you need to launch `Quick Look Coder.app` once after installation. The app is signed ad hoc, so you have to allow it in System Settings → Privacy & Security on first launch.

### Windows

Download the latest `*-windows.qlplugin` from the [releases](https://github.com/idleberg/quicklook-coder/releases), select it in Explorer and press <kbd>Space</kbd> to preview it in QuickLook, then click the install button and restart QuickLook. The preview needs the Microsoft Edge WebView2 Runtime, which ships with Windows 11.

## Themes

Pick a light and a dark theme in the app's Settings tab. The preview follows the system appearance and defaults to Catppuccin. Changes apply to the next preview.

Available themes: **Atom One**, **Ayu**, **Catppuccin**, **GitHub**, **Material**, **Night Owl**, **Rosé Pine** and **Solarized**.

Line numbers can be turned on in the same tab.

## Development

### Requirements

- macOS 14 or later, with Xcode installed
- [mise](https://mise.jdx.dev), which installs Node, pnpm and XcodeGen

```sh
mise trust
mise install
```

### Usage

```sh
pnpm dev        # drop a file on the page to preview it
pnpm register   # build, install to /Applications and register with Quick Look
pnpm unregister
```

### Languages

Every language [Twinkleplop ships](https://twinkleplop.pngwn.at/docs/languages-ref): **Bash**, **C**, **C++**, **CSS**, **Diff**, **Dockerfile**, **dotenv**, **Go**, **GraphQL**, **HTML**, **HTTP**, **INI**, **JavaScript**, **JSON**, **JSONC**, **Markdown**, **PowerShell**, **Python**, **Rust**, **Shell session**, **SQL**, **Svelte**, **TOML**, **TSX**, **TypeScript** and **YAML**.

Quick Look picks a preview by file extension, so files without one can't be claimed: a bare `.env` or `Dockerfile` keeps the system preview, while `production.env` or `app.dockerfile` get highlighted.

HTML files show their highlighted source instead of the system's rendered page.

Files over 500 KB get Quick Look's generic preview.

macOS types `.ts` and `.mts` as MPEG transport stream video, so the preview claims those types too. Actual video files get a notice instead of their bytes, and lose the system's video preview.

The extension list lives in `src/lib/languages.ts`. `scripts/languages.ts` works out which file types to claim and writes `src/lib/types.json`: extensions macOS already knows as text keep their system type, the rest get a type declared by the app. After editing the list:

```sh
node scripts/languages.ts
```

### Why Twinklepop?

Popular highlighters like [Shiki](https://shiki.style/) or [Prism](https://prismjs.com/) might support more languages, but Twinkleplop is an order of magnitude faster. Quick Look previews should feel instant, and with Twinkleplop most source files appear almost as soon as you press space; extremely large files may take longer.

## License

This work is licensed under [The MIT License](LICENSE).
