<script lang="ts" context="module">
    import no_image from "$lib/img/no_image.png";
    export interface Data {
        url: string;
        alt: string;
        zoom: number;
    }
    export function default_image(): Data {
        return { url: no_image, alt: "", zoom: 50 };
    }
</script>

<script lang="ts">
    export let data: Data = default_image();

    let image: HTMLImageElement;

    function onZoom() {
        image.style.width = `${data.zoom}%`;
    }

    let upload_on: boolean = false;
    let upload_button_text = "Upload";
    let upload_div: HTMLDivElement;
    let file_upload: HTMLInputElement;
    let input_url: string;
    function onUploadClick() {
        if (upload_on) {
            // To be closed
            upload_button_text = "Upload";
            upload_div.style.visibility = "hidden";
        } else {
            // To be opened
            upload_button_text = "Close";
            upload_div.style.visibility = "visible";
        }

        upload_on = !upload_on;
    }

    function updateImage(image_blob: Blob | File) {
        let reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result == "string") {
                data.url = reader.result;
            }
        };

        reader.readAsDataURL(image_blob);
    }

    function onUpload() {
        if (file_upload.files?.item(0)) {
            updateImage(file_upload.files[0]);
            input_url = "";
        }
    }

    function onURLInputChange() {
        let request = new XMLHttpRequest();
        request.open("GET", input_url);
        request.responseType = "blob";
        request.onload = () => {
            let blob: Blob = request.response;
            updateImage(blob);
        };
        request.send();
    }
</script>

<div class="edit_section">
    <input
        type="range"
        min="10"
        max="100"
        bind:value={data.zoom}
        on:input={onZoom}
    />
    <button on:click={onUploadClick}>{upload_button_text}</button>
    <div bind:this={upload_div} class="upload_div">
        <input
            type="text"
            placeholder="URL"
            bind:value={input_url}
            on:change={onURLInputChange}
        />
        <label>
            <input type="file" bind:this={file_upload} on:change={onUpload} />
            Upload From Local Disk
        </label>
    </div>
</div>
<img src={data.url} alt={data.alt} bind:this={image} on:load={onZoom} />

<style lang="scss">
    @use "/src/style" as *;

    img {
        @include center_self("");
    }

    .edit_section {
        @include visible_on_hover("&:has(+ img:hover)");
        width: 50%;
        max-width: 360px;
        display: grid;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;

        button {
            @include clickable_default;
        }
    }

    .upload_div {
        @include center_content;
        visibility: hidden;
        padding: 10px;
        display: grid;

        input {
            @include input_setting_default;
        }
        label {
            @include clickable_default(0.8em, 800);
            input {
                display: none;
            }
            width: 100%;
            margin-top: 10px;
        }
    }
</style>
