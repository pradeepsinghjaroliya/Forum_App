--create database forum_db;
--use forum_db;
--show tables;



-- posts table 
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

-- question_tags table
CREATE TABLE question_tags (
    question_id int null,
    tag_id int null
);

-- tags table
CREATE TABLE tags (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) null,
    PRIMARY KEY(id) 
);

--users table
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(255) null,
    email varchar(255) not null,
    password VARCHAR(255) null,
	token varchar(255),
    PRIMARY KEY(id) 
);

-- votes table
CREATE TABLE votes (
    id int NOT NULL AUTO_INCREMENT,
	vote int null,
    post_id int null,
    user_id int null,
    PRIMARY KEY(id) 
);

-- table user_tags
CREATE table user_tags(
    user_id int null,
    tag_id int null
);

INSERT INTO tags (name) VALUES ('java');
INSERT INTO tags (name) VALUES ('sql');
INSERT INTO tags (name) VALUES ('python');
INSERT INTO tags (name) VALUES ('javascript');