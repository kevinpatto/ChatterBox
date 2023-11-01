const router = require('express').Router();
const { Chatroom, User } = require('../models');

// ROUTES NEEDED: TBD

router.get('/', async (req, res) => {
	try {
<<<<<<< HEAD
	  res.render('chat', { });
=======
		res.render('chat', {});
>>>>>>> main
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
})

router.get('/user/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/')
		return;
	}
	res.render('signup')
})

module.exports = router;
