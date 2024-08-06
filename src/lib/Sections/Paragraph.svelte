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
    on:input={auto_resize}
    class="input"
    placeholder="Paragraph..."
/>

<style lang="scss">
    @use "/src/style" as *;

    .input {
        @include input_default;
        border-left: solid black 1px;
    }

    .input:focus {
        border-left: solid black 3px;
        margin-left: -2px;
    }
</style>
