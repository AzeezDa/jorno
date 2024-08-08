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
</script>

<textarea
    bind:value={data.text}
    class="header_{data.level}"
    use:auto_resize
    placeholder="Header {data.level}"
/>

<style lang="scss">
    @use "/src/style" as *;
    $header_font_sizes_weights:
        "1" 2em 900,
        "2" 1.5em bold,
        "3" 1.25em bold;

    @each $level, $font_size, $font_weight in $header_font_sizes_weights {
        .header_#{$level} {
            @include input_default;
            font-weight: $font_weight;
            font-size: $font_size;
            height: 1.2em;
        }
    }
</style>
