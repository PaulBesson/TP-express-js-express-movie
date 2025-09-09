import filmRepository from '../repositories/film.repository.js';

const show = async (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/user/login')
	} else {

		const films = await filmRepository.findAll()
		if (films[0]) {
			
			res.render('index', {
				user: req.session.user,
				films,
				erreurs: null
			})
		} else {
			res.render('index', {
				user: req.session.user,
				films: [],
				erreurs: ["Problème de récupération de données"]
			})
		}
	}
}

const add = async (req, res, next) => {

	filmSchema
		.validate(req.body, { abortEarly: false })
		.then(async () => {
			req.session.firstname = req.body.firstname
			const p = await filmRepository.save(req.body)
			if (p) {
				console.log(p);
				res.redirect('/film')
			} else {
				const films = await filmRepository.findAll()
				res.render('film', {
					erreurs: ["Problème d'insertion"],
					films
				})
			}
		})
		.catch(async err => {
			console.log(err);
			const films = await filmRepository.findAll()
			res.render('film', {
				erreurs: err.errors,
				films
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	await filmRepository.deleteById(id)
	res.redirect('/film')
}

export default { show, add, remove };