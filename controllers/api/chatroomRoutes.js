const router = require('express').Router();
const { Chatroom } = require('../../models');

// ROUTES NEEDED: TBD

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

module.exports = router;