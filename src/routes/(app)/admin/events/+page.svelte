<script>
	let { data } = $props();

	let fileinput = $state();

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

<div class="centered flex flex-col items-center gap-4">
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
	<h2>Current events:</h2>
	<ul class="todos flex flex-col items-center gap-2">
		{#each data.events as event}
			<li class="flex flex-row items-center gap-4">
				<span>{event.name}</span>
				<span>{event.time.toLocaleString('en-GB', dateOptions)}</span>
				<form method="POST" action="?/delete">
					<input type="hidden" name="id" value={event.id} />
					<button aria-label="Delete">🗑️</button>
				</form>

				<form method="POST" action="?/upload" enctype="multipart/form-data">
					<input type="hidden" name="id" value={event.id} />
					<button
						type="button"
						class="chan"
						onclick={() => {
							fileinput.click();
						}}
					>
						⬆️
					</button>
					<input
						style="display:none"
						type="file"
						name="file"
						accept=".jpg, .jpeg, .png"
						bind:this={fileinput}
						onchange={() => {
							fileinput.form.requestSubmit();
						}}
					/>
				</form>
				<img
					src="data:image/png;base64;{data.pictures
						.find((p) => p.eventId === event.id)
						?.data?.toString()}"
					alt="Event picture for {event.name}"
				/>
			</li>
		{/each}
	</ul>
</div>
