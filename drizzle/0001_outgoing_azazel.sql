CREATE TABLE `event` (
	`id` varchar(128),
	`inserted_at` timestamp NOT NULL DEFAULT (now()),
	`name` varchar(50) NOT NULL,
	`description` varchar(255),
	`time` datetime NOT NULL
);
