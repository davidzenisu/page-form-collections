CREATE TABLE `picture` (
	`id` varchar(128) NOT NULL,
	`event_id` varchar(128) NOT NULL,
	`mime_type` varchar(50) NOT NULL,
	`data` MEDIUMBLOB,
	CONSTRAINT `picture_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `event` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `event` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `picture` ADD CONSTRAINT `picture_event_id_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE no action ON UPDATE no action;