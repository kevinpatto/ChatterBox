const router = require('express').Router();
const { User, Chatroom } = require('../../models');


// Route to view chatrooms
router.get('/chatrooms', async (req, res) => {
  try {
    const chatrooms = await Chatroom.findAll();
    res.json(chatrooms);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to join or interact with a specific chatroom
router.get('/chat/:chatroomId', async (req, res) => {
  const chatroomId = req.params.chatroomId;
  try {
    // Implement logic to join a specific chatroom or send messages

  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to view a user's profile
router.get('/:profilename', async (req, res) => {
  const profilename = req.params.profilename;
  try {
    // Fetch user information and display their profile
    // Implement logic to view user profiles

  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Implement user login logic here
    // Verify credentials and create a user session
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPass = await user.checkPassword(password);
    if (!validPass) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      // Send the response only once, here
      res.status(200).json({ user, message: 'You are now logged in!' });
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
        const { name, email, password } = req.body;
        // Check if the email is already in use
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
