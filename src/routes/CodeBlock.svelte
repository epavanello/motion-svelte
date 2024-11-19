<script lang="ts">
	import { HighlightAuto } from 'svelte-highlight';
	import monokai from 'svelte-highlight/styles/monokai';
	const { content }: { content: string } = $props();
</script>

<svelte:head>
	{@html monokai}
</svelte:head>

<HighlightAuto code={content} />
