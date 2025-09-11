import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/mysql2/migrator';

export const client = mysql.createPool(
	env.DATABASE_URL || 'mysql://user:password@host:3307/db-name'
);

export const db = drizzle(client, { schema, mode: 'default' });

export const migrateDb = async function migrateDb() {
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

	return await migrate(db, {
		migrationsFolder: './drizzle'
	});
};
