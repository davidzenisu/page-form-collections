import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

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
    const formCache = JSON.parse(cookies.get(`${params.event}_main`) ?? 'null');
    console.log('Form cookie: ', formCache);

    if (event) {
        return {
            event,
            form,
            formCache
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
        cookies.set(`${params.event}_main`, JSON.stringify(form.data), { path: '/' });
        return { form };

    },
};