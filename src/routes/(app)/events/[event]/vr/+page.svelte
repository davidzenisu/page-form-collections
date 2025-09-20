<script>
	let { data } = $props();
	const title = 'VR Competition';
	const description = 'Face off in the Virtual Space';
	import eventImage from '$lib/images/vr_event.jpg';
</script>

<div class="flex flex-col items-center gap-3">
	<h1>{data.event.name} - {title}</h1>
	<h2>{description}</h2>
	<h2 class="text-primary">
		<a
			href="https://www.playstation.com/de-de/games/horizon-call-of-the-mountain/"
			target="_blank"
			rel="noopener noreferrer">Call of the Mountain</a
		>
	</h2>
	<div>__________</div>
	<div>3:00 - 5:00 PM</div>
	<div><b>Prices included!</b></div>
	<div>(No furries!)</div>
	<img src={eventImage} alt={data.event.name} class="my-4 max-h-64 rounded-md" />
	<div>
		Sponsored by <a
			href="https://resonite.com/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-primary">Resonite</a
		>
	</div>
</div>
