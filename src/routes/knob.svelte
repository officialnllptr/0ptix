<script lang="ts">
  let { tooltip } = $props();
  let value = $state(0); // from 0 to 1
  let size = 100;

  const minAngle = -180;
  const maxAngle = 180;

  const dotCount = 21;
  const dots = Array.from({ length: dotCount }, (_, i) => i / (dotCount - 1));

  let wrapperEl: HTMLDivElement;
  let lastY = 0;

  function angleFromValue(val: number) {
    return minAngle + val * (maxAngle - minAngle);
  }

  function onPointerDown(event: PointerEvent) {
    event.preventDefault();
    lastY = event.clientY;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event: PointerEvent) {
    const deltaY = lastY - event.clientY;
    lastY = event.clientY;

    const sensitivity = 0.002; // smaller = slower movement
    value = Math.min(1, Math.max(0, value + deltaY * sensitivity));
  }

  function onPointerUp() {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }
</script>

<style>
  .knob-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
    user-select: none;
  }

  .label {
    font-size: 0.9em;
    letter-spacing: 0.1em;
    margin-bottom: 0.5em;
    color: #222;
  }

  .wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  .dot {
    fill: #ccc;
    transition: fill 0.2s;
  }

  .dot.active {
    fill: #33f6ff;
  }

  .knob-head {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background: radial-gradient(#f0ffff, #e0eeee);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: inset 0 0 6px #aaa;
    cursor: ns-resize;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>

<div class="knob-container" style="--size: {size}px">
  <div class="label">{tooltip}</div>
  <div class="wrapper" bind:this={wrapperEl}>
    <svg width={size} height={size}>
      {#each dots as d}
        <circle
            class="dot {d <= value ? 'active' : ''}"
            r="2.5"
            cx={size / 2 + (size * 0.45) * Math.cos((360 * d - 90) * Math.PI / 180)}
            cy={size / 2 + (size * 0.45) * Math.sin((360 * d - 90) * Math.PI / 180)}
        />
      {/each}
    </svg>

    <div class="knob-head flex justify-center items-center" onpointerdown={onPointerDown}>
        <div class='w-[4%] h-[20%] bg-[#777] origin-[50%_0%]' style='transform: rotate({angleFromValue(value)}deg)'></div>
    </div>
  </div>
</div>
