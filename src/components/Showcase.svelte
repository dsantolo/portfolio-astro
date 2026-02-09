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
	let isTransitioning = $state(false);
	let isStageBlurred = $state(false);
	let hasEverBlurred = $state(false);

	const tapDistanceThreshold = 12;
	const swipeDistanceThreshold = 48;
	const swipeBiasRatio = 1.2;

	let pointerStartX = 0;
	let pointerStartY = 0;
	let pointerId: number | null = null;
	let hasSwiped = false;

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
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			isStageBlurred = !isStageBlurred;
			hasEverBlurred = true;
		}
	};

	const onStageEnter = (event: PointerEvent) => {
		if (event.pointerType !== 'mouse') return;
		isStageBlurred = true;
		hasEverBlurred = true;
	};

	const onStageLeave = (event: PointerEvent) => {
		if (event.pointerType !== 'mouse') return;
		isStageBlurred = false;
	};

	const onStagePointerDown = (event: PointerEvent) => {
		if (event.pointerType === 'mouse') return;

		pointerStartX = event.clientX;
		pointerStartY = event.clientY;
		pointerId = event.pointerId;
		hasSwiped = false;

		const target = event.currentTarget as HTMLElement;
		target.setPointerCapture(event.pointerId);
	};

	const onStagePointerMove = (event: PointerEvent) => {
		if (event.pointerType === 'mouse') return;
		if (pointerId === null || event.pointerId !== pointerId) return;
		if (hasSwiped) return;

		const deltaX = event.clientX - pointerStartX;
		const deltaY = event.clientY - pointerStartY;
		const absDeltaX = Math.abs(deltaX);
		const absDeltaY = Math.abs(deltaY);
		const isMobileViewport = window.matchMedia('(max-width: 1024px)').matches;
		const isSwipe =
			isMobileViewport &&
			absDeltaX > swipeDistanceThreshold &&
			absDeltaX > absDeltaY * swipeBiasRatio;

		if (isSwipe) {
			if (deltaX < 0) {
				goNext();
			} else {
				goPrevious();
			}
			hasSwiped = true;
		}
	};

	const onStagePointerUp = (event: PointerEvent) => {
		if (event.pointerType === 'mouse') return;
		if (pointerId === null || event.pointerId !== pointerId) return;

		const target = event.currentTarget as HTMLElement;
		target.releasePointerCapture(event.pointerId);

		if (hasSwiped) {
			pointerId = null;
			return;
		}

		const deltaX = event.clientX - pointerStartX;
		const deltaY = event.clientY - pointerStartY;
		const absDeltaX = Math.abs(deltaX);
		const absDeltaY = Math.abs(deltaY);
		const isTap = absDeltaX < tapDistanceThreshold && absDeltaY < tapDistanceThreshold;
		const isSwipe =
			window.matchMedia('(max-width: 1024px)').matches &&
			absDeltaX > swipeDistanceThreshold &&
			absDeltaX > absDeltaY * swipeBiasRatio;

		if (isSwipe) {
			if (deltaX < 0) {
				goNext();
			} else {
				goPrevious();
			}
		} else if (isTap) {
			isStageBlurred = !isStageBlurred;
			hasEverBlurred = true;
		}

		pointerId = null;
	};

	const onStagePointerCancel = (event: PointerEvent) => {
		if (event.pointerType === 'mouse') return;
		if (pointerId === null || event.pointerId !== pointerId) return;
		const target = event.currentTarget as HTMLElement;
		target.releasePointerCapture(event.pointerId);
		pointerId = null;
		hasSwiped = false;
	};

	const onTrackTransitionStart = (event: TransitionEvent) => {
		if (event.propertyName !== 'transform') return;
		isTransitioning = true;
		if (isStageBlurred) {
			hasEverBlurred = true;
		}
	};

	const onTrackTransitionEnd = (event: TransitionEvent) => {
		if (event.propertyName !== 'transform') return;
		isTransitioning = false;
	};
