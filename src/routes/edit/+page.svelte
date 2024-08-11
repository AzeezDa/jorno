<script lang="ts">
    import Section from "$lib/Section.svelte";
    import NewSectionBar from "$lib/NewSectionBar.svelte";
    import logo from "$lib/img/jorno.svg";
    import {
        currently_editing,
        save_jorno,
        type CurrentlyEdited,
    } from "$lib/Jorno";
    import { ask } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";
    import BigButton from "$lib/Components/Button.svelte";
    import TextArea from "$lib/Components/TextArea.svelte";

    const STATUS_CLEAR_TIMEOUT_MS: number = 5000;
    const STATUS_CLEAR_CHARACTER_INTERVAL: number = 20;

    let data: CurrentlyEdited = $currently_editing as CurrentlyEdited;

    let status = "";
    let warning_status = false;
    let text_timeout: number | null = null;
    let text_interval: number | null = null;
    async function save() {
        const return_value = await save_jorno(data.jorno);
        if (return_value) {
            status = "Saved at: " + return_value;
            warning_status = false;
        } else {
            status = "The file was not saved!";
            warning_status = true;
        }

        if (text_timeout) {
            clearTimeout(text_timeout);
            clearInterval(text_interval as number);
        }
        text_timeout = setTimeout(() => {
            text_interval = setInterval(() => {
                if (status == "") {
                    clearInterval(text_interval as number);
                    warning_status = false;
                    return;
                }

                // Remove last letter
                status = status.substring(0, status.length - 1);
            }, STATUS_CLEAR_CHARACTER_INTERVAL);
        }, STATUS_CLEAR_TIMEOUT_MS);
    }

    async function back() {
        let go_back = await ask(
            "Are you sure you want to go back without saving?",
            "Close without saving",
        );
        if (go_back) {
            goto("/");
            $currently_editing = null;
        }
    }
</script>

<div
    class="sticky flex top-0 h-20 gap-2 bg-white dark:bg-black mb-6 p-2 pt-1 pb-4 shadow-2xl w-full"
>
    <BigButton click={back} class="p-5">Back</BigButton>
    <BigButton click={save} class="p-5">Save</BigButton>
    <p class:warning_status class="w-screen mt-5 text-black dark:text-white">
        {status}
    </p>
    <img src={logo} alt="Jorno Logo" class="h-20 mr-2" />
</div>
<div class="grid grid-cols-1 pr-5 pl-5">
    <TextArea
        bind:value={data.jorno.name}
        placeholder="Journal Entry Name"
        class="font-extrabold text-5xl"
    />
    <input
        type="datetime-local"
        bind:value={data.jorno.date}
        class="w-1/12 min-w-60 text-2xl
        bg-white text-black focus:bg-black focus:text-white
        dark:bg-black dark:text-white dark:focus:bg-white dark:focus:text-black
        rounded-xl p-1 transition-all"
    />
    {#if data.jorno.sections.length > 0}
        {#each data.jorno.sections as s}
            <Section bind:section={s} bind:sections={data.jorno.sections} />
        {/each}
    {:else}
        <div class="empty_new_section_bar">
            <NewSectionBar bind:sections={data.jorno.sections} section={null} />
        </div>
    {/if}
</div>

<style lang="postcss">
    .warning_status {
        color: theme(colors.red);
        font-weight: theme(fontWeight.extrabold);
    }
</style>
