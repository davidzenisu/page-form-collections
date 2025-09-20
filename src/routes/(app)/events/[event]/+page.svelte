<script lang="ts">
	import eventImage from '$lib/images/main_event.jpg';
	import arcadeImage from '$lib/images/arcade_event.jpg';
	import vrImage from '$lib/images/vr_event.jpg';
	import whisyImage from '$lib/images/whisky_event.jpg';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

	import { registrationSchema, type RegistrationSchema, TimeEnum } from '$lib/forms/schema.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<RegistrationSchema>>;
			event: any;
			committed: boolean;
		};
	} = $props();
	const form = superForm(data.form, {
		validators: zodClient(registrationSchema),
		resetForm: false
	});
	const { form: formData, enhance, message } = form;

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
			<Card.Description>Enter your name below to get on the guest list.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<fieldset disabled={data.committed} class="flex flex-col gap-6">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="time">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Estimated ToA</Form.Label>
								<Select.Root
									type="single"
									bind:value={$formData.time}
									name={props.name}
									disabled={data.committed}
								>
									<Select.Trigger {...props}>
										{$formData.time ? $formData.time : 'Select a time'}
									</Select.Trigger>
									<Select.Content>
										{#each TimeEnum as timeValue}
											<Select.Item value={timeValue} label={timeValue}>{timeValue}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="company">
						<div class="flex flex-row items-start space-x-3">
							<Form.Control>
								{#snippet children({ props })}
									<Checkbox bind:checked={$formData.company} name={props.name} />
									<Form.Label>I will bring company (+1)</Form.Label>
								{/snippet}
							</Form.Control>
						</div>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button>Submit</Form.Button>
					{#if $message}
						<div
							class:text-primary={$message.type == 'success'}
							class:text-error={$message.type == 'error'}
						>
							{$message.text}
						</div>
					{/if}
					{#if data.committed}
						<div class="text-primary">You're already registered!</div>
					{/if}
				</fieldset>
			</form>
		</Card.Content>
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
