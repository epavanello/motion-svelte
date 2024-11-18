<script lang="ts">
	import { animate } from '$lib/index.js';
	import Motion from '$lib/motion.svelte';

	let x = $state(10);
</script>

<label>
	<input type="range" bind:value={x} />
	{x}
</label>
<div>
	<span use:animate={{ rotate: x, x, transition: { type: 'spring' } }}>test</span>
	<Motion initial={{ x }} animate={{ x }} transition={{ type: 'spring' }}>ciao</Motion>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
	span {
		position: relative;
		display: inline-block;
	}
</style>
