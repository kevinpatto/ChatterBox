// chat.js (Server-Side JavaScript)
const { v4: uuidv4 } = require('uuid');

function generateUniqueRoomId() {
    // Generate a unique room ID using UUID
    return uuidv4();
}

function handleUserInitiatedChat(socket) {
    // socket.on('start-chat', () => {
    //     // Generate a unique room ID
    //     const roomId = generateUniqueRoomId();
    
    //     // Create the room and notify the user to join it
    //     socket.join(roomId);
    //     socket.emit('room-created', roomId);
    // });

    // Handle sending and broadcasting messages
    socket.on('send-message', (message) => {
        console.log(`MessageReceived: ${message}`)
        // Broadcast the message to everyone in the room
        // socket.to(socket.roomId).emit('new-message', message);
    });
}

module.exports = handleUserInitiatedChat;
