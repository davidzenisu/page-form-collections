<script>
	import * as Card from '$lib/components/ui/card/index.js';
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

<div>
	<h1>Upcoming events!</h1>
	<ul class="todos">
		{#each data.events as event}
			<a href={`/events/${event.id}`}>
				<Card.Root class="w-full max-w-sm">
					<Card.Header>
						<Card.Title>{event.name}</Card.Title>
					</Card.Header>
					<Card.Content>
						<div>{event.description}</div>
					</Card.Content>
					<Card.Footer class="flex-col items-end gap-2">
						<div>{event.time.toLocaleString('en-GB', dateOptions)}</div>
					</Card.Footer>
				</Card.Root>
			</a>
		{/each}
	</ul>
</div>
