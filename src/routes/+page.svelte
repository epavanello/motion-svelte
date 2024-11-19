<script lang="ts">
	import { animate } from '$lib/index.js';
	import Motion from '$lib/index.js';

	let x = $state(30);
	let spin = $state(false);
	let hover = $state(false);
	let count = $state(0);
	let showNotification = $state(false);
</script>

<main class="container prose-xl mx-auto px-8 py-16">
	<h1 class="text-center">Motion for Svelte 5</h1>

	<div
		class="m-auto flex h-full max-w-lg select-none flex-col justify-center gap-8 text-black"
		id="demo"
	>
		<button onclick={() => (showNotification = !showNotification)} class="bg-indigo-700">
			Toggle Notification
		</button>

		{#if showNotification}
			<Motion
				initial={{ opacity: 0, rotate: -30 }}
				animate={{ opacity: 1, rotate: 0 }}
				exit={{ opacity: 0, rotate: 30 }}
				transition={{ duration: 0.5 }}
				class="bg-indigo-900"
			>
				This is a notification!
			</Motion>
		{/if}

		<!-- Example 2: Infinite Pulse -->
		<Motion
			animate={{ scale: [1, 1.2, 1] }}
			transition={{ duration: 2, repeat: Infinity }}
			class="bg-red-200"
		>
			Pulse
		</Motion>

		<!-- Example 4: Rotate on Click -->
		<Motion
			animate={{ rotate: spin ? 360 : 0 }}
			transition={{ duration: 1 }}
			onclick={() => (spin = !spin)}
			class="cursor-pointer bg-purple-200"
		>
			Click to Spin
		</Motion>

		<!-- Example 5: Hover Card -->
		<Motion initial={{ y: 0 }} whileHover={{ y: -10 }} class="bg-yellow-200">Hover Card</Motion>

		<!-- Example 6: Counter with Animation -->
		<Motion
			animate={{ scale: count % 2 === 0 ? 1 : 1.1 }}
			transition={{ type: 'spring' }}
			onclick={() => count++}
			class="cursor-pointer bg-orange-200"
		>
			Count: {count}
		</Motion>

		<!-- Example 8: Use Animate Directive -->
		<div
			role="button"
			tabindex="-1"
			use:animate={{
				scale: hover ? 1.2 : 1,
				rotate: hover ? 45 : 0,
				transition: { type: 'spring' }
			}}
			onmouseenter={() => (hover = true)}
			onmouseleave={() => (hover = false)}
			class="bg-pink-200"
		>
			Hover Transform
		</div>

		<!-- Example 10: Keyframe Animation -->
		<Motion
			animate={{
				rotate: [0, 45, 0],
				scale: [1, 0.8, 1]
			}}
			transition={{
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut'
			}}
			class="bg-gray-200"
		>
			Keyframes
		</Motion>
	</div>
</main>

<style lang="postcss">
	:global(#demo > *) {
		@apply w-full origin-center rounded-lg p-4 text-center;
	}
</style>
