-- create_user_table.sql

-- Drop the table if it exists
DROP TABLE IF EXISTS public."USER";

-- Create the USER table if it does not exist
CREATE TABLE IF NOT EXISTS public."USER"
(
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default",
    "Fname" character varying COLLATE pg_catalog."default",
    "Lname" character varying COLLATE pg_catalog."default",
    mail character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    role character varying COLLATE pg_catalog."default",
    CONSTRAINT "USER_pkey" PRIMARY KEY (username)
)
TABLESPACE pg_default;

-- Change the table owner to postgres
ALTER TABLE IF EXISTS public."USER"
    OWNER to postgres;
