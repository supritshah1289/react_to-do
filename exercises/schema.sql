DROP TABLE if Exists tasks;

CREATE TABLE tasks(
task_id SERIAL PRIMARY KEY NOT NULL,
task_name varchar(50) NOT NULL,
task_desc text,
completed boolean NOT NULL DEFAULT FALSE,
task_time_start timestamp,
task_time_end timestamp,
task_created timestamp NOT NULL DEFAULT now()
);

CREATE INDEX on tasks(completed);
CREATE INDEX ON tasks(task_time_start);
CREATE UNIQUE INDEX ON tasks(task_time_end);

INSERT INTO tasks(task_name,task_desc) VALUES('sky diving','Go for a sky diving this saturday early morning');
INSERT INTO tasks(task_name,task_desc) VALUES('Grocery Shopping','this sunday');
INSERT INTO tasks(task_name,task_desc) VALUES('Jump of the roof',NULL);
