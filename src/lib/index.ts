import { animate as motionAnimate } from 'motion';
import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react';
import type { Action } from 'svelte/action';
import Motion from './motion.svelte';

export default Motion;

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
		},
		destroy: () => {
			animation.cancel();
		}
	};
};

export function generateCssFromInitial(initial?: DOMKeyframesDefinition): string {
	const transformMap: Record<string, string> = {
		x: 'translateX',
		y: 'translateY',
		z: 'translateZ',
		rotateX: 'rotateX',
		rotateY: 'rotateY',
		rotateZ: 'rotateZ',
		scale: 'scale',
		scaleX: 'scaleX',
		scaleY: 'scaleY',
		scaleZ: 'scaleZ',
		skewX: 'skewX',
		skewY: 'skewY'
	};

	const transformProperties: string[] = [];
	const otherStyles: string[] = [];

	for (const [key, value] of Object.entries(initial ?? {})) {
		if (value === undefined || value === null) continue; // Skip undefined or null values

		if (key in transformMap) {
			// Gestione delle proprietà di transform
			const transformKey = transformMap[key];
			const transformValue =
				typeof value === 'number' && !['scale', 'scaleX', 'scaleY', 'scaleZ'].includes(key)
					? `${value}px` // Aggiungi "px" solo se necessario
					: value;
			transformProperties.push(`${transformKey}(${transformValue})`);
		} else {
			// Gestione delle proprietà CSS standard
			const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // Convert camelCase to kebab-case
			const cssValue = typeof value === 'number' && key !== 'opacity' ? `${value}px` : value; // Aggiungi "px" solo se appropriato
			otherStyles.push(`${cssKey}: ${cssValue};`);
		}
	}

	// Combina le proprietà di transform in una singola stringa
	if (transformProperties.length > 0) {
		otherStyles.push(`transform: ${transformProperties.join(' ')};`);
	}

	return otherStyles.join(' ');
}
