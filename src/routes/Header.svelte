<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';

	const sections = {
		home: { href: null, label: 'Home' },
		about: { href: '/about', label: 'About' },
		sverdle: { href: '/sverdle', label: 'Sverdle' },
		login: { href: '/demo/lucia', label: 'Login' }
	};
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<!-- https://v3.tailwindcss.com/docs/reusing-styles -->
		<ul>
			<!-- 
	/* li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
	} */ -->

			{#each Object.entries(sections) as [key, section]}
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
					aria-current={(!section.href && page.url.pathname === '/') ||
					(section.href && page.url.pathname.startsWith(section.href))
						? 'page'
						: undefined}
					data-aria-current={(!section.href && page.url.pathname === '/') ||
					(section.href && page.url.pathname.startsWith(section.href))
						? 'page'
						: undefined}
				>
					<a
						href={section.href || '/'}
						class="text-on-primary hover:text-tertiary dark:text-on-primary dark:hover:text-tertiary-dark"
						>{section.label}</a
					>
				</li>
			{/each}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
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
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
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
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	/* li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
	} */

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
