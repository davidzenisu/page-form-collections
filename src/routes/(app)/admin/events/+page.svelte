<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import * as Table from '$lib/components/ui/table/index.js';
	let { data } = $props();

	const dateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC'
	};
</script>

<div class="centered">
	<h1>Events</h1>
	<div class="flex flex-col items-center">
		<h2>Add your events below.</h2>
	</div>
	<form method="POST" action="?/create">
		<div class="flex-gap flex flex-col items-center gap-4">
			<label for="name"> Name: </label>
			<input name="name" autocomplete="off" required />
			<label for="desciption"> Description: </label>
			<input name="description" autocomplete="off" />
			<label for="date"> Date: </label>
			<input name="time" autocomplete="off" type="datetime-local" required />
			<button>Add</button>
		</div>
	</form>

	<ul class="todos">
		{#each data.events as event}
			<li>
				<span>{event.name}</span>
				<span>{event.time.toLocaleString('en-GB', dateOptions)}</span>
				<div>
					{#each Object.entries(event.registrationGroup) as [activityKey, registrations]}
						<div>
							<Table.Root>
								<Table.Caption>Registration for the {activityKey} event.</Table.Caption>
								<Table.Header>
									<Table.Row>
										<Table.Head class="w-[100px]">Name</Table.Head>
										<Table.Head>Time Of Arrival</Table.Head>
										<Table.Head>Company</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{#each registrations as registration}
										<Table.Row>
											<Table.Cell class="font-medium">{registration.name}</Table.Cell>
											<Table.Cell>{registration.time}</Table.Cell>
											<Table.Cell>{registration.company}</Table.Cell>
										</Table.Row>
									{/each}
								</Table.Body>
							</Table.Root>
						</div>
					{/each}
				</div>
			</li>
		{/each}
	</ul>

	<div>
		<form method="POST" action="?/logout" use:enhance>
			<!-- https://github.com/Azure/static-web-apps/issues/1512 -->
			<input type="hidden" name="foo" value="bar" />
			<Button type="submit">Sign out</Button>
		</form>
	</div>
</div>
