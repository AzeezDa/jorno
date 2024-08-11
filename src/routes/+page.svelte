<script lang="ts">
    import {
        currently_editing,
        JORNO_FILE_FILTERS,
        new_jorno,
        open_jorno,
        save_jorno,
    } from "$lib/Jorno";
    import { open } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";
    import Button from "$lib/Components/Button.svelte";
    import logo_full_light from "$lib/img/jornofulllight.svg";
    import logo_full_dark from "$lib/img/jornofulldark.svg";

    async function new_file() {
        const empty_jorno = new_jorno("");
        const save_file_path = await save_jorno(empty_jorno);
        if (save_file_path) {
            currently_editing.set({ path: save_file_path, jorno: empty_jorno });
            goto("/edit");
        }
    }

    async function open_file() {
        const filePath = await open({ filters: JORNO_FILE_FILTERS });

        if (typeof filePath == "string") {
            const jorno = await open_jorno(filePath);
            if (jorno) {
                currently_editing.set({
                    path: filePath,
                    jorno: jorno,
                });
                goto("/edit");
            }
        }
    }
</script>

<img
    src={logo_full_light}
    alt="Jorno Logo"
    class="m-auto w-7/12 mt-10 hidden dark:block"
/>
<img
    src={logo_full_dark}
    alt="Jorno Logo"
    class="m-auto w-7/12 mt-10 dark:hidden"
/>

<div class="flex place-content-center gap-12 text-3xl mt-24">
    <Button click={new_file} class="p-5">New File</Button>
    <Button click={open_file} class="p-5">Open File</Button>
</div>
