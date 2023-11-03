// Select relevant HTML elements
const message = document.getElementById('message');
const sendButton = document.getElementById('send-btn');
const messagesDisplay = document.getElementById('messages');
const roomID = document.getElementById('room-ID')
const user = document.getElementById('username');

const roomIDvalue = roomID.value;
io.emit('join', roomIDvalue);


// Add an event listener to the "Send" button
sendButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("clicked")
    const messageValue = message.value;
    const userValue = user.value;
    if (messageValue) {
        console.log(':' + messageValue)
        // Emit a "send-message" event to the server
        io.emit('message', messageValue,userValue);
        // Clear the input field
        message.value = '';
    }
});

