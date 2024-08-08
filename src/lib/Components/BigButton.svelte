<script lang="ts">
    export let click;

    export let version: number = 1;
</script>

{#if version == 1}
<button
    on:click={click}
    class="bg-orange p-5 text-black font-bold 
    hover:bg-red hover:text-white 
    focus:outline-double focus:outline-4
    shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 rounded-xl
    transition-all"
>
    <slot />
</button>
{:else if version == 2}
<button
    on:click={click}
    class="bg-red p-5 text-white font-bold 
    hover:bg-red hover:text-black 
    focus:outline-double focus:outline-4
    shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 rounded-xl
    transition-all"
>
    <slot />
</button>
{/if}
