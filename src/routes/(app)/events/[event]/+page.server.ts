import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { createId } from '@paralleldrive/cuid2';

import type { PageServerLoad, Actions } from './$types';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

import { superValidate } from "sveltekit-superforms";
import { registrationSchema } from "$lib/forms/schema";
import { zod } from "sveltekit-superforms/adapters";

import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies }) => {
    const event = await db.query.event.findFirst({
        where: eq(table.event.id, params.event)
    });
    const form = await superValidate(zod(registrationSchema));
    const formCookie = cookies.get(`${params.event}_main`);
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
                time: formCache.time
            };
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
            return fail(400, {
                form,
            });
        }
        console.log('Form data is valid: ', form.data);
        // https://github.com/drizzle-team/drizzle-orm/discussions/600
        const id = createId();
        await db.insert(table.registration).values({
            id: id,
            activity: 'main',
            company: form.data.company,
            time: form.data.time,
            eventId: params.event
        });
        cookies.set(`${params.event}_main`, id, { path: '/' });
        return { form };
    },
};