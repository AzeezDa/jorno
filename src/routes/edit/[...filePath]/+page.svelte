<script lang="ts">
    import type { PageData } from "./$types";
    import Section from "$lib/Section.svelte";
    import { auto_resize } from "$lib/AutoResize";
    import NewSectionBar from "$lib/NewSectionBar.svelte";
    import logo from "$lib/img/jorno.svg";
    import { save_jorno } from "$lib/Jorno";
    import { ask } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";
    import BigButton from "$lib/Components/BigButton.svelte";

    const STATUS_CLEAR_TIMEOUT_MS: number = 5000;
    const STATUS_CLEAR_CHARACTER_INTERVAL: number = 20;

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
            const interval = setInterval(() => {
                if (status == "") {
                    clearInterval(interval);
                    warning_status = false;
                    return;
                }
                
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
        }
    }
</script>

<div
    class="sticky flex top-0 h-20 gap-2 bg-white mb-6 p-2 pt-1 pb-4 shadow-2xl w-full"
>
    <BigButton click={back}>Back</BigButton>
    <BigButton click={save}>Save</BigButton>
    <p class:warning_status class="w-screen mt-5">{status}</p>
    <img src={logo} alt="Jorno Logo" class="h-20 mr-2" />
</div>
<div class="grid grid-cols-1 pr-5 pl-5">
    <textarea
        bind:value={data.name}
        use:auto_resize
        class="font-extrabold text-5xl bg-white text-black focus:bg-black focus:text-white transition-all"
        placeholder="Journal Entry Name"
    />
    <input
        type="datetime-local"
        bind:value={data.date}
        class="w-1/12 min-w-60 text-2xl bg-white text-black focus:bg-black focus:text-white rounded-xl p-1 transition-all"
    />
    {#if data.sections.length > 0}
        {#each data.sections as s}
            <Section bind:section={s} bind:sections={data.sections} />
        {/each}
    {:else}
        <div class="empty_new_section_bar">
            <NewSectionBar bind:sections={data.sections} section={null} />
        </div>
    {/if}
</div>

<style lang="postcss">
    .warning_status {
        color: theme(colors.red);
        font-weight: theme(fontWeight.extrabold);
    }
</style>
