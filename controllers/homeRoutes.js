const router = require('express').Router();
const { Chatroom, User } = require('../models');
const auth = require('../utils/auth')

// ENDPOINT /
// ROUTES NEEDED: TBD

router.get('/', auth, async (req, res) => {
	try {
		const chatroomsData = await Chatroom.findAll();

		// serialize for handlebars
		const chatrooms = chatroomsData.map((chatroom) => chatroom.get({ plain: true }));

		res.render('homepage', { logged_in: req.session.logged_in, username: req.session.username, chatrooms });
	} catch (err) {
		res.status(500).json(err);
	}
});

// router.get('/chat', async (req, res) => {
// 	try {
// 		res.render('chat', { logged_in: req.session.logged_in, username: req.session.username });
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

router.get('/chat/:id', auth, async (req, res) => {
	try {
		const chatroomData = await Chatroom.findByPk(req.params.id, {});

		const chatroom = chatroomData.get({ plain: true });

		res.render('chat', { logged_in: req.session.logged_in, username: req.session.username, chatroom });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/profile', auth, async (req, res) => {
	const chatroomsData = await Chatroom.findAll({ where: { user_id: req.session.user_id } });
	console.log(req.session.user_id);

	// serialize for handlebars
	const chatrooms = chatroomsData.map((chatroom) => chatroom.get({ plain: true }));

	res.render('profile', { logged_in: req.session.logged_in, username: req.session.username, chatrooms });
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('login')
});

router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('signup')
});

module.exports = router;
