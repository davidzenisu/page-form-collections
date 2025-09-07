import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
    const event = await db.query.event.findFirst({
        where: eq(table.event.id, params.slug)
    });
    if (event) {
        return {
            event
        };
    }
    error(404, 'Not found');
}