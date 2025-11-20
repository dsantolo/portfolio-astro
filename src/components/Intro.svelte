<script lang="ts">
	import IntroSection from './IntroSection.svelte';
	import { onMount } from 'svelte';
	import { animate, stagger, JSAnimation } from 'animejs';
	import { cn } from '@/utils/cn.ts';
	import GitHubLogo from '../assets/github-mark.svg';
	import MailSVG from '../assets/mail.svelte';
	import LinkedInLogo from '../assets/linkedin-logo.png';

	let isMounted = $state(false);
	let isTechStackOpen = $state(false);
	let selected: string = $state('Software');

	// Declare animations:
	let comingSoonAnimation: JSAnimation;
	let resumeAnimation: JSAnimation;
	let introHeaderAnim: JSAnimation;
	let introNavFadeAnim: JSAnimation;
	let introAnimations: JSAnimation[];

	const introLinkTitles = ['Software', 'Music', 'Gaming', 'Blog'];
	const introDelay = 200;
	const introHeaderAnimDuration = 400;

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
			duration: introHeaderAnimDuration,
			y: { from: '25vh', ease: 'outQuad' },
			ease: 'inOutQuad'
		});
		introNavFadeAnim = animate(
			'.Snippet-introlink, #resume-link, .logos-container, .intro-section',
			{
				delay: stagger(250, { start: introDelay + introHeaderAnimDuration }),
				opacity: [0, 1]
			}
		);
		introAnimations = [introHeaderAnim, introNavFadeAnim];

		comingSoonAnimation = animate('#coming-soon', {
			opacity: 1,
			alternate: true,
			loop: 1,
			loopDelay: 50,
			duration: 500,
			ease: 'outQuad',
			autoplay: false
		});
	});
</script>

{#snippet IntroLink(title: string)}
	<button
		class={cn(
			'Snippet-introlink w-36 cursor-pointer rounded-2xl border-2 bg-linear-to-br from-black from-50% to-white px-2 text-xl text-white transition-colors duration-300 hover:text-white',
			{
				'to-white text-white': selected == title,
				'to-white/50 text-white/50': selected !== title
			}
		)}
		onclick={() => {
			onIntroLinkClick(title);
		}}
	>
		<li class="">{title}</li></button
	>
{/snippet}

{#snippet genericDescription(classes: string, descriptionText: string)}
	<p
		class={cn(
			'z-50 max-w-[980px] rounded-2xl border-2 border-gray-700 bg-linear-to-br from-gray-950 from-75% to-stone-950 p-4',
			classes
		)}
	>
		{@html descriptionText}
	</p>
{/snippet}

<div
	class={cn({
		'opacity-0': !isMounted
	})}
>
	<button
		class="absolute top-0 right-0 m-4 size-7 origin-top-right rounded-3xl bg-gradient-to-br p-2 text-gray-200 transition-transform hover:scale-200"
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
		<div
			class="h-px w-full bg-linear-to-r from-transparent via-gray-100 to-transparent group-hover:scale-x-150"
		></div>
		<div
			class="flex min-h-screen flex-col items-center justify-between py-8 md:min-h-[75vh] md:justify-evenly md:py-2"
		>
			<h1 class="text-5xl transition-colors hover:text-white md:text-9xl">Derek Santolo</h1>
			<ul class="flex size-full flex-col items-center justify-center gap-12 md:h-auto md:flex-row">
				{#each introLinkTitles as title}
					{#if title === 'Blog'}
						<a href="/blog" class="">
							{@render IntroLink(title)}
						</a>
					{:else}
						{@render IntroLink(title)}
					{/if}
				{/each}
			</ul>
			<h2 id="coming-soon" class="flex flex-col justify-center text-gray-100 opacity-0">
				Coming Soon
			</h2>
			<a id="resume-link" href="/resume.pdf"
				><h2
					class="bg-linear-to-b from-white to-gray-700 bg-clip-text text-4xl text-transparent transition-colors hover:text-gray-200"
				>
					Résumé
				</h2></a
			>
			<div class="logos-container flex w-screen items-center justify-evenly gap-4 px-4 md:w-full">
				<a href="https://github.com/dsantolo">
					<img src={GitHubLogo.src} alt="GitHub Logo" class="size-24 shrink" />
				</a>
				<a href="mailto:derek.santolo@gmail.com">
					<MailSVG
						className=" fill-gray-700 hover:fill-gray-200 transition-colors size-24 shrink"
					/>
				</a>
				<a href="https://linkedin.com/in/dereksantolo">
					<img src={LinkedInLogo.src} alt="LinkedIn Logo" class="h-24 shrink" />
				</a>
			</div>
		</div>
		<IntroSection
			heading={'Frontend'}
			date={'2019-2025'}
			entities={'Pepperdine, Apple, USC'}
			classes="from-red-950"
		>
			{#snippet description()}
				{@render genericDescription(
					'to-red-950',
					`I was a frontend developer at Apple for three years. I worked on the Apple Online Store, where I did my best to build pages that achieved the vision of Apple's designers while also optimizing performance and accessibility. I was involved with product launches and built user-facing pages (<a class="hover:text-blue-300"href="https://www.apple.com/shop/buy-mac/mac-studio?bfil=2&option.thunderbolt_aos_phantom_z1cd=065-CGXJ&option.memory_aos_phantom_z1cd=065-CGWM&option.processor_and_graphics_aos_phantom_z1cd=065-CGWH&option.sw_final_cut_pro_z1cd=065-CGXT&option.sw_logic_pro_z1cd=065-CGXW&option.hard_drivesolid_state_drive_aos_phantom_z1cd=065-CKT9&product=mu963ll/a&step=add_ons">like this</a>) that served millions of customers. I also built landing pages driven by an internal JS animation library (similar to Motion). Last year, I rebuilt the <a class="hover:text-blue-300"href="https://mobilemedia.usc.edu">website for USC's Mobile and Environmental Media Lab</a> using Astro, Svelte 5 and Tailwind 4.`
				)}
			{/snippet}
		</IntroSection>
		<IntroSection heading={'Graphics'} date={'2024-2025'} entities={'USC'} classes="from-cyan-950">
			{#snippet description()}
				{@render genericDescription(
					'to-cyan-950',
					'I recently obtained an M.S. in Computer Science at USC, primarily to learn more about game development and computer graphics. I took courses such as Game Engine Development, Computer Graphics, and Computer Animation and Simulation. Additionally, I am reading "Metal by Tutorial" by Caroline Begbie to teach myself Metal. I hope to produce some Metal demos soon!'
				)}
			{/snippet}
		</IntroSection>
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
	<footer
		class="w-full border-b text-center text-gray-700 blur-xl transition-all duration-500 hover:blur-none"
	>
		And despite all that...we still shouldn't leave the good undone.
	</footer>
	<div
		class="h-px w-full bg-linear-to-r from-transparent via-gray-100 to-transparent group-hover:scale-x-150"
	></div>
</div>
