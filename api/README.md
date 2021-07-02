# Forum_app
Sql querries for creating database (edit the rest of the details like username and password in db.js)
--create database forum_db;
--use forum_db

Now for adding the tables:-

create TABLE posts(
    id int AUTO_INCREMENT,
    title text null,
    content text null,
    parent_id int null,
    author_id int null,
	type varchar(100) null,
	created_at TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
    PRIMARY KEY(id) 
);

CREATE TABLE question_tags (
    question_id int null,
    tag_id int null
);

CREATE TABLE tags (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) null,
    PRIMARY KEY(id) 
);

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(255) null,
    email varchar(255) not null,
    password VARCHAR(255) null,
	token varchar(255),
    PRIMARY KEY(id) 
);

CREATE TABLE votes (
    id int NOT NULL AUTO_INCREMENT,
	vote int null,
    post_id int null,
    user_id int null,
    PRIMARY KEY(id) 
);
CREATE table user_tags(
    user_id int null,
    tag_id int null
);



show tables;
--if it should show 6 tables(posts,question_tags,tags,users,votes,user_tags)
