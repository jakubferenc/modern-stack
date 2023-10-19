CREATE TABLE IF NOT EXISTS jobs
(
    id SERIAL,
    title text,
    company text,
    description text,
    PRIMARY KEY (id)
);
