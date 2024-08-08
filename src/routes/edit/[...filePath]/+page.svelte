<script lang="ts">
    import type { PageData } from "./$types";
    import Section from "$lib/Section.svelte";
    import { auto_resize } from "$lib/AutoResize";
    import NewSectionBar from "$lib/NewSectionBar.svelte";
    import logo from "$lib/img/jorno.svg";
    import { save_jorno } from "$lib/Jorno";
    import { ask } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";

    const STATUS_CLEAR_TIMEOUT_MS: number = 5000;

    export let data: PageData;

    let status = "";
    let warning_status = false;
    async function save() {
        let return_value = await save_jorno(data);
        if (return_value) {
            status = "Saved at: " + return_value;
            warning_status = false;
        } else {
            status = "The file was not saved!";
            warning_status = true;
        }

        setTimeout(() => {
            status = "";
            warning_status = false;
        }, STATUS_CLEAR_TIMEOUT_MS);
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
    <button on:click={back} class="nav_button">Back</button>
    <button on:click={save} class="nav_button">Save</button>
    <p class:warning_status>{status}</p>
    <img src={logo} alt="Jorno Logo" />
</div>
<textarea
    bind:value={data.name}
    class="name"
    use:auto_resize
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
    @use "/src/style" as *;

    .navigation_bar {
        display: flex;
        gap: 10px;
        position: sticky;
        padding-bottom: 10px;
        background-color: $background_color;
        top: 0;
        button {
            @include clickable_default;
            border-radius: 0;
            width: 5%;
        }

        p {
            width: 95%;
            color: $text_color;
        }

        img {
            width: 3%;
            right: 0;
            top: 0;
        }
    }
    textarea {
        @include input_default;
        font-size: 3em;
        font-weight: 900;
    }

    .date_input {
        @include clickable_default;
        font-size: 1.5em;
        margin: {
            top: 10px;
            bottom: 10px;
        }
    }

    .empty_new_section_bar {
        @include center_content;
    }

    .warning_status {  
        color: $p_red !important;
        font-weight: 900;
    }
</style>
