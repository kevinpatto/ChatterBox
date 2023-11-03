const router = require('express').Router();
const { Chatroom } = require('../../models');

// ENDPOINT /api/chatrooms
// ROUTES NEEDED: TBD

// Route to view chatrooms
router.get('/', async (req, res) => {
  try {
    const chatroomsData = await Chatroom.findAll();

    const chatrooms = chatroomsData.map((chatroom) => chatroom.get({ plain: true }));

    res.json(chatrooms);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to join or interact with a specific chatroom
router.get('/chat/:chatroomId', async (req, res) => {
  try {
    // Implement logic to join a specific chatroom or send messages
    const chatroomId = req.params.chatroomId;

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;