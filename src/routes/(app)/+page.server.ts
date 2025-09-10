import { db } from '$lib/server/db';

import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
    return {
        events: await db.select().from(table.event)
    };
}