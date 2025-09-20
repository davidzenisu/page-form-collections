<script>
	let { data } = $props();
	const title = 'Arcade Competition';
	const description = 'Face off in an epic competition in';
	import eventImage from '$lib/images/arcade_event.jpg';
</script>

<div class="flex flex-col items-center gap-3">
	<h1>{data.event.name} - {title}</h1>
	<h2>{description}</h2>
	<h2 class="text-primary">
		<a
			href="https://www.capcom-games.com/marvel-vs-capcom-fc/en-us/title/marvel-vs-capcom2/"
			target="_blank"
			rel="noopener noreferrer">Marvel vs. Capcom 2</a
		>
	</h2>
	<div>__________</div>
	<div>3:00 - 5:00 PM</div>
	<div><b>Prices included!</b></div>
	<img src={eventImage} alt={data.event.name} class="my-4 max-h-64 rounded-md" />
</div>
