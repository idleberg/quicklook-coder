// Each twinkleplop theme is only `--twp-*` properties on :root, so the chosen
// pair can go into one <style>, with the dark one behind a media query.
import atomOneDark from '@twinkleplop/theme-atom-one/dark?inline';
import atomOneLight from '@twinkleplop/theme-atom-one/light?inline';
import ayuDark from '@twinkleplop/theme-ayu/dark?inline';
import ayuLight from '@twinkleplop/theme-ayu/light?inline';
import catppuccinDark from '@twinkleplop/theme-catppuccin/dark?inline';
import catppuccinLight from '@twinkleplop/theme-catppuccin/light?inline';
import githubDark from '@twinkleplop/theme-github/dark?inline';
import githubLight from '@twinkleplop/theme-github/light?inline';
import materialDark from '@twinkleplop/theme-material/dark?inline';
import materialLight from '@twinkleplop/theme-material/light?inline';
import nightOwlDark from '@twinkleplop/theme-night-owl/dark?inline';
import nightOwlLight from '@twinkleplop/theme-night-owl/light?inline';
import rosePineDark from '@twinkleplop/theme-rose-pine/dark?inline';
import rosePineLight from '@twinkleplop/theme-rose-pine/light?inline';
import solarizedDark from '@twinkleplop/theme-solarized/dark?inline';
import solarizedLight from '@twinkleplop/theme-solarized/light?inline';
import { settings } from 'virtual:quicklook';

const themes: Record<string, [light: string, dark: string]> = {
	'atom-one': [atomOneLight, atomOneDark],
	ayu: [ayuLight, ayuDark],
	catppuccin: [catppuccinLight, catppuccinDark],
	github: [githubLight, githubDark],
	material: [materialLight, materialDark],
	'night-owl': [nightOwlLight, nightOwlDark],
	'rose-pine': [rosePineLight, rosePineDark],
	solarized: [solarizedLight, solarizedDark],
};

/** The user's light and dark themes as one stylesheet; Catppuccin if unknown. */
export function themeCss() {
	const { lightTheme, darkTheme } = settings() as { lightTheme: string; darkTheme: string };
	const [light] = themes[lightTheme] ?? themes.catppuccin;
	const [, dark] = themes[darkTheme] ?? themes.catppuccin;
	return `${light}\n@media (prefers-color-scheme: dark) {\n${dark}\n}`;
}
