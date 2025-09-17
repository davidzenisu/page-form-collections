import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ cookies }) => {
	let id = cookies.get('userid');

	if (!id) {
		id = crypto.randomUUID();
		cookies.set('userid', id, { path: '/' });
	}

	return {
		events: await db.select().from(table.event),
		pictures: await db.select().from(table.picture)
	};
};

export const actions = {
	create: async ({ cookies, request }: RequestEvent) => {
		const data = await request.formData();
		await db.insert(table.event).values({
			name: data.get('name') as string,
			time: new Date(data.get('time') as string),
			description: data.get('description') as string
		});
	},

	delete: async ({ cookies, request }: RequestEvent) => {
		const data = await request.formData();
		await db.delete(table.event).where(eq(table.event.id, data.get('id') as string));
	},

	upload: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const file = data.get('file') as File;
		const eventId = data.get('id') as string;
		// get file ending
		const fileEnding = file.name.split('.').pop();
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		await db.insert(table.picture).values({
			eventId: eventId,
			data: buffer,
			mimeType: file.type
		})
		// would work but not recommended to be stored in database!
		// const base64String = buffer.toString('base64');
		// console.log(base64String);
	}
};
