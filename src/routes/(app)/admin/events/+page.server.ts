import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

import type { PageServerLoad } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';
import { groupBy } from '$lib/utils';
import { getRequestEvent } from '$app/server';

export const load: PageServerLoad = async ({ cookies }) => {
    requireLogin();
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
        const registrationGroup = groupBy(event.registration, reg => reg.activity);
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

    logout: async (event: RequestEvent) => {
        console.log('Logging out');
        if (!event.locals.session) {
            return fail(401);
        }
        await auth.invalidateSession(event.locals.session.id);
        auth.deleteSessionTokenCookie(event);

        return redirect(302, '/admin/login');
    }
};

function requireLogin() {
    const { locals } = getRequestEvent();

    if (!locals.user) {
        return redirect(302, '/admin/login');
    } else if (!locals.user.isAdmin) {
        return redirect(302, '/admin/login');
    }

    return locals.user;
}
