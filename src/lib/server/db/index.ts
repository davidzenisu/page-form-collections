import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/mysql2/migrator';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const client = mysql.createPool(env.DATABASE_URL);

export const db = drizzle(client, { schema, mode: 'default' });

await migrate(db, {
    migrationsFolder: './drizzle'
});