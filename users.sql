CREATE TABLE IF NOT EXISTS users (
	id bigint not null AUTO_INCREMENT,
    email_address varchar(45) NOT NULL,
   	password varchar(128) NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    status varchar(30) NOT NULL DEFAULT "verification", 
    role varchar(30) NOT NULL DEFAULT "user",
    created_at int(30) NOT NULL DEFAULT UNIX_TIMESTAMP(),
    PRIMARY KEY(id),
    UNIQUE(email_address)
);