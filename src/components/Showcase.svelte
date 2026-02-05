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
</script>

<div
	class="grid min-h-screen w-full grid-rows-[20vh_1fr] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,rgba(8,8,12,1),rgba(0,0,0,1))] tracking-[0.01em] text-white font-['Two_Weekend_Go'] max-[900px]:grid-rows-[22vh_1fr]"
	onkeydown={onKeydown}
	role="region"
	aria-roledescription="carousel"
	aria-label="Showcase"
	aria-live="polite"
	tabindex="0"
>
	<section class="flex items-center justify-center px-[clamp(1.5rem,5vw,6rem)] py-8">
		<nav class="flex gap-6 rounded-full border border-white/15 bg-black/60 px-6 py-3 text-[0.85rem] uppercase tracking-[0.2em] backdrop-blur-[16px] max-[900px]:flex-wrap max-[900px]:justify-center max-[900px]:gap-3">
			{#each navLinks as link}
				<a
					href={link.href}
					class={`rounded-full px-3 py-1.5 text-white/60 transition-colors duration-300 hover:bg-white/20 hover:text-white ${
						link.label === activeLabel ? 'bg-white/20 text-white' : ''
					}`}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</section>

	<section class="relative h-[80vh] w-full overflow-hidden max-[900px]:h-[78vh]" aria-live="polite">
		<div
			class="flex h-full w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
			style={`transform: translateX(-${currentIndex * 100}%);`}
		>
			{#each items as item, index}
				<div class="relative h-full min-w-full" aria-hidden={index !== currentIndex}>
					<div class="absolute inset-0 overflow-hidden">
						<img
							src={item.image}
							alt={item.title}
							loading="lazy"
							class="h-full w-full scale-[1.02] object-cover saturate-[0.95] contrast-[1.05]"
						/>
					</div>
					<div class="relative z-20 grid h-full grid-cols-[1.4fr_0.9fr] items-center gap-[clamp(1.5rem,3vw,3rem)] bg-[linear-gradient(110deg,rgba(0,0,0,0.66),rgba(0,0,0,0.18)_60%)] p-[clamp(2rem,6vw,6rem)] max-[900px]:grid-cols-[1fr] max-[900px]:text-left">
						<div class="max-w-[560px] font-sans text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.8] [text-shadow:0_12px_30px_rgba(0,0,0,0.4)]">
							<p class="m-0 rounded-[1.5rem] border border-white/15 bg-black/55 p-7 backdrop-blur-[10px]">
								{item.description}
							</p>
						</div>
						<div class="text-right uppercase tracking-[0.18em] max-[900px]:text-left">
							<h2 class="m-0 mb-3 text-[clamp(2rem,3.6vw,3.8rem)]">{item.title}</h2>
							<span class="inline-block text-[clamp(0.95rem,1.4vw,1.2rem)] text-white/70">
								{item.subtitle}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<button
			class="absolute left-8 top-1/2 hidden h-[3.25rem] w-[3.25rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white transition duration-300 backdrop-blur-[8px] hover:scale-105 hover:border-white/60 hover:bg-white/20 max-[900px]:hidden min-[901px]:flex"
			onclick={goPrevious}
			aria-label="Previous item"
			type="button"
		>
			<span aria-hidden="true">&#8592;</span>
		</button>
		<button
			class="absolute right-8 top-1/2 hidden h-[3.25rem] w-[3.25rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white transition duration-300 backdrop-blur-[8px] hover:scale-105 hover:border-white/60 hover:bg-white/20 max-[900px]:hidden min-[901px]:flex"
			onclick={goNext}
			aria-label="Next item"
			type="button"
		>
			<span aria-hidden="true">&#8594;</span>
		</button>

		<div class="absolute bottom-8 left-8 flex items-center gap-2 text-[0.95rem] uppercase tracking-[0.3em] text-white/70 max-[900px]:left-1/2 max-[900px]:-translate-x-1/2">
			<span>{currentIndex + 1}</span>
			<span class="opacity-50">/</span>
			<span>{items.length}</span>
		</div>
	</section>
</div>
