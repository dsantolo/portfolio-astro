<script lang="ts">
	export type ShowcaseItem = {
		title: string;
		subtitle: string;
		description: string;
		image: string;
	};

	export type ShowcaseNavLink = {
		label: string;
		href: string;
	};

	type Props = {
		items?: ShowcaseItem[];
		navLinks?: ShowcaseNavLink[];
		activeLabel?: string;
	};

	let { items = [], navLinks = [], activeLabel = '' }: Props = $props();

	let currentIndex = $state(0);
	let hoverStates = $state<boolean[]>([]);
	let hasHovered = $state<boolean[]>([]);

	const clampIndex = (index: number) => {
		if (items.length === 0) return 0;
		return (index + items.length) % items.length;
	};

	const goPrevious = () => {
		currentIndex = clampIndex(currentIndex - 1);
	};

	const goNext = () => {
		currentIndex = clampIndex(currentIndex + 1);
	};

	const onKeydown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowLeft') {
			goPrevious();
		}
		if (event.key === 'ArrowRight') {
			goNext();
		}
	};

	const onSlideEnter = (index: number) => {
		hoverStates[index] = true;
		hasHovered[index] = true;
	};

	const onSlideLeave = (index: number) => {
		hoverStates[index] = false;
	};

	$effect(() => {
		if (hoverStates.length !== items.length) {
			hoverStates = items.map((_, index) => hoverStates[index] ?? false);
		}
		if (hasHovered.length !== items.length) {
			hasHovered = items.map((_, index) => hasHovered[index] ?? false);
		}
	});
</script>

<svelte:window onkeydown={onKeydown} />

<div
	class="font-twoweekend grid min-h-screen w-full grid-rows-[20vh_1fr] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,rgba(8,8,12,1),rgba(0,0,0,1))] tracking-[0.01em] text-white max-lg:grid-rows-[22vh_1fr]"
	role="region"
	aria-roledescription="carousel"
	aria-label="Showcase"
	aria-live="polite"
>
	<section class="flex items-center justify-center px-[clamp(1.5rem,5vw,6rem)] py-8">
		<nav
			class="flex gap-6 rounded-full border border-white/15 bg-black/60 px-6 py-3 text-sm tracking-[0.2em] uppercase backdrop-blur-lg max-lg:flex-wrap max-lg:justify-center max-lg:gap-3"
		>
			{#each navLinks as link}
				<a
					href={link.href}
					class={`rounded-full px-3 py-1.5 text-white/60 transition-colors duration-150 ease-out hover:bg-white/20 hover:text-white ${
						link.label === activeLabel ? 'bg-white/20 text-white' : ''
					}`}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</section>

	<section class="relative h-[80vh] w-full overflow-hidden max-lg:h-[78vh]" aria-live="polite">
		<div
			class="flex h-full w-full transition-transform duration-[800ms] ease-out"
			style={`transform: translateX(-${currentIndex * 100}%);`}
		>
			{#each items as item, index}
				<div
					class="group relative h-full min-w-full"
					aria-hidden={index !== currentIndex}
					onmouseenter={() => onSlideEnter(index)}
					onmouseleave={() => onSlideLeave(index)}
				>
					<div class="absolute inset-0 overflow-hidden">
						<img
							src={item.image}
							alt={item.title}
							loading="lazy"
							class="showcase-cover h-full w-full scale-[1.02] object-cover"
							class:showcase-cover-hovered={hoverStates[index]}
							class:showcase-cover-unhovered={hasHovered[index] && !hoverStates[index]}
						/>
					</div>
					<div
						class="relative z-20 grid h-full grid-cols-[7fr_3fr] items-center gap-[clamp(1.5rem,3vw,3rem)] bg-[linear-gradient(110deg,rgba(0,0,0,0.66),rgba(0,0,0,0.18)_60%)] p-[clamp(2rem,6vw,6rem)] max-lg:grid-cols-1 max-lg:text-left"
					>
						<div
							class="font-twoweekend w-full max-w-none text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.8] opacity-0 transition-opacity duration-150 ease-out [text-shadow:0_12px_30px_rgba(0,0,0,0.4)] group-hover:opacity-100 motion-reduce:transition-none"
						>
							<p class="m-0 p-7">
								{item.description}
							</p>
						</div>
						<div class="text-right tracking-[0.18em] uppercase max-lg:text-left">
							<h2 class="m-0 mb-3 text-[clamp(2.4rem,4.4vw,4.6rem)]">{item.title}</h2>
							<span class="inline-block text-[clamp(1rem,1.6vw,1.35rem)] text-white/70">
								{item.subtitle}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<button
			class="absolute top-1/2 left-8 hidden h-[3.25rem] w-[3.25rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/20 lg:flex"
			onclick={goPrevious}
			aria-label="Previous item"
			type="button"
		>
			<span aria-hidden="true">&#8592;</span>
		</button>
		<button
			class="absolute top-1/2 right-8 hidden h-[3.25rem] w-[3.25rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/20 lg:flex"
			onclick={goNext}
			aria-label="Next item"
			type="button"
		>
			<span aria-hidden="true">&#8594;</span>
		</button>

		<div
			class="absolute bottom-8 left-8 flex items-center gap-2 text-sm tracking-[0.3em] text-white/70 uppercase max-lg:left-1/2 max-lg:-translate-x-1/2"
		>
			<span>{currentIndex + 1}</span>
			<span class="opacity-50">/</span>
			<span>{items.length}</span>
		</div>
	</section>
</div>

<style>
	.showcase-cover {
		filter: blur(0px);
	}

	.showcase-cover-hovered {
		animation: showcase-blur-in 150ms ease-out forwards;
	}

	.showcase-cover-unhovered {
		animation: showcase-blur-out 150ms ease-out forwards;
	}

	@keyframes showcase-blur-in {
		from {
			filter: blur(0px);
		}
		to {
			filter: blur(12px);
		}
	}

	@keyframes showcase-blur-out {
		from {
			filter: blur(12px);
		}
		to {
			filter: blur(0px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.showcase-cover-hovered,
		.showcase-cover-unhovered {
			animation: none;
		}
	}
</style>
