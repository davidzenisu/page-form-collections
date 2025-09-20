<script lang="ts">
	import eventImage from '$lib/images/main_event.jpg';
	import arcadeImage from '$lib/images/arcade_event.jpg';
	import vrImage from '$lib/images/vr_event.jpg';
	import whisyImage from '$lib/images/whisky_event.jpg';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	import { registrationSchema, type RegistrationSchema } from '$lib/forms/schema.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let data = $props();
	const form = superForm(data.form, {
		validators: zodClient(registrationSchema)
	});
	const { form: formData, enhance } = form;

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

	<Card.Root class="w-full max-w-sm border-0">
		<Card.Header>
			<Card.Title>Register now!</Card.Title>
			<Card.Description>Enter your name below to get onto the guest list.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Username</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Submit</Form.Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full">Register!</Button>
		</Card.Footer>
	</Card.Root>

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
