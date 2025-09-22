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
				<form method="POST" action="?/delete">
					<input type="hidden" name="id" value={event.id} />
					<span>{event.name}</span>
					<span>{event.time.toLocaleString('en-GB', dateOptions)}</span>
					<button aria-label="Delete">🗑️</button>
				</form>
				<div>
					{#each event.registration as registration}
						<div>
							Activity: {registration.activity} | Name: {registration.name} | +1: {registration.company}
							| Time: {registration.time}
						</div>
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</div>
