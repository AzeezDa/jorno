<script lang="ts">
    import NewSection from "./NewSection.svelte";
    import type { Section } from "./Jorno";
    import { default_header } from "./Sections/Header.svelte";
    import { default_image } from "./Sections/Image.svelte";
    import { default_paragraph } from "./Sections/Paragraph.svelte";

    export let sections: Array<Section>;
    export let section: Section | null;
</script>

<div>
    {#each { length: 3 } as _, i}
        <NewSection
            bind:sections
            bind:after={section}
            type="Header"
            text="Header{i + 1}"
            default_data={default_header(i + 1)}
        />
    {/each}
    <NewSection
        bind:sections
        bind:after={section}
        type="Image"
        text="Image"
        default_data={default_image()}
    />
    <NewSection
        bind:sections
        bind:after={section}
        type="Paragraph"
        text="Paragraph"
        default_data={default_paragraph()}
    />
</div>

<style>
    div {
        display: flex;
        gap: 10px;
    }
</style>
