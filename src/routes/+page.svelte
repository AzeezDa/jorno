<script lang="ts">
    import { JORNO_FILE_FILTERS, new_jorno, save_jorno } from "$lib/Jorno";
    import { open } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";
    import Button from "$lib/Components/BigButton.svelte";
    import logo_full_light from "$lib/img/jornofulllight.svg";
    import logo_full_dark from "$lib/img/jornofulldark.svg";

    async function new_file() {
        let empty_jorno = new_jorno("");
        let save_file_path = await save_jorno(empty_jorno);
        if (save_file_path) {
            goto("/edit/" + save_file_path);
        }
    }

    async function open_file() {
        const filePath = await open({ filters: JORNO_FILE_FILTERS });

        if (typeof filePath == "string") {
            goto("/edit/" + filePath);
        }
    }
</script>

<img src={logo_full_dark} alt="hello" class="m-auto w-7/12 mt-10" />

<div class="flex place-content-center gap-12 text-3xl mt-24">
    <Button click={new_file}>New File</Button>
    <Button click={open_file}>Open File</Button>
</div>