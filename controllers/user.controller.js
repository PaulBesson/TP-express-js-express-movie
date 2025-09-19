import yup from '../config/yup.config.js'
import bcrypt from '../config/bcrypt.config.js';
import userRepository from '../repositories/user.repository.js';
import filmRepository from '../repositories/film.repository.js';


const userSchema = yup.object().shape({
	name: yup
		.string()
		.required()
		.matches(/^[A-Z]{1}.{2,19}$/, "Le name doit commencer par une majuscule et comporter entre 4 et 20 characteres"),
	firstname: yup
		.string()
		.min(3, (args) => `Le firstname doit contenir au moins ${args.min} characteres, valeur saisie : ${args.value}`)
		.max(20),
	email: yup
		.string()
		.required()
		.matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

})

const showLogin = async (req, res, next) => {
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.render('login', {
			user: req.session.user,
			erreurs: null
		})
	}
}

const showSignup = async (req, res, next) => {
	res.render('signup', {
		user: req.session.user,
		erreurs: null
	})
}

const showAccount = async (req, res, next) => {
	if (req.session.user) {
		
		res.render('account', {
			user: req.session.user,
			favorites: req.session.favorites,
			erreurs: null
		})
	} else {
		res.redirect('/')
	}
}

const addFavorites = async (req, res, next) => {
	if (req.session.user) {
		await filmRepository.addFavorites(req.session.user.id, req.params.filmId);
		req.session.favorites = await filmRepository.findFavorites(req.session.user.id);
		res.render('account', {
			user: req.session.user,
			favorites: req.session.favorites,
			erreurs: null
		})
	} else {
		res.redirect('/');
	}
}

const removeFavorites = async (req, res, next) => {
	if (req.session.user) {
		await filmRepository.removeFavorites(req.session.user.id, req.params.filmId);
		req.session.favorites = await filmRepository.findFavorites(req.session.user.id);
		res.render('account', {
			user: req.session.user,
			favorites: req.session.favorites,
			erreurs: null
		})
	} else {
		res.redirect('/');
	}
}

const disconnect = async (req, res, next) => {
	if (req.session.user) {
		req.session.destroy();
	}
	res.redirect('/');
}

const addUser = async (req, res, next) => {

	userSchema
		.validate(req.body, { abortEarly: false })
		.then(async () => {
			req.body.password = await bcrypt.hashPassword(req.body.password);
			const user = await userRepository.save(req.body);
			if (user) {
				req.session.user = user;
				res.redirect('/');
			} else {
				// error page
				// error message
			}
		})
		.catch(async err => {
			console.log(err);
		})
}

const loginUser = async (req, res, next) => {
	const user = await userRepository.findByEmail(req.body.email)

	if (user && await bcrypt.comparePassword(req.body.password, user.password)) {
		if (req.session.user) {
			req.session.destroy();
		}
		req.session.user = user;
		req.session.favorites = await filmRepository.findFavorites(req.session.user.id);
	}
	res.redirect('/');
}

const remove = async (req, res, next) => {
	const id = req.params.id;
	await userRepository.deleteById(id);
	res.redirect('/user/login');
}

export default { showLogin, showSignup, addUser, loginUser, remove, showAccount, disconnect, addFavorites, removeFavorites };