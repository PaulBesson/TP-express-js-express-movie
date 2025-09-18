import connection from '../config/db.config.js';


const findAll = async () => {
	const SELECT = "SELECT * FROM films"
	try {
		const resultat = await connection.query(SELECT)
		return resultat[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

const save = async (film) => {
	const INSERT = "INSERT INTO films values (null, ?, ?, ?, ?, ?)"
	try {
		const resultat = await connection.query(INSERT, [film.name, film.firstname, film.email, film.password, film.role])
		film.id = resultat[0].insertId
		return film
	} catch (error) {
		console.log(error);
		return null
	}
}

const deleteById = async (id) => {
	const DELETE = "DELETE FROM films WHERE id=?"
	try {
		await connection.query(DELETE, id);
	} catch (error) {
		console.log(error);
	}
}

const findById = async (id) => {
	const SELECT = "SELECT * FROM films WHERE id=?";
	try {
		const resultat = await connection.query(SELECT, id);
		return resultat[0][0];
	}
	catch (error) {
		console.log(error);
		return null;
	}
}

const findFavorites = async (userId) => {
	const SELECT = "SELECT films.* FROM films JOIN favoris on favoris.id_film = films.id JOIN users on users.id = favoris.id_user WHERE users.id = ?;"
	try {
		const resultat = await connection.query(SELECT, [userId]);
		console.log(resultat);
		
		if (resultat[0].length > 0) {
			return resultat[0]
		}
	}
	catch (error) {
		console.log(error);
	}
	return [];
}

const update = async (film) => {
	const UPDATE = "UPDATE films SET name=?, firstname=?, email=? WHERE id=?";
	try {
		const resultat = await connection.query(UPDATE, [film.name, film.firstname, film.email, film.id]);
		if (resultat[0].affectedRows > 0) {
			return film
		}
	}
	catch (error) {
		console.log(error);
	}
	return null;
}

export default { findAll, save, deleteById, findById, findFavorites, update }