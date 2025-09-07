<script>
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
			<span>{event.name}</span>
			<span>{event.time.toLocaleString('en-GB', dateOptions)}</span>
		{/each}
	</ul>
</div>
