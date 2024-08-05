<script lang="ts">
    import type { PageData } from "./$types";
    import Section from "$lib/Section.svelte";
    import { auto_resize } from "$lib/AutoResize";
    import NewSectionBar from "$lib/NewSectionBar.svelte";
    import { save_jorno } from "$lib/Jorno";
    import { ask } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";

    export let data: PageData;

    let status = "";
    async function save() {
        let return_value = await save_jorno(data);
        if (return_value) {
            status = "Saved at: " + return_value;
        } else {
            status = "Error while saving";
        }
    }

    async function back() {
        let go_back = await ask(
            "Are you sure you want to go back without saving?",
            "Close without saving",
        );
        if (go_back) {
            goto("/");
        }
    }
</script>

<div class="navigation_bar">
    <button on:click={back}>Back</button>
    <button on:click={save}>Save</button>
    <p>{status}</p>
</div>
<textarea
    bind:value={data.name}
    class="name"
    on:input={auto_resize}
    placeholder="Journal Entry Name"
/>
<input type="datetime-local" bind:value={data.date} class="date_input" />
{#if data.sections.length > 0}
    {#each data.sections as s}
        <Section bind:section={s} bind:sections={data.sections} />
    {/each}
{:else}
    <div class="empty_new_section_bar">
        <NewSectionBar bind:sections={data.sections} section={null} />
    </div>
{/if}

<style lang="scss">
    @use "../../../style.scss";
    .date_input {
        border: 0;
        background-color: lightgrey;
        font-size: 1.5em;
    }

    .name {
        @extend .input_default;
        font-weight: 900;
        font-size: 3em;
        height: 1.2em;
        border-bottom: solid black 1px;
    }

    .name:focus {
        border-bottom: solid black 3px;
        margin-bottom: -2px;
    }

    .empty_new_section_bar {
        display: flex;
        justify-content: center;
    }

    .navigation_bar {
        display: flex;
        padding-bottom: 5px;
        margin-bottom: 10px;
        border-bottom: solid 1px;
    }

    .navigation_bar > * {
        margin-left: 5px;
    }
</style>
