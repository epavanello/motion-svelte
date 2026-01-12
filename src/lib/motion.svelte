<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap">
	import {
		VisualElement,
		type AnimationPlaybackControls,
		type DOMKeyframesDefinition,
		type DynamicAnimationOptions
	} from 'motion/react';
	import {} from 'motion/react';
	import { createScopedAnimate } from 'motion';
	import {} from 'motion';
	import { animate as motionAnimate } from 'motion';
	import type { HTMLAttributes } from 'svelte/elements';
	import { generateCssFromInitial } from './index.js';
	import { onMount, tick, untrack } from 'svelte';
	import { watch } from 'runed';

	const {
		children,
		initial,
		animate,
		exit,
		transition,
		whileHover,
		whileTap,
		// @ts-ignore
		as = 'div',
		...rest
	}: HTMLAttributes<HTMLElementTagNameMap[T]> & {
		initial?: DOMKeyframesDefinition;
		animate?: DOMKeyframesDefinition;
		exit?: DOMKeyframesDefinition;
		whileHover?: DOMKeyframesDefinition;
		whileTap?: DOMKeyframesDefinition;
		transition?: DynamicAnimationOptions;
		as?: T;
	} = $props();

	const restProps = $derived(rest) as object;

	let el = $state<HTMLElementTagNameMap[T]>();
	let ssrStyle = $state(generateCssFromInitial(initial ?? animate));
	let isHover = $state(false);
	let isTap = $state(false);

	let myAnimation: typeof motionAnimate;
	VisualElement;
	createMotionComponentFactory
	onMount(() => {
		myAnimation = createScopedAnimate({ current: el, animations: [] });
	});

	function runAnimation(keyframes: DOMKeyframesDefinition, t?: DynamicAnimationOptions, _el = el) {
		if (!_el) {
			return;
		}
		return myAnimation(_el, keyframes, t);
	}

	function onExit(node: HTMLElementTagNameMap[T]) {
		const duration = transition?.duration ?? 0.3;
		console.log('Run on exit', exit, { duration, ...transition });
		if (exit) {
			runAnimation(exit, transition, node);
			return {
				duration: duration * 1000
			};
		}
		return {
			duration: 0
		};
	}

	$effect(() => {
		if (el) {
			untrack(async () => {
				if (el && initial) {
					ssrStyle = '';
					await tick();
					await runAnimation(initial, {
						duration: 0
					});
				}
				if (el && animate) {
					runAnimation(animate, transition);
				}
			});
		}
	});

	watch(
		[() => animate, () => el, () => transition],
		() => {
			if (el && animate) {
				runAnimation(animate, transition);
			}
		},
		{ lazy: true }
	);

	watch([() => isHover && whileHover, () => isTap && whileTap], () => {
		if (!el || (!whileTap && !whileHover)) {
			return;
		}
		console.log({ isHover, isTap });
		if (isTap && whileTap) {
			runAnimation(whileTap, transition);
		} else if (isHover && whileHover) {
			runAnimation(whileHover, transition);
		} else if (whileTap || whileHover) {
			runAnimation(initial ?? {}, transition);
		}
	});
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={as}
	bind:this={el}
	style={ssrStyle}
	onmouseover={() => {
		isHover = true;
	}}
	onmouseleave={() => {
		isHover = false;
	}}
	ontouchstart={() => {
		isTap = true;
	}}
	ontouchend={() => {
		isTap = false;
	}}
	onmousedown={() => {
		isTap = true;
	}}
	onmouseup={() => {
		isTap = false;
	}}
	out:onExit
	{...restProps}
>
	{@render children?.()}
</svelte:element>
