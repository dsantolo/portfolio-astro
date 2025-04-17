<script lang="ts">
	import { cn } from '../utils.ts';

	interface IntroSectionProps {
		heading: string;
		body: string;
		date: string;
		className?: string;
	}

	let { heading, body, date = '2021-2024', className }: IntroSectionProps = $props();
</script>

<section
	class={cn(
		'intro-section w-full border-y-2 border-gray-700 bg-gradient-to-br from-red-950 to-transparent to-75% text-white',
		className
	)}
>
	<div
		class="flex flex-col items-start justify-between gap-12 px-12 py-4 md:flex-row md:items-center"
	>
		<div class="flex flex-col lg:w-1/5">
			<h3 class="text-5xl font-light text-wrap lg:text-7xl">
				{heading}
			</h3>
			<div class="font-light">{date}</div>
		</div>
		<div class="font-twoweekend leading-loose md:w-2/3 md:text-xl">
			{body}
		</div>
	</div>
</section>
