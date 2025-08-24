<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '@/utils/cn.ts';

	interface IntroSectionProps {
		heading: string;
		entities: string;
		date: string;
		classes?: string;
		description: Snippet;
		children?: Snippet;
	}

	let {
		heading,
		entities,
		date = '2021-2024',
		classes,
		description,
		children
	}: IntroSectionProps = $props();
</script>

<section
	class={cn(
		'intro-section mb-48 min-h-[25vh] w-full border-y-2 border-gray-700 bg-gradient-to-br from-gray-200 to-transparent to-75% text-white',
		classes
	)}
>
	<div class="flex flex-col items-center justify-center gap-8 px-8 py-4 md:flex-row">
		<div class="flex w-full flex-col md:w-1/3">
			<h3 class="text-5xl font-light text-wrap lg:text-7xl">
				{heading}
			</h3>
			<div>{entities}</div>
			<div class="font-light">{date}</div>
		</div>
		<div class="font-twoweekend w-full leading-loose md:w-2/3 md:text-xl">
			{@render description()}
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</section>
