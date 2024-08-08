<script lang="ts" context="module">
    export interface Data {
        text: string;
        level: number;
    }
    export function default_header(level: number): Data {
        return { text: "", level: level };
    }
</script>

<script lang="ts">
    import { auto_resize } from "../AutoResize";

    export let data: Data = default_header(1);

    const text_size_map = new Map<number, string>([
        [1, "text-3xl font-extrabold"],
        [2, "text-2xl font-bold"],
        [3, "text-xl font-semibold"],
    ]);

    $: font_size = text_size_map.get(data.level);
</script>

<textarea
    bind:value={data.text}
    class="{font_size} w-full text-black bg-white focus:text-white focus:bg-black transition-all"
    use:auto_resize
    placeholder="Header {data.level}"
/>
