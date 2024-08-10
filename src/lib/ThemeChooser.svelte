<script lang="ts">
    import {
        get_theme_setting,
        set_theme,
        set_theme_setting,
        Theme,
    } from "$lib/ThemeChooser";
    import { onMount } from "svelte";

    interface ThemeData {
        theme: Theme;
        emoji: string;
    }

    export const themes: Array<ThemeData> = [
        { theme: Theme.DARK, emoji: "🌒" },
        { theme: Theme.LIGHT, emoji: "☀️" },
        { theme: Theme.SYSTEM, emoji: "🖥️" },
    ];
    let current_theme_index: number = 0;
    onMount(async () => {
        const theme: Theme = await get_theme_setting();
        set_theme(theme);
        current_theme_index = themes.findIndex(
            (theme_data: ThemeData) => theme == theme_data.theme,
        );
    });

    $: emoji = themes[current_theme_index].emoji;

    const next_theme = () => {
        current_theme_index = (current_theme_index + 1) % themes.length;
        set_theme_setting(themes[current_theme_index].theme);
    };
</script>

<button
    class="dark:bg-black dark:border-white bg-white border-black
    border-2 border-r-0 p-3 rounded-l-full text-3xl
        fixed z-10 -right-12 bottom-0 hover:right-0 transition-all"
    on:click={next_theme}>{emoji}</button
>
