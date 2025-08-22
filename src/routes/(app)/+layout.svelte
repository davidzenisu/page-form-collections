<script lang="ts">
	import Header from '../Header.svelte';
	import '../../app.css';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';

	let { children } = $props();

	const sections = {
		home: { label: 'Home' },
		demo: { href: 'demo', label: 'Demo' }
	};
</script>

<div class="app bg-surface text-on-surface dark:bg-surface-dark dark:text-on-surface-dark">
	<Header {sections} />

	<main>
		{@render children()}
	</main>

	<footer>
		{#if PUBLIC_GITHUB_URL}
			<p>
				visit <a target="_blank" href={PUBLIC_GITHUB_URL}>GitHub</a> to see the source code.
			</p>
		{/if}
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
