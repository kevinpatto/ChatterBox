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
// handles creating chat room and posts it to the db
router.post('/create', async (req,res) => {
  try {
    const {roomName, userId} = req.body;

    const chatroom = await Chatroom.create({
      room_name: roomName,
      user_id: userId
    })
    res.status(201).json(chatroom);
  }catch(err){
    res.status(500).json(err);
  }
})
module.exports = router;