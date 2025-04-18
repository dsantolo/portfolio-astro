<script lang="ts">
	import IntroSection from './IntroSection.svelte';
	import { onMount } from 'svelte';
	import { animate, stagger, JSAnimation } from 'animejs';
	import { cn } from '../utils.ts';

	let isMounted = $state(false);
	let isTechStackOpen = $state(false);
	let selected: string = $state('Software');

	// Declare animations:
	let comingSoonAnimation: JSAnimation;
	let introHeaderAnim: JSAnimation;
	let introNavFadeAnim: JSAnimation;
	let introAnimations: JSAnimation[];

	const introDelay = 200;

	// Event handlers:
	const onIntroLinkClick = (title: string) => {
		selected = title;

		if (selected !== 'Software') {
			comingSoonAnimation.restart();
			selected = 'Software';
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
		introNavFadeAnim = animate('.introlink, .intro-section', {
			delay: stagger(250, { start: introDelay + 200 }),
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
		class={cn('introlink cursor-pointer text-xl transition-colors hover:text-white', {
			'text-white': selected === title
		})}
		onclick={() => {
			onIntroLinkClick(title);
		}}
	>
		<li class="">{title}</li></button
	>
{/snippet}

<div
	class={cn({
		'opacity-0': !isMounted
	})}
>
	<button
		class="absolute top-0 right-0 m-4 size-7 origin-top-right cursor-pointer rounded-3xl bg-gradient-to-br p-2 text-gray-200 transition-transform hover:scale-200"
		onclick={onReplayButtonClick}
		aria-label="Replay"
		><svg
			class="fill-gray-700 hover:fill-white"
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 74.999 74.999"
			xml:space="preserve"
		>
			<g>
				<path
					d="M33.511,71.013c15.487,0,28.551-10.563,32.375-24.859h9.113L61.055,22L47.111,46.151h8.006
				c-3.44,8.563-11.826,14.628-21.605,14.628c-12.837,0-23.28-10.443-23.28-23.28c0-12.836,10.443-23.28,23.28-23.28
				c6.604,0,12.566,2.768,16.809,7.196l5.258-9.108c-5.898-5.176-13.619-8.32-22.065-8.32C15.034,3.987,0,19.019,0,37.5
				C-0.002,55.981,15.03,71.013,33.511,71.013z"
				/>
			</g>
		</svg>
	</button>
	<main class="flex flex-col items-center justify-evenly text-gray-700">
		<div class="flex h-[75vh] flex-col items-center justify-center py-8 md:justify-evenly md:py-2">
			<h1 class="text-5xl transition-colors hover:text-white md:text-9xl">Derek Santolo</h1>
			<ul class="flex h-full w-full flex-col justify-around md:h-auto md:flex-row">
				{#each ['Software', 'Music', 'Gaming', 'Blog'] as title}
					{@render IntroLink(title)}
				{/each}
			</ul>
			<h2 id="coming-soon" class="flex flex-col justify-center text-gray-100 opacity-0">
				Coming Soon
			</h2>
		</div>
		<IntroSection
			heading={'Frontend'}
			body={"I was a frontend developer at  for three years. Here I did my best to build pages that achieved the vision of Apple's designers while also optimizing performance and accessibility. Last year, I rebuilt the website for USC\'s Mobile and Environmental Media Lab using Astro, Svelte 5 and Tailwind 4."}
			date={'2019-2025'}
			entities={'Pepperdine, , USC'}
		/>
		<IntroSection
			heading={'Graphics'}
			body={'I am currently attending USC pursuing an M.S. in Computer Science, primarily to learn more about game development and computer graphics. Additionally, I am reading \"Metal by Tutorial\" by Caroline Begbie. I hope to produce some Metal demos soon!'}
			date={'2024-2025'}
			className="from-purple-950 mt-48"
			entities={'USC'}
		/>
		<!-- Tech stack menu -->
		<!-- <button
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
		</button> -->
	</main>
	<footer class="text-gray-700 blur-xl transition-all duration-500 hover:blur-none">
		And despite all that...we still shouldn't leave the good undone.
	</footer>
</div>
