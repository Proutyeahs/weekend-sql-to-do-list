CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (300) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR (300)
);

INSERT INTO "todo"
	("task", "complete", "notes")
VALUES
	('Complete assignment', 'FALSE', 'Base mode first Eric!'),
	('Take breaks', 'FALSE', 'NO!');
	
SELECT * FROM "todo";