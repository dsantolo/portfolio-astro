<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '../utils.ts';
	import { animate, stagger, JSAnimation } from 'animejs';

	let isMounted = $state(false);
	let isTechStackOpen = $state(false);
	let selected: string = $state('');

	// Declare animations:
	let comingSoonAnimation: JSAnimation;
	let introHeaderAnim: JSAnimation;
	let introNavFadeAnim: JSAnimation;
	let introAnimations: JSAnimation[];

	const introDelay = 1000;

	// Event handlers:
	const onIntroLinkClick = (title: string) => {
		selected = title;

		if (selected !== '') {
			comingSoonAnimation.restart();
		}
	};

	const onReplayButtonClick = () => {
		introAnimations.forEach((anim: JSAnimation) => {
			anim?.restart();
		});
	};

	onMount(() => {
		isMounted = true;

		// Animations

		// Intro:
		introHeaderAnim = animate('h1', {
			delay: introDelay,
			y: { from: '25vh', ease: 'outQuad' }
		});
		introNavFadeAnim = animate('.introlink, #tech-stack-menu', {
			delay: stagger(400, { start: introDelay }),
			opacity: [0, 1]
		});
		introAnimations = [introHeaderAnim, introNavFadeAnim];

		comingSoonAnimation = animate('#coming-soon', {
			opacity: 1,
			alternate: true,
			loop: 1,
			loopDelay: 50,
			duration: 500,
			ease: 'outQuad',
			// delay: 250,
			autoplay: false
			// onBegin: (self) => (isIntroAnimationPlaying = true),
			// onComplete: (self) => (isIntroAnimationPlaying = false),
		});
	});
</script>

{#snippet IntroLink(title: string)}
	<button
		class="introlink cursor-pointer transition-colors hover:text-white"
		onclick={() => {
			onIntroLinkClick(title);
		}}
	>
		<li class="">{title}</li></button
	>
{/snippet}

<div
	class={cn('flex h-screen w-screen flex-col items-center bg-black', { 'opacity-0': !isMounted })}
>
	<button
		class="absolute top-0 right-0 cursor-pointer p-4 text-gray-200"
		onclick={onReplayButtonClick}>REPLAY</button
	>
	<main class="flex size-full flex-col items-center justify-evenly px-12 text-gray-700">
		<h1 class="text-5xl transition-colors hover:text-white md:text-9xl">Derek Santolo</h1>
		<ul class="flex w-full max-w-[980px] justify-around">
			{#each ['Software', 'Music', 'Gaming', 'Blog'] as title}
				{@render IntroLink(title)}
			{/each}
		</ul>
		<h3 id="coming-soon" class="top-12 text-gray-100 opacity-0">Coming Soon</h3>
		<!-- Tech stack menu -->
		<button
			id="tech-stack-menu"
			class="cursor-pointer"
			aria-label="Open Tech Stack Menu"
			onclick={() => (isTechStackOpen = !isTechStackOpen)}
		>
			<span class="flex flex-col items-center gap-1.5">
				<span
					class={cn('h-1 w-8 origin-center rounded-full bg-gray-700 transition-transform', {
						'translate-y-2.5 rotate-z-42': isTechStackOpen
					})}
				></span>
				<span
					class={cn('h-1 w-8 rounded-full bg-gray-700 transition-opacity', {
						'opacity-0': isTechStackOpen
					})}
				></span>
				<span
					class={cn('h-1 w-8 origin-center rounded-full bg-gray-700 transition-transform', {
						'-translate-y-2.5 -rotate-z-42': isTechStackOpen
					})}
				></span>
			</span>
		</button>
	</main>
	<footer class="text-gray-700 blur-xl transition-all duration-500 hover:blur-none">
		And despite all that...can we really leave the good left undone?
	</footer>
</div>
