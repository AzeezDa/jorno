import { configuration } from "./Configuration";

export enum Theme {
    SYSTEM = "system",
    DARK = "dark",
    LIGHT = "light"
}

const THEME_CONFIGURATION_KEY: string = "theme";
const DEFAULT_THEME_SETTING: Theme = Theme.SYSTEM;

export async function set_theme_setting(theme: Theme) {
    await configuration.set(THEME_CONFIGURATION_KEY, theme);

    set_theme(theme);
}

export async function get_theme_setting(): Promise<Theme> {
    const theme = await configuration.get<Theme>(THEME_CONFIGURATION_KEY);

    if (theme) {
        return theme;
    }

    await set_theme_setting(DEFAULT_THEME_SETTING);
    return DEFAULT_THEME_SETTING;
}

export function set_theme(theme: Theme) {
    const get_prefered_theme = () => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            return Theme.DARK;
        }
        return Theme.LIGHT;
    };

    if (theme == Theme.DARK || (theme == Theme.SYSTEM && get_prefered_theme() == Theme.DARK)) {
        document.documentElement.classList.add(Theme.DARK);
        return;
    }
    document.documentElement.classList.remove(Theme.DARK);
}