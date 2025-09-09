import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import user from './routes/user.route.js';
import film from './routes/film.route.js';

const app = express();

// configurer la session
app.use(session({
	secret: 'jfidsofj3q4fjia9pfuikq9034ic0[9mq4if0[9acwimr90ex,90[riax,90ri90cq',
	resave: false,
	saveUninitialized: false
}));

// utiliser le middleware body-parser
app.use(express.urlencoded());


// configurer les ressources statiques
app.use(express.static('public'));

// Mapping entre routes et le routeur
app.use("/user", user);
app.use("/film", film);


// Configuration du moteur de template
app.set('view engine', 'ejs');
app.set('views', import.meta.dirname + '/views'); // changes views path


app.get(['/', '/home', '/accueil'], (req, res) => {
	if (req.session.user) {
		res.redirect('/film')
	}
	else {
		res.redirect('/user/login')
	}
})

app.all("/*splat", (req, res) => {
    res
        .status(404)
        .end("Page introuvable")
})


const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
})