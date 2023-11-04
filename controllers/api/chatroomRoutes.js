const router = require('express').Router();
const { Chatroom, User } = require('../../models');

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
router.get('/:chatroomId', async (req, res) => {
  try {
    // Implement logic to join a specific chatroom or send messages
    const chatroomId = req.params.chatroomId;

  } catch (err) {
    res.status(500).json(err);
  }
});

// handles creating chat room and posts it to the db
router.post('/create', async (req, res) => {
  try {
    const usersData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Chatroom
        },
      ],
    });

    const user = usersData.get({ plain: true });
    
    if (user.chatrooms && user.chatrooms.length >= 3) {
      res.status(400).json({ message: 'Max chatrooms of three per user reached (spam prevention)' });
      return;
    }

    const { roomName } = req.body;
    console.log(roomName);

    const chatroom = await Chatroom.create({
      room_name: roomName,
      user_id: req.session.user_id,
    });

    res.status(201).json(chatroom);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;