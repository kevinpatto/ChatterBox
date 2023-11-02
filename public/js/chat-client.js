// chat-client.js (Client-Side JavaScript)
const socket = io(); // Initialize socket.io connection

// Select relevant HTML elements
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#button-addon2');
const messagesDisplay = document.querySelector('#messages');

// Add an event listener to the "Send" button
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // Emit a "send-message" event to the server
        socket.emit('send-message', message);
        // Clear the input field
        messageInput.value = '';
    }
});

// Handle incoming messages from the server
socket.on('new-message', (message) => {
    // Display the incoming message in the HTML DOM
    const newMessageElement = document.createElement('div');
    newMessageElement.textContent = message;
    messagesDisplay.appendChild(newMessageElement);
});

// Handle joining a chat room (if you have a button for it)
const startChatButton = document.querySelector('#start-chat-button');
startChatButton.addEventListener('click', () => {
    socket.emit('start-chat');
});
