import { writable } from "svelte/store";

export enum Theme {
    DARK = "dark",
    LIGHT = "light",
    SYSTEM = "system",
}

export const current_theme_setting = writable(Theme.SYSTEM);

current_theme_setting.subscribe((theme: Theme) => {
    if (theme == Theme.DARK || (theme == Theme.SYSTEM && get_prefered_theme() == Theme.DARK)) {
        document.documentElement.classList.add(Theme.DARK);
        return;
    }
    document.documentElement.classList.remove(Theme.DARK);
});


function get_prefered_theme() {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return Theme.DARK;
    }
    return Theme.LIGHT;
}