</script>

<svelte:window onkeydown={onKeydown} />

<div
	class="grid min-h-screen w-full grid-rows-[20vh_1fr] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,rgba(8,8,12,1),rgba(0,0,0,1))] tracking-[0.01em] text-white max-lg:grid-rows-[22vh_1fr]"
	role="region"
	aria-roledescription="carousel"
	aria-label="Showcase"
	aria-live="polite"
>
	<section class="flex items-center justify-center px-[clamp(1.5rem,5vw,6rem)] py-4">
		<div class="flex flex-col items-center gap-2">
			<div
				class="bg-linear-60 from-gray-200 to-gray-700 bg-clip-text text-center text-xl text-transparent sm:text-2xl"
			>
				DS
			</div>
			<nav
				class="flex w-full max-w-md flex-nowrap items-center justify-between gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2 text-xs backdrop-blur-lg sm:w-auto sm:max-w-none sm:gap-4 sm:px-5 sm:py-2.5 sm:text-sm lg:gap-6 lg:px-6 lg:py-3"
			>
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class={`rounded-full px-2.5 py-1 text-white/60 transition-colors duration-150 ease-out hover:bg-white/20 hover:text-white sm:px-3 sm:py-1.5 ${
							link.label === activeLabel ? 'bg-white/20 text-white' : ''
						}`}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</section>

	<h2
		class="font-twoweekend px-[clamp(1.5rem,5vw,6rem)] pb-6 text-center text-2xl tracking-[0.12em] text-white/80 uppercase max-lg:pb-4"
	>
		Ten Favorites
	</h2>

	<section
		class="font-twoweekend flex w-full flex-col gap-4 overflow-x-hidden lg:relative lg:block lg:h-[80vh] lg:overflow-hidden"
		role="group"
		aria-label="Showcase items"
		aria-live="polite"
		onpointerenter={onStageEnter}
		onpointerleave={onStageLeave}
	>
		<div class="relative h-[78vh] w-full overflow-hidden lg:h-full">
			<div
				class="absolute bottom-0 left-0 z-40 flex w-full items-center justify-center gap-4 px-[clamp(2rem,6vw,6rem)] pb-6 text-sm tracking-[0.3em] text-white/70 uppercase lg:hidden"
			>
				<button
					class="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-base text-white/80 transition duration-150 hover:border-white/60 hover:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white/60"
					class:pointer-events-none={!isStageBlurred}
					class:opacity-0={!isStageBlurred}
					class:opacity-100={isStageBlurred}
					onpointerdown={(event) => event.stopPropagation()}
					onclick={goPrevious}
					aria-label="Previous item"
					disabled={!isStageBlurred}
					tabindex={isStageBlurred ? 0 : -1}
					type="button"
				>
					<span aria-hidden="true">&#8592;</span>
				</button>
				<div class="flex items-center gap-2">
					<span>{currentIndex + 1}</span>
					<span class="opacity-50">/</span>
					<span>{items.length}</span>
				</div>
				<button
					class="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-base text-white/80 transition duration-150 hover:border-white/60 hover:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white/60"
					class:pointer-events-none={!isStageBlurred}
					class:opacity-0={!isStageBlurred}
					class:opacity-100={isStageBlurred}
					onpointerdown={(event) => event.stopPropagation()}
					onclick={goNext}
					aria-label="Next item"
					disabled={!isStageBlurred}
					tabindex={isStageBlurred ? 0 : -1}
					type="button"
				>
					<span aria-hidden="true">&#8594;</span>
				</button>
			</div>
			<div
				class="flex h-full w-full touch-pan-y transition-transform duration-[800ms] ease-out"
				style={`transform: translateX(-${currentIndex * 100}%);`}
				role="button"
				aria-pressed={isStageBlurred}
				tabindex="0"
				onpointerdown={onStagePointerDown}
				onpointermove={onStagePointerMove}
				onpointerup={onStagePointerUp}
				onpointercancel={onStagePointerCancel}
				ontransitionstart={onTrackTransitionStart}
				ontransitionend={onTrackTransitionEnd}
				ontransitioncancel={onTrackTransitionEnd}
			>
				{#each items as item, index (`${item.title}-${item.subtitle}`)}
					<div class="relative h-full min-w-full" aria-hidden={index !== currentIndex}>
						<div
							class="absolute top-0 left-0 z-40 w-full px-[clamp(2rem,6vw,6rem)] pt-6 text-left tracking-[0.18em] uppercase opacity-0 transition-opacity duration-150 ease-out lg:hidden"
							class:opacity-100={isStageBlurred}
						>
							<h2 class="m-0 text-[clamp(1.6rem,6vw,2.2rem)] max-lg:break-words">
								{item.title}
							</h2>
							<span class="inline-block text-[clamp(0.9rem,4vw,1.1rem)] text-white/70">
								{item.subtitle}
							</span>
						</div>
						<div class="absolute inset-0 overflow-hidden">
							<img
								src={item.image}
								alt={item.title}
								loading="lazy"
								class="showcase-cover h-full w-full scale-[1.02] bg-black object-contain"
								class:showcase-cover-transitioning={isTransitioning && isStageBlurred}
								class:showcase-cover-hovered={isStageBlurred}
								class:showcase-cover-unhovered={hasEverBlurred && !isStageBlurred}
							/>
						</div>
						<div
							class="relative z-20 grid h-full grid-cols-[7fr_3fr] items-center gap-[clamp(1.5rem,3vw,3rem)] bg-[linear-gradient(110deg,rgba(0,0,0,0.66),rgba(0,0,0,0.18)_60%)] p-[clamp(2rem,6vw,6rem)] max-lg:flex max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-6 max-lg:pt-0 max-lg:text-left"
						>
							<div
								class="font-twoweekend w-full max-w-none leading-[1.8] opacity-0 transition-opacity duration-150 ease-out motion-reduce:transition-none max-lg:order-3"
								class:opacity-100={isStageBlurred}
							>
								<p class="m-0 p-7 max-lg:p-0">
									{item.description}
								</p>
							</div>
							<div
								class="pr-10 text-right tracking-[0.18em] uppercase opacity-0 transition-opacity duration-150 ease-out max-lg:hidden"
								class:opacity-100={isStageBlurred}
							>
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
				class="absolute top-1/2 left-8 z-30 hidden h-[3.25rem] w-[3.25rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 text-2xl text-white/70 opacity-0 transition duration-150 hover:scale-105 hover:border-white/60 hover:text-white focus-visible:scale-105 focus-visible:border-white/60 focus-visible:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white/60 lg:flex"
				class:pointer-events-none={!isStageBlurred}
				class:opacity-100={isStageBlurred}
				onpointerdown={(event) => event.stopPropagation()}
				onclick={goPrevious}
				aria-label="Previous item"
				type="button"
			>
				<span aria-hidden="true">&#8592;</span>
			</button>
			<button
				class="absolute top-1/2 right-12 z-30 hidden h-[3.25rem] w-[3.25rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 text-2xl text-white/70 opacity-0 transition duration-150 hover:scale-105 hover:border-white/60 hover:text-white focus-visible:scale-105 focus-visible:border-white/60 focus-visible:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white/60 lg:flex"
				class:pointer-events-none={!isStageBlurred}
				class:opacity-100={isStageBlurred}
				onpointerdown={(event) => event.stopPropagation()}
				onclick={goNext}
				aria-label="Next item"
				type="button"
			>
				<span aria-hidden="true">&#8594;</span>
			</button>

			<div
				class="absolute bottom-8 left-8 hidden items-center gap-2 text-sm tracking-[0.3em] text-white/70 uppercase lg:flex"
			>
				<span>{currentIndex + 1}</span>
				<span class="opacity-50">/</span>
				<span>{items.length}</span>
			</div>
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

	.showcase-cover-transitioning {
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
