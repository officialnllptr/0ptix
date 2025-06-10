<script lang="ts">
    import { onMount } from "svelte";
    import { Toggle } from "flowbite-svelte";
    import Knob from "./knob.svelte";
    import ToggleButton from "./toggleButton.svelte";
    import PresetButton from "./presetButton.svelte";

    let player;
    
    onMount(() => {
        player = new JSMpeg.Player('ws://localhost:9999', {
            canvas: document.getElementById('canvas') // Canvas should be a canvas DOM element
        });
    });


</script>

<svelte:head>
    <script src='/jsmpeg.min.js'></script>
</svelte:head>

<div class='flex flex-row h-dvh w-dvw bg-[#050707] text-[#EBFAF9] p-14'>
    <div class="flex flex-col h-full w-[15%]">
        <div class='flex flex-col justify-center items-center py-5'>
            <h1 class='font-extrabold text-[5rem] tracking-[0.1em] h-fit leading-[0.85]'>0PTIx</h1>
            <h1 class='font-extrabold text-[5rem] tracking-[0.1em] textoutline'>0PTIx</h1>
            <h1 class='font-extrabold text-[5rem] tracking-[0.1em] textoutline'>0PTIx</h1>
        </div>
        <div class='flex flex-col justify-center items-center h-full aspect-square bg-[#ebfaf9] rounded-xl divshadow aspect-auto'>
            <div class='grid grid-cols-2 grid-rows-4 w-full'>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <Knob tooltip={'pan speed'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <Knob tooltip={'tilt speed'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <Knob tooltip={'zoom speed'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <Knob tooltip={'focus speed'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <ToggleButton icon={'mirror.png'} tooltip={'Mirror Image'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <ToggleButton icon={'flip.png'} tooltip={'Flip Image'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <ToggleButton icon={'invert.png'} tooltip={'Invert Controls'}/>
                </div>
                <div class='flex justify-center items-center w-full aspect-square p-3.5'>
                    <ToggleButton icon={'dark.png'} tooltip={'Dark Mode'} active/>
                </div>
            </div>
        </div>
    </div>
    <div class="flex h-full w-[46%] px-20">
        <div class="flex flex-col h-full w-full bg-[#ebfaf9] rounded-xl p-10 divshadow">
            <div class='flex justify-center items-center'>
                <canvas id='canvas' class='w-full aspect-video rounded-xl mb-[10px]'></canvas>
            </div>
            <div class='flex h-full'>
                <div class='flex flex-col w-full justify-center items-center'>
                    <div class='grid w-full justify-center items-center grid-cols-3 grid-rows-4'>
                        {#each {length: 12}, idx}
                            <div class='flex justify-center items-center aspect-square mr-[20px] mb-[10px]'>
                                <PresetButton num={idx + 1}/>
                            </div>
                        {/each}
                    </div>
                    <div class='flex flex-row w-full items-start text-[#B0B0B0] px-2 pt-3'>
                        <p class='mr-[10px]'>call</p>
                        <Toggle/>
                        <p>set</p>
                    </div>
                </div>
                <div class='w-[70%]'></div>
            </div>

        </div>
    </div>
    <div class="flex flex-col h-full w-[39%]">
        <div class="flex h-full w-full mb-10 bg-[#ebfaf9] rounded-xl divshadow"></div>
        <div class="flex h-full w-full bg-[#ebfaf9] rounded-xl divshadow"></div>
    </div>
</div>

<style>
    .textoutline {
        color: transparent;
        -webkit-text-stroke: 1.4px #b1bdbd;
        line-height: 0.85;
    }

    .divshadow {
        box-shadow: inset 5px 5px 15px rgba(0,0,0,0.5);
    }
</style>