<script lang="ts">
	import { type DOMKeyframesDefinition, type DynamicAnimationOptions } from 'motion/react';
	import { animate as motionAnimate } from 'motion';
	import type { HTMLAttributes } from 'svelte/elements';
	import { animate as animateAction } from './index.js';
	import { onMount } from 'svelte';

	const {
		children,
		initial,
		animate,
		transition,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		initial?: DOMKeyframesDefinition;
		animate?: DOMKeyframesDefinition;
		transition?: DynamicAnimationOptions;
	} = $props();

	let el = $state<HTMLDivElement>();
	onMount(() => {
		if (initial && el) {
			motionAnimate(el, initial, {
				duration: 0
			});
		}
	});
</script>

<div bind:this={el} {...rest} use:animateAction={{ ...animate, transition }}>
	{@render children?.()}
</div>
