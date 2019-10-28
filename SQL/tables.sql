 DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image VARCHAR,
    bio VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS chats;
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    message VARCHAR (2000),
    posted_date VARCHAR (500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS profile CASCADE;
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    age INT,
    city VARCHAR (100),
    country VARCHAR (100),
    mother_tongue VARCHAR (100),
    idioms VARCHAR (300),
    link VARCHAR (300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) NOT NULL UNIQUE

);

DROP TABLE IF EXISTS collaborators;
CREATE TABLE collaborators (
    id SERIAL PRIMARY KEY,
    learn1 VARCHAR,
    learn2 VARCHAR,
    learn3 VARCHAR,
    learn4 VARCHAR,
    learn5 VARCHAR,
    skill1 VARCHAR,
    skill2 VARCHAR,
    skill3 VARCHAR,
    skill4 VARCHAR,
    skill5 VARCHAR,
    level1 VARCHAR,
    level2 VARCHAR,
    level3 VARCHAR,
    level4 VARCHAR,
    level5 VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) NOT NULL UNIQUE
);
