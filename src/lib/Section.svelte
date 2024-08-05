<script lang="ts">
    import type { Section } from "$lib/Jorno";
    import NewSectionBar from "./NewSectionBar.svelte";
    import Header from "./Sections/Header.svelte";
    import Image from "./Sections/Image.svelte";
    import Paragraph from "./Sections/Paragraph.svelte";

    export let section: Section;
    export let sections: Array<Section>;

    function removeSelf() {
        sections = sections.filter((s) => s.id != section.id);
    }
</script>

<div class="section">
    {#if section.type == "Header"}
        <Header bind:data={section.data} />
    {/if}
    {#if section.type == "Image"}
        <Image bind:data={section.data} />
    {/if}
    {#if section.type == "Paragraph"}
        <Paragraph bind:data={section.data} />
    {/if}
    <div class="edit_bar">
        <button on:click={removeSelf} class="remove_button">Remove</button>
        <NewSectionBar bind:sections bind:section />
    </div>
</div>

<style>
    .edit_bar {
        display: none;
        justify-content: center;
    }

    .section:hover > .edit_bar {
        display:flex;
    }

    .remove_button {
        margin-right: 50px;
        background-color: red;
    }
</style>
