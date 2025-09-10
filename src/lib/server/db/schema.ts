import { mysqlTable, serial, int, varchar, datetime, timestamp } from 'drizzle-orm/mysql-core';
import { createId } from '@paralleldrive/cuid2';
import { time } from 'console';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const event = mysqlTable('event', {
	id: varchar({ length: 128 }).$defaultFn(() => createId()),
	inserted_at: timestamp('inserted_at').notNull().defaultNow(),
	name: varchar('name', { length: 50 }).notNull(),
	description: varchar('description', { length: 255 }),
	time: datetime('time').notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Event = typeof event.$inferSelect;
