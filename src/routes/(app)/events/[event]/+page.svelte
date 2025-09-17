<script>
	let { data } = $props();
	import eventImage from '$lib/images/main_event.jpg';
</script>

<div class="flex flex-col items-center gap-3">
	<h1>{data.event.name}</h1>
	<div>{data.event.description}</div>
	<div>
		{data.event.time.toLocaleString('en-GB', {
			dateStyle: 'full',
			timeStyle: 'short',
			timeZone: 'UTC'
		})}
	</div>
	<img src={eventImage} alt={data.event.name} class="my-4 rounded-md" />
</div>
