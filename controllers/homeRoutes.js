const router = require('express').Router();
const { Chatroom, User } = require('../models');

// ENDPOINT /
// ROUTES NEEDED: TBD

router.get('/chat', async (req, res) => {
	try {
		res.render('chat', { logged_in: req.session.logged_in, username: req.session.username });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/user/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/')
		return;
	}
	res.render('login')
});

router.get('/user/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/')
		return;
	}
	res.render('signup')
});

module.exports = router;
