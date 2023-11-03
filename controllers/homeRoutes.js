const router = require('express').Router();
const { Chatroom, User } = require('../models');

// ENDPOINT /
// ROUTES NEEDED: TBD

router.get('/', async (req, res) => {
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

router.get('/chat/:id', async (req, res) => {
	try {
		const chatroomData = await Chatroom.findByPk(req.params.id, {});
		console.log(chatroomData);

		const chatroom = chatroomData.get({ plain: true });

		res.render('chat', { logged_in: req.session.logged_in, username: req.session.username, chatroom });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/users/chat')
		return;
	}
	res.render('login')
});

router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/users/chat')
		return;
	}
	res.render('signup')
});

module.exports = router;
