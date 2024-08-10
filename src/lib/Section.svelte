<script lang="ts">
    import type { Section } from "$lib/Jorno";
    import BigButton from "./Components/Button.svelte";
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

<div class="section group">
    {#if section.type == "Header"}
        <Header bind:data={section.data} />
    {/if}
    {#if section.type == "Image"}
        <Image bind:data={section.data} />
    {/if}
    {#if section.type == "Paragraph"}
        <Paragraph bind:data={section.data} />
    {/if}
    <div class="flex pb-5 justify-center gap-x-32 gap-y-2 flex-wrap scale-y-0 h-0 group-hover:scale-y-100 group-hover:h-auto transition-all ease-in-out">
        <NewSectionBar bind:sections bind:section />
        <BigButton version={2} click={removeSelf} class="p-1">Remove</BigButton>
    </div>
</div>