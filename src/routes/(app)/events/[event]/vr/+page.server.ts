import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { createId } from '@paralleldrive/cuid2';

import type { PageServerLoad, Actions } from './$types';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

import { message, superValidate } from "sveltekit-superforms";
import { registrationSchema } from "$lib/forms/schema";
import { zod } from "sveltekit-superforms/adapters";

const activity = 'vr';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const event = await db.query.event.findFirst({
        where: eq(table.event.id, params.event)
    });
    const form = await superValidate(zod(registrationSchema));
    const formCookie = cookies.get(`${params.event}_${activity}`);
    console.log('Form cookie: ', formCookie);
    let formCache: table.Registration | undefined;
    if (formCookie) {
        formCache = await db.query.registration.findFirst({
            where: eq(table.registration.id, formCookie)
        });
        if (formCache) {
            form.data = {
                name: formCache.name,
                company: formCache.company,
                time: formCache.time as typeof form.data.time
            };
        } else {
            cookies.delete(`${params.event}_${activity}`, { path: '/' });
        }
    }
    const committed = formCache ? true : false;
    console.log('Committed: ', committed);

    if (event) {
        return {
            event,
            form,
            committed
        };
    }
    error(404, 'Not found');
}

export const actions: Actions = {
    default: async ({ params, cookies, request }) => {
        const event = await request.formData();
        const form = await superValidate(event, zod(registrationSchema));
        if (!form.valid) {
            return message(form, {
                type: 'error',
                text: 'Please check the form for errors.'
            });
        }
        console.log('Form data is valid: ', form.data);
        // https://github.com/drizzle-team/drizzle-orm/discussions/600
        const id = createId();
        await db.insert(table.registration).values({
            id: id,
            name: form.data.name,
            activity: activity,
            company: form.data.company,
            time: form.data.time,
            eventId: params.event
        });
        cookies.set(`${params.event}_${activity}`, id, { path: '/' });
        return message(form,
            { type: 'success', text: 'You have been registered successfully!' }
        );
    },
};
