<script lang="ts" context="module">
    export interface Data {
        text: string;
    }

    export function default_paragraph(): Data {
        return { text: "" };
    }
</script>

<script lang="ts">
    import TextArea from "$lib/Components/TextArea.svelte";

    export let data: Data = { text: "" };
</script>

<TextArea
    bind:value={data.text}
    placeholder="Paragraph..."
/>
