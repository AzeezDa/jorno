<script lang="ts" context="module">
    export interface Data {
        text: string;
    }

    export function default_paragraph(): Data {
        return { text: "" };
    }
</script>

<script lang="ts">
    import { auto_resize } from "$lib/AutoResize";

    export let data: Data = { text: "" };
</script>

<textarea
    bind:value={data.text}
    use:auto_resize
    class="w-full bg-white text-black p-1 focus:text-white focus:bg-black focus:outline-none transition-all"
    placeholder="Paragraph..."
/>
