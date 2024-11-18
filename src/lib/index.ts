import { animate as motionAnimate } from 'motion';
import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react';
import type { Action } from 'svelte/action';

type Parameter =
	| (DOMKeyframesDefinition & {
			transition?: DynamicAnimationOptions;
	  })
	| undefined;

export const animate: Action<Element, Parameter> = (node, { transition, ...keyframes } = {}) => {
	let animation = motionAnimate(node, keyframes, transition);
	return {
		update: ({ transition, ...keyframes } = {}) => {
			animation.stop();
			animation = motionAnimate(node, keyframes, transition);
			console.log('Updated', keyframes, transition);
		},
		destroy: () => {
			console.log('Destroyed');
			animation.cancel();
		}
	};
};
