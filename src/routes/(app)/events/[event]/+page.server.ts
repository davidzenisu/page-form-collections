import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

import { superValidate } from "sveltekit-superforms";
import { registrationSchema } from "$lib/forms/schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ params }) => {
    const event = await db.query.event.findFirst({
        where: eq(table.event.id, params.event)
    });
    const form = await superValidate(zod(registrationSchema));
    if (event) {
        return {
            event,
            form
        };
    }
    error(404, 'Not found');
}