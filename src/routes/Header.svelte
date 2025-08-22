<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';

	interface Section {
		href?: string;
		label: string;
	}

	interface Props {
		/** Is this the principal call to action on the page? */
		sections: Record<string, Section>;
		subsection?: string;
	}

	const { subsection = '/', ...props }: Props = $props();
</script>

<header>
	<div class="corner">
		<a href={subsection}>
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path class="fill-primary dark:fill-primary-dark" d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<!-- https://v3.tailwindcss.com/docs/reusing-styles -->
		<ul class="bg-primary dark:bg-primary-dark">
			{#each Object.entries(props.sections) as [key, section]}
				<!-- https://github.com/tailwindlabs/tailwindcss/discussions/9563	 -->
				<li
					class="
					 data-[aria-current=page]:before:text-red
					data-[aria-current=page]:before:absolute
					data-[aria-current=page]:before:top-0
					data-[aria-current=page]:before:left-1/2
					data-[aria-current=page]:before:h-0
					data-[aria-current=page]:before:w-0
					data-[aria-current=page]:before:border-6
					data-[aria-current=page]:before:border-t-6
					data-[aria-current=page]:before:border-transparent
					data-[aria-current=page]:before:border-t-primary
					data-[aria-current=page]:before:content-['']
					before:dark:data-[aria-current=page]:border-t-primary-dark
					"
					aria-current={(!section.href && page.url.pathname === subsection) ||
					(section.href && page.url.pathname.startsWith(`${subsection}/${section.href}`))
						? 'page'
						: undefined}
					data-aria-current={(!section.href && page.url.pathname === subsection) ||
					(section.href && page.url.pathname.startsWith(`${subsection}/${section.href}`))
						? 'page'
						: undefined}
				>
					<a
						href={subsection === '/'
							? `${subsection}${section.href || ''}`
							: `${subsection}/${section.href || ''}`}
						class="text-on-primary hover:text-tertiary dark:text-on-primary dark:hover:text-tertiary-dark"
						>{section.label}</a
					>
				</li>
			{/each}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path class="fill-primary dark:fill-primary-dark" d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	{#if PUBLIC_GITHUB_URL}
		<div class="corner">
			<a href={PUBLIC_GITHUB_URL} target="_blank" rel="noopener noreferrer">
				<img src={github} alt="GitHub" />
			</a>
		</div>
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
</style>
