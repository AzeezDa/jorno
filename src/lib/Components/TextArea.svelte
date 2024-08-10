<script lang="ts">
    import { auto_resize } from "$lib/AutoResize";

    export let value: string = "";
    export let placeholder: string = "";
</script>

<textarea
    bind:value
    class="w-full text-black bg-white focus:text-white focus:bg-black
    dark:text-white dark:bg-black dark:focus:text-black dark:focus:bg-white
    transition-all {$$restProps.class}"
    use:auto_resize
    {placeholder}
/>
