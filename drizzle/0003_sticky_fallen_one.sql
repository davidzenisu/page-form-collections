ALTER TABLE `registration` MODIFY COLUMN `name` varchar(24) NOT NULL;--> statement-breakpoint
ALTER TABLE `registration` ADD `activity` varchar(50) NOT NULL;