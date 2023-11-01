const router = require('express').Router();
const { Chatroom, User } = require('../models');

// ROUTES NEEDED: TBD

router.get('/', async (req, res) => {
	try {
	  res.render('chat', { });
	} catch (err) {
	  res.status(500).json(err);
	}
  });

module.exports = router;
