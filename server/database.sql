CREATE DATABASE IF NOT EXISTS "proyecto";


CREATE TABLE users(
    user_id varchar(255) NOT NULL PRIMARY KEY,
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL
);