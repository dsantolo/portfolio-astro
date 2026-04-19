<script lang="ts">
	import type { ShowcaseItem } from '@/types';

	type Props = {
		item: ShowcaseItem;
		objectFitDefault?: string;
		isStageBlurred: boolean;
		isTransitioning: boolean;
		hasEverBlurred: boolean;
	};

	let {
		item,
		objectFitDefault = 'object-cover',
		isStageBlurred,
		isTransitioning,
		hasEverBlurred
	}: Props = $props();
</script>

<div class="absolute inset-0 overflow-hidden">
	<img
		src={item.image}
		alt={item.title}
		loading="lazy"
		class={`h-full w-full scale-[1.02] bg-black blur-none ${item.objectFit ?? objectFitDefault} ${item.objectPosition ?? 'object-center'}`}
		class:showcase-cover-transitioning={isTransitioning && isStageBlurred}
		class:showcase-cover-hovered={isStageBlurred}
		class:showcase-cover-unhovered={hasEverBlurred && !isStageBlurred}
	/>
</div>

<style>
	.showcase-cover-hovered {
		will-change: transform, filter;
		animation: showcase-blur-in 150ms ease-out forwards;
	}

	.showcase-cover-transitioning {
		will-change: transform, filter;
		animation: showcase-blur-in 150ms ease-out forwards;
		filter: blur(8px);
	}

	.showcase-cover-unhovered {
		animation: showcase-blur-out 150ms ease-out forwards;
	}

	@keyframes showcase-blur-in {
		from {
			filter: blur(0px);
		}
		to {
			filter: blur(8px);
		}
	}

	@keyframes showcase-blur-out {
		from {
			filter: blur(8px);
		}
		to {
			filter: blur(0px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.showcase-cover-hovered,
		.showcase-cover-transitioning,
		.showcase-cover-unhovered {
			animation: none;
		}
	}
</style>
