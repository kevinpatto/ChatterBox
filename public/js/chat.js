// chat.js
const { v4: uuidv4 } = require('uuid');

function generateUniqueRoomId() {
    // Generate a unique room ID using UUID
    return uuidv4();
  }

function handleUserInitiatedChat(socket) {
    socket.on('start-chat', () => {
      // Generate a unique room ID
      const roomId = generateUniqueRoomId(); // Implement this function
  
      // Create the room and notify the user to join it
      socket.join(roomId);
      socket.emit('room-created', roomId);
    });
  }

const messageInput = document.querySelector('#message-input');
const sendBtn = document.querySelector('#sendBtn');

// Add an event listener to the "Send" button
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // Emit a "send-message" event to the server
        socket.emit('send-message', message);
        // Clear the input field
        messageInput.value = '';
    }
});
  
  module.exports = handleUserInitiatedChat;