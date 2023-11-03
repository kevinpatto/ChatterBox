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
