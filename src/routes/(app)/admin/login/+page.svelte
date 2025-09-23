<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { ActionData } from './$types';

	let { form, data } = $props();
</script>

<div>
	{#if !data.user}
		<h1>Login/Register</h1>
		<form method="post" action="?/login" use:enhance>
			<label>
				Username
				<input
					name="username"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<label>
				Password
				<input
					type="password"
					name="password"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<button class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>Login</button
			>
			<button
				formaction="?/register"
				class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>Register</button
			>
		</form>
	{/if}
	{#if data.user}
		<p>You're logged in as {data.user.username}.</p>
		<p>Your are {data.user.isAdmin ? '' : 'NOT'} an admin.</p>
		<form method="post" action="?/logout" use:enhance>
			<Button type="submit" variant="destructive">Logout</Button>
		</form>
	{/if}
</div>

<p style="color: red">{form?.message ?? ''}</p>
