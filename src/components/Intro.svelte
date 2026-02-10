<script lang="ts">
	import IntroSection from './IntroSection.svelte';
	import { onMount } from 'svelte';
	import { animate, stagger, JSAnimation } from 'animejs';
	import { cn } from '@/utils/cn.ts';
	import GitHubSVG from '../assets/github-mark.svelte';
	import MailSVG from '../assets/mail.svelte';
	import LinkedInSVG from '../assets/linkedin-logo.svelte';

	let isMounted = $state(false);
	let isTechStackOpen = $state(false);

	// Declare animations:
	let introHeaderAnim: JSAnimation;
	let introNavFadeAnim: JSAnimation;
	let introAnimations: JSAnimation[];

	const introLinks = [
		{ label: 'Software', href: '/' },
		{ label: 'Music', href: '/music' },
		{ label: 'Gaming', href: '/gaming' },
		{ label: 'Blog', href: '/blog' }
	];
	const introActiveLabel = 'Software';
	const introDelay = 200;
	const introHeaderAnimDuration = 400;

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
			'nav, .Snippet-introlink, #resume-link, .logos-container, .intro-section',
			{
				delay: stagger(250, { start: introDelay + introHeaderAnimDuration }),
				opacity: [0, 1]
			}
		);
		introAnimations = [introHeaderAnim, introNavFadeAnim];
	});
</script>

{#snippet IntroLink(title: string, href: string)}
	<li class="list-none">
		<a
			{href}
			class={cn(
				'Snippet-introlink rounded-full px-2.5 py-1 text-white/60 transition-colors duration-150 ease-out hover:bg-white/20 hover:text-white sm:px-3 sm:py-1.5',
				{
					'bg-white/20 text-white': title === introActiveLabel
				}
			)}
		>
			{title}
		</a>
	</li>
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
		class="absolute top-0 right-0 m-4 size-7 origin-top-right rounded-3xl bg-gradient-to-br p-2 text-gray-200 transition-transform duration-150 ease-out hover:scale-200"
		onclick={onReplayButtonClick}
		aria-label="Replay"
		><svg
			class="fill-gray-700 transition-colors duration-150 ease-out hover:fill-white"
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
	<main class="group/main flex flex-col items-center justify-evenly text-gray-700">
		<div
			class="h-px w-full bg-linear-to-r from-transparent via-gray-100 to-transparent transition-transform duration-150 ease-out group-hover/main:scale-x-150"
		></div>
		<div
			class="flex min-h-screen flex-col items-center justify-center gap-8 py-10 md:min-h-[75vh] md:gap-10 md:py-6"
		>
			<h1
				class="animate-gradient-text bg-linear-60 from-gray-200 from-85% to-gray-700 bg-clip-text text-2xl text-transparent md:text-3xl lg:text-5xl"
			>
				Derek Santolo
			</h1>
			<nav
				class="w-full max-w-md rounded-full border border-white/15 bg-black/60 px-3 py-2 text-xs backdrop-blur-lg sm:w-auto sm:max-w-none sm:px-5 sm:py-2.5 sm:text-sm lg:px-8 lg:py-4 lg:text-lg"
				aria-label="Primary"
			>
				<ul class="flex flex-nowrap items-center justify-between gap-2 sm:gap-4 lg:gap-6">
					{#each introLinks as link}
						{@render IntroLink(link.label, link.href)}
					{/each}
				</ul>
			</nav>
			<div
				class="logos-container grid w-full grid-cols-2 place-items-center gap-6 px-6 sm:grid-cols-4 sm:gap-4 lg:gap-8"
			>
				<a
					href="https://github.com/dsantolo"
					class="group flex h-16 w-20 items-center justify-center rounded-2xl border border-white/15 bg-black/60 p-2 backdrop-blur-lg transition-colors duration-150 ease-out hover:bg-white/20 md:h-20 md:w-24 lg:h-24 lg:w-32"
				>
					<GitHubSVG
						className="fill-gray-700 group-hover:fill-gray-200 transition-colors duration-150 ease-out h-10 w-auto md:h-12 lg:h-14"
					/>
				</a>
				<a
					href="mailto:derek.santolo@gmail.com"
					class="group flex h-16 w-20 items-center justify-center rounded-2xl border border-white/15 bg-black/60 p-2 backdrop-blur-lg transition-colors duration-150 ease-out hover:bg-white/20 md:h-20 md:w-24 lg:h-24 lg:w-32"
				>
					<MailSVG
						className="fill-gray-700 group-hover:fill-gray-200 transition-colors duration-150 ease-out size-10 md:size-12 lg:size-14"
					/>
				</a>
				<a
					href="https://linkedin.com/in/dereksantolo"
					class="group flex h-16 w-20 items-center justify-center rounded-2xl border border-white/15 bg-black/60 p-2 backdrop-blur-lg transition-colors duration-150 ease-out hover:bg-white/20 md:h-20 md:w-24 lg:h-24 lg:w-32"
				>
					<LinkedInSVG
						className="fill-gray-700 group-hover:fill-gray-200 transition-colors duration-150 ease-out h-10 w-auto md:h-12 lg:h-14"
					/>
				</a>
				<a
					id="resume-link"
					href="/resume.pdf"
					class="group flex h-16 w-20 items-center justify-center rounded-2xl border border-white/15 bg-black/60 p-2 backdrop-blur-lg transition-colors duration-150 ease-out hover:bg-white/20 md:h-20 md:w-24 lg:h-24 lg:w-32"
				>
					<span
						class="bg-linear-to-b from-white to-gray-700 bg-clip-text text-sm font-semibold text-transparent transition-colors duration-150 ease-out group-hover:text-gray-200 md:text-base lg:text-lg"
					>
						Résumé
					</span>
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
					`I was a frontend developer at Apple for three years. I worked on the Apple Online Store, where I did my best to build pages that achieved the vision of Apple's designers while also optimizing performance and accessibility. I was involved with product launches and built user-facing pages (<a class="transition-colors duration-150 ease-out hover:text-blue-300" href="https://www.apple.com/shop/buy-mac/mac-studio?bfil=2&option.thunderbolt_aos_phantom_z1cd=065-CGXJ&option.memory_aos_phantom_z1cd=065-CGWM&option.processor_and_graphics_aos_phantom_z1cd=065-CGWH&option.sw_final_cut_pro_z1cd=065-CGXT&option.sw_logic_pro_z1cd=065-CGXW&option.hard_drivesolid_state_drive_aos_phantom_z1cd=065-CKT9&product=mu963ll/a&step=add_ons">like this</a>) that served millions of customers. I also built landing pages driven by an internal JS animation library (similar to Motion). Last year, I rebuilt the <a class="transition-colors duration-150 ease-out hover:text-blue-300" href="https://mobilemedia.usc.edu">website for USC's Mobile and Environmental Media Lab</a> using Astro, Svelte 5 and Tailwind 4.`
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
		class="w-full border-b text-center text-gray-700 blur-xl transition-all duration-150 ease-out hover:blur-none"
	>
		And despite all that...we still shouldn't leave the good undone.
	</footer>
	<div
		class="h-px w-full bg-linear-to-r from-transparent via-gray-100 to-transparent transition-transform duration-150 ease-out group-hover/main:scale-x-150"
	></div>
</div>
