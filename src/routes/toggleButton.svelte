<script>
    import { Tooltip } from 'flowbite-svelte';
    import { scale } from 'svelte/transition';
    let { icon, tooltip, active = false } = $props();


    function toggleActive() {
        active = !active;
    }

    function keyEvent() {
        return;
    }
</script>

<div class='flex justify-center items-center w-full aspect-square rounded-lg buttonshadow transition duration-150 hover:scale-96 {active ? 'bg-[#404040]' : 'hover:bg-[#CFCFCF]'}' role='button' tabindex="0" onkeydown={keyEvent} onclick={toggleActive}>
    <img src={icon} alt={tooltip}>
</div>
<Tooltip transition={scale}>{tooltip}</Tooltip>

<style>
    .buttonshadow {
        box-shadow: 3px 3px 8.1px -1px rgba(0,0,0,0.11), inset 3px 3px 8.1px -1px rgba(0,0,0,0.11);
    }
</style>