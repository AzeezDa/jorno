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
            upload_div.style.display = "none";
        } else {
            // To be opened
            upload_button_text = "Close";
            upload_div.style.display = "block";
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
            console.log(blob);
            updateImage(blob);
        };
        request.send();
    }
</script>

<div class="image_section">
    <div class="edit">
        <button on:click={onUploadClick}>{upload_button_text}</button>
        <div bind:this={upload_div} class="upload">
            <input
                type="text"
                placeholder="URL"
                bind:value={input_url}
                on:change={onURLInputChange}
            />
            <input type="file" bind:this={file_upload} on:change={onUpload} />
        </div>
        <input type="range" min=3 max=100 bind:value={data.zoom} on:input={onZoom} />
    </div>
    <img
        src={data.url}
        alt={data.alt}
        class="image"
        bind:this={image}
        on:load={onZoom}
    />
</div>

<style lang="scss">
    .image_section:hover > .edit {
        display: grid;
    }

    .image_section {
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .edit {
        display: none;
        position: absolute;
        background-color: rgba($color: black, $alpha: 0.5);
        padding: 5px;
        border-radius: 3px;
    }

    .upload {
        display: none;
    }

    input[type="file"] {
        color: white;
    }
</style>
