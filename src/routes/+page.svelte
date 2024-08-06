<script lang="ts">
    import { JORNO_FILE_FILTERS, new_jorno, save_jorno } from "$lib/Jorno";
    import { open } from "@tauri-apps/api/dialog";
    import { goto } from "$app/navigation";
    import logo_full from "$lib/img/jornofulllight.svg";

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

<img src={logo_full} alt="hello" />

<div>
    <button on:click={new_file}>New File</button>
    <button on:click={open_file}>Open File</button>
</div>

<style lang="scss">
    @import "/src/style";

    :root {
        background-color: $p_black;
    }

    img {
        @include center_self(80%);
        margin-top: 3em;
    }

    div {
        @include center_content(3em);
        margin-top: 3em;

        button {
            @include clickable_default(2em);
        }
    }
</style>
