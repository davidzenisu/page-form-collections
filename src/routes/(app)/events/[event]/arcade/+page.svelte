<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

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
	$formData.time = '15:00';

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
								<Form.Label>Start Time</Form.Label>
								<Select.Root
									type="single"
									bind:value={$formData.time}
									name={props.name}
									disabled={true}
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
					<Form.Button>Submit</Form.Button>
					{#if $message}
						<div
							class:text-primary={$message.type == 'success'}
							class:text-error={$message.type == 'error'}
						>
							{$message.text}
						</div>
					{/if}
					{#if data.committed && !$message}
						<div class="text-primary">You're already registered!</div>
					{/if}
				</fieldset>
			</form>
		</Card.Content>
	</Card.Root>
</div>
