const router = require('express').Router();
const { User } = require('../../models');

// ENDPOINT /api/users

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user signup
router.post('/signup', async (req, res) => {
  try {
    // Implement user signup logic here
    // Create a new user in the database
    // Extract user information from the request body
    const { username, password } = req.body;
    // Check if the username is already in use
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const newUser = await User.create({
      username,
      password,
    });
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
