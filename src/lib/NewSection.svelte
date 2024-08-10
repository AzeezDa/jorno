<script lang="ts">
    import BigButton from "./Components/Button.svelte";
    import type { Section } from "./Jorno";

    export let sections: Array<Section>;
    export let after: Section | null;
    export let type: string;
    export let default_data: any;
    export let text: string;

    function addSection(section_type: string, data: any) {
        const index = after ? sections.indexOf(after) : -1;

        let max_id = 0;
        sections.forEach((section) => {
            max_id = Math.max(max_id, section.id);
        });

        sections.splice(index + 1, 0, {
            id: max_id + 1,
            type: section_type,
            data: data,
        });

        sections = sections; // To trigger Svelte's reactivity
    }
</script>

<BigButton click={() => addSection(type, default_data)} class="p-1">+{text}</BigButton>
