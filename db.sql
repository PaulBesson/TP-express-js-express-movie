DROP DATABASE express_movies;

CREATE DATABASE express_movies;

USE express_movies;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50),
	firstname VARCHAR(50),
	email VARCHAR(50) UNIQUE,
	password VARCHAR(255),
	role VARCHAR(50)
);

CREATE TABLE films (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) UNIQUE,
	image VARCHAR(255),
	description VARCHAR(255),
	dateSortie DATETIME,
	genre VARCHAR(50)
)

CREATE TABLE favoris (
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_user INT,
	id_film INT,
	FOREIGN KEY (id_user) REFERENCES films(id),
	FOREIGN KEY (id_film) REFERENCES users(id)
)


-- password for admin is "admin" and passwords for others is "123456"

INSERT INTO users (id, name, firstname, email, password, role) VALUES
(null, "admin", "admin", "admin.admin@rapidomail.com", "$2b$10$DnxFh3R4YwMQ78loJ7TUguFVBYYW.KMo6pZLagnG9lUIoBGbT1sL2", "ADMIN"),
(null, "Rapido", "Bernardo", "bernardo.rapido@rapidomail.com", "$2b$10$AjnZ72Q9utv9l4OwbdyqaOjrtJbCwLQDP0P1LLpNs7mwB3P7eSata", "ABONNE"),
(null, "Rapidito", "Bernarditoo", "bernardito.rapidito@rapidomail.com", "$2b$10$AjnZ72Q9utv9l4OwbdyqaOjrtJbCwLQDP0P1LLpNs7mwB3P7eSata", "ABONNE"),
(null, "Rapidipito", "Bernardipito", "bernardipito.rapidipito@rapidomail.com", "$2b$10$AjnZ72Q9utv9l4OwbdyqaOjrtJbCwLQDP0P1LLpNs7mwB3P7eSata", "ABONNE");


INSERT INTO films (id, title, image, description, dateSortie, genre) VALUES
(null, "Pixie & Woods", "../images/Pixie.jpg", "Toothpicks going on an amazing journey !.", '2010-07-16', "Fantasy"),
(null, "The Shawshank Redemption", "../images/shawshank.jpg", "Deux hommes emprisonnés se lient d'amitié et trouvent l'espoir dans un monde déshumanisant.", '1994-09-23', "Drame"),
(null, "The Dark Knight", "../images/darkknight.jpg", "Batman affronte le Joker, un criminel chaotique qui pousse Gotham à ses limites.", '2008-07-18', "Action"),
(null, "Interstellar", "../images/interstellar.jpg", "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace pour trouver une nouvelle planète habitable.", '2014-11-07', "Science-Fiction");
