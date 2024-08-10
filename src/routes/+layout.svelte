<script lang="ts">
    import "../style.css";
    import ThemeChooser from "$lib/ThemeChooser.svelte";
</script>

<ThemeChooser />

<slot />

<style lang="postcss">
    :global(body) {
        @apply bg-white dark:bg-black transition-all;
    }
</style>
