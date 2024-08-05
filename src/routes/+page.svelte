<script lang="ts">
    import {
        JORNO_FILE_FILTERS,
        new_jorno,
        save_jorno,
    } from "$lib/Jorno";
    import { open } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";

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

<h1>Welcome!</h1>
<button on:click={new_file}>New File</button>
<button on:click={open_file}>Open File</button>
