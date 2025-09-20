<script>
	let { data } = $props();
	import eventImage from '$lib/images/main_event.jpg';
	import arcadeImage from '$lib/images/arcade_event.jpg';
	import vrImage from '$lib/images/vr_event.jpg';
	import whisyImage from '$lib/images/whisky_event.jpg';

	import * as Card from '$lib/components/ui/card/index.js';

	const activities = [
		{
			name: 'Arcade Competition',
			path: 'arcade',
			time: '3:00 - 5:00 PM',
			image: arcadeImage,
			description: 'Face off in an epic arcade fight!'
		},
		{
			name: 'VR Competition',
			path: 'vr',
			time: '3:00 - 5:00 PM',
			image: vrImage,
			description: 'Face off in the Virtual Space.'
		},
		{
			name: 'Whisky Tasting',
			path: 'whisky',
			time: '6:00 PM',
			image: whisyImage,
			description: 'Getting drunk with style!'
		}
	];
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
	<img src={eventImage} alt={data.event.name} class="my-4 max-h-64 rounded-md" />

	<div class="flex flex-col items-center gap-4">
		<h2>Activities</h2>
		<ul class="flex flex-col justify-between gap-4 lg:flex-row">
			{#each activities as activity}
				<a href={`/events/${data.event.id}/${activity.path}`}>
					<Card.Root class="w-full max-w-sm">
						<Card.Header>
							<Card.Title>{activity.name}</Card.Title>
						</Card.Header>
						<Card.Content>
							<div>{activity.description}</div>
							<img src={activity.image} alt={activity.name} class="mt-2 rounded-md" />
						</Card.Content>
						<Card.Footer class="flex-row items-end justify-between gap-2">
							<div>Register now!</div>
							<div>{activity.time}</div>
						</Card.Footer>
					</Card.Root>
				</a>
			{/each}
		</ul>
	</div>
</div>
