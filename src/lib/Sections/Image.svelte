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
    import BigButton from "$lib/Components/BigButton.svelte";

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

<div 
    class="absolute grid left-1/2 -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded 
    transition-all scale-x-0 [&:has(+img:hover)]:scale-x-100 hover:scale-x-100">
    <input
        type="range"
        min="10"
        max="100"
        bind:value={data.zoom}
        on:input={onZoom}
        class="accent-orange mb-1"
    />
    <div bind:this={upload_div} class="grid">
        <input
            type="text"
            placeholder="URL"
            bind:value={input_url}
            on:change={onURLInputChange}
            class="mb-2"
        />
        <label class="cursor-pointer bg-black p-1 rounded text-white font-bold hover:text-black hover:bg-white transition-all">
            <input type="file" bind:this={file_upload} on:change={onUpload} class="hidden"/>
            Upload From Local Disk
        </label>
    </div>
</div>
<img src={data.url} alt={data.alt} bind:this={image} on:load={onZoom} class="m-auto pb-1" />
