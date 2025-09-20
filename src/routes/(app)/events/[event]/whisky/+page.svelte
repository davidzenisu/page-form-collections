<script>
	let { data } = $props();
	const title = 'Whisky Tasting';
	const description = 'Getting drunk with style!';
	import eventImage from '$lib/images/whisky_event.jpg';
</script>

<div class="flex flex-col items-center gap-3">
	<h1>{data.event.name} - {title}</h1>
	<h2>{description}</h2>
	<div>__________</div>
	<div>6:00 PM</div>
	<div><b>Alcohol included!</b></div>
	<img src={eventImage} alt={data.event.name} class="my-4 max-h-64 rounded-md" />
</div>
