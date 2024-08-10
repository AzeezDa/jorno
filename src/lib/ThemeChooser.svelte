<script lang="ts">
    import { Theme, current_theme_setting } from "$lib/ThemeChooser";

    interface ThemeData {
        theme: Theme;
        emoji: string;
    }

    let current_theme_index: number = 0;
    export const themes: Array<ThemeData> = [
        { theme: Theme.DARK, emoji: "🌒" },
        { theme: Theme.LIGHT, emoji: "☀️" },
        { theme: Theme.SYSTEM, emoji: "🖥️" },
    ];

    const next_theme = () => {
        current_theme_index = (current_theme_index + 1) % themes.length;
        current_theme_setting.set(themes[current_theme_index].theme);
    };

    $: emoji = themes[current_theme_index].emoji;
</script>

<button
    class="dark:bg-black dark:border-white bg-white border-black
    border-2 border-r-0 p-3 rounded-l-full text-3xl
        fixed z-10 -right-12 bottom-0 hover:right-0 transition-all"
    on:click={next_theme}>{emoji}</button
>
