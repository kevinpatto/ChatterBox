// chat-client.js (Client-Side JavaScript)
// const socketIo = require('socket.io');
// const socket = io(); // Initialize socket.io connection

// Select relevant HTML elements
const messageInput = document.querySelector('#message-input');
const message = document.getElementById('message');
const sendButton = document.querySelector('#button-addon2');
const messagesDisplay = document.querySelector('#messages');

// Add an event listener to the "Send" button
sendButton.addEventListener('click', () => {
    const messageValue = message.value;
    if (messageValue) {
        console.log('message sent')
        // Emit a "send-message" event to the server
        io.emit('send-message', messageValue);
        // Clear the input field
        message.value = '';
    }
});

// // Handle incoming messages from the server
// socket.on('new-message', (message) => {
//     // Display the incoming message in the HTML DOM
//     const newMessageElement = document.createElement('div');
//     newMessageElement.textContent = message;
//     messagesDisplay.appendChild(newMessageElement);
// });

// // Handle joining a chat room (if you have a button for it)
// const startChatButton = document.querySelector('#start-chat-button');
// startChatButton.addEventListener('click', () => {
//     socket.emit('start-chat');
// });
