<script lang="ts">
	import { animate } from '$lib/index.js';
	import Motion from '$lib/index.js';
	import { onMount } from 'svelte';

	let isInView = false;
	let scrollYProgress = 0;
	let paragraphOneValue = '-100%';
	let paragraphTwoValue = '100%';

	onMount(() => {
		// Logic to determine if the section is in view
		// and update `isInView` and `scrollYProgress` accordingly
	});
</script>

<main class="prose-xl mx-auto h-full overflow-x-hidden p-10">
	<!-- <h1 class="text-center">Motion for Svelte 5</h1> -->
	<div class="flex h-full flex-col gap-10">
		<Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} class="grid grid-cols-3 gap-10">
			<!-- Fade Up -->
			<Motion
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				class="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
			>
				<Motion
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
					class="h-20 w-20 rounded-lg bg-stone-100"
				/>
				<Motion
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
					class="h-20 w-20 rounded-full bg-stone-100"
				/>
			</Motion>

			<!-- Shape Shifting -->
			<div class="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
				<Motion
					animate={{
						scale: [1, 2, 2, 1],
						rotate: [0, 90, 90, 0],
						borderRadius: ['10%', '10%', '50%', '10%']
					}}
					transition={{
						duration: 5,
						ease: 'easeInOut',
						repeat: Infinity,
						repeatDelay: 1
					}}
					class="h-1/3 w-1/3 bg-rose-400 shadow-md"
				/>
			</div>

			<!-- Button -->
			<div class="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
				<Motion
					as="button"
					whileTap={{ scale: 0.9 }}
					whileHover={{
						scale: 1.1,
						backgroundColor: '#d1d5db',
						color: 'black'
					}}
					transition={{ bounceDamping: 10, bounceStiffness: 600 }}
					class="w-1/2 rounded-lg bg-emerald-600 py-4 text-2xl font-light tracking-wide text-gray-100"
				>
					subscribe
				</Motion>
			</div>

			<!-- Drag -->
			<div class="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
				<!-- <Motion
				drag
				dragConstraints={{
					top: -125,
					right: 125,
					bottom: 125,
					left: -125
				}}
				dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
				class="h-1/3 w-1/3 cursor-grab rounded-3xl bg-orange-500"
			/> -->
			</div>

			<!-- Scroll Progress -->
			<div class="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
				<div class="aspect-square w-40 rounded-xl bg-gray-50/20">
					<Motion
						class="h-full w-full origin-bottom rounded-xl bg-gray-400"
						style={{ scaleY: scrollYProgress }}
					/>
				</div>
			</div>

			<!-- SVG Animation -->
			<div class="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
				<svg viewBox="0 0 24 24" class="w-1/2 stroke-amber-500 stroke-[0.5]">
					<path
						d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
						initial={{ opacity: 0, pathLength: 0, fill: 'rgba(252, 211, 77, 0)' }}
						animate={{ opacity: 1, pathLength: 1, fill: 'rgba(252, 211, 77, 1)' }}
					/>
					<!-- transition={{
					default: {
						duration: 2,
						ease: 'easeInOut',
						delay: 1,
						repeat: Infinity,
						repeatType: 'reverse',
						repeatDelay: 1
					},
					fill: {
						duration: 2,
						ease: 'easeIn',
						delay: 2,
						repeat: Infinity,
						repeatType: 'reverse',
						repeatDelay: 1
					}
				}} -->
				</svg>
			</div>
		</Motion>

		<section class="mb-10 flex flex-col gap-10">
			<Motion
				as="h1"
				class="text-center text-5xl tracking-wide text-slate-100"
				initial={{ opacity: 0, y: 75 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ delay: 0.3 }}
			>
				Just Keep Scrolling
			</Motion>
			<Motion as="p" class="mx-auto w-1/2 text-4xl font-thin text-slate-100">
				This is a basic tutorial on how to get up and running with Framer Motion with some
				TailwindCSS. If you enjoyed this video, please leave a like and also subscribe.
			</Motion>
			<Motion as="p" class="mx-auto w-1/2 text-4xl font-thin text-slate-100">
				Have fun playing with Framer Motion. It is a very powerful library, when used properly. Add
				some life to your websites.
			</Motion>
		</section>
	</div>
</main>
