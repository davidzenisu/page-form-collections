import { mysqlTable, serial, int, varchar, datetime, time, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { register } from 'module';

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
	id: varchar({ length: 128 }).$defaultFn(() => createId()).primaryKey(),
	inserted_at: timestamp('inserted_at').notNull().defaultNow(),
	name: varchar('name', { length: 50 }).notNull(),
	description: varchar('description', { length: 255 }),
	time: datetime('time').notNull(),
});

export const eventRelations = relations(event, ({ many }) => ({
	registration: many(registration),
}));


export const registration = mysqlTable('registration', {
	id: varchar({ length: 128 }).$defaultFn(() => createId()).primaryKey(),
	inserted_at: timestamp('inserted_at').notNull().defaultNow(),
	activity: varchar('activity', { length: 50 }).notNull(),
	name: varchar('name', { length: 24 }).notNull(),
	company: boolean('company').notNull().default(false),
	time: time('time').notNull(),
	eventId: varchar('event_id', { length: 128 })
		.notNull()
		.references(() => event.id, { onDelete: 'cascade' }),
});

export const registrationRelations = relations(registration, ({ one }) => ({
	author: one(event, {
		fields: [registration.eventId],
		references: [event.id],
	}),
}));

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Event = typeof event.$inferSelect;

export type Registration = typeof registration.$inferSelect;