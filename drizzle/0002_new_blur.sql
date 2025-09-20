CREATE TABLE `registration` (
	`id` varchar(128) NOT NULL,
	`inserted_at` timestamp NOT NULL DEFAULT (now()),
	`name` varchar(50) NOT NULL,
	`company` boolean NOT NULL DEFAULT false,
	`time` time NOT NULL,
	`event_id` varchar(128) NOT NULL,
	CONSTRAINT `registration_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `event` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `event` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `registration` ADD CONSTRAINT `registration_event_id_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE cascade ON UPDATE no action;