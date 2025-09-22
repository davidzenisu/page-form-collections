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

    const events = await db.query.event.findMany({
        orderBy: (event, { desc }) => [desc(event.time)],
        with: {
            registration: {
                orderBy: (registration, { asc }) => [asc(registration.activity)],
            }
        }
    });

    // Add registrationGroup to each event, grouping its registrations by activity
    const eventsWithGroups = events.map(event => {
        const registrationGroup: Map<string, Array<table.Registration>> = new Map();
        event.registration.forEach(registration => {
            if (!registrationGroup.has(registration.activity)) {
                registrationGroup.set(registration.activity, []);
            }
            registrationGroup.get(registration.activity)?.push(registration);
        });
        return {
            ...event,
            registrationGroup
        };
    });

    return {
        events: eventsWithGroups
    };
}

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
    }
};
