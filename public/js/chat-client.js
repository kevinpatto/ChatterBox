// Select relevant HTML elements
const message = document.getElementById('message');
const sendButton = document.getElementById('send-btn');
const messagesDisplay = document.getElementById('messages');
const roomID = document.getElementById('room-ID')
const user = document.getElementById('username');

io.emit('join', { room: roomID.textContent, username: user.textContent });

io.on('notification', (data) => {
    const { notification } = data;
    console.log(`NOTIFICATION: ${notification}`);

    const notificationSpan = document.createElement('span');
    notificationSpan.classList.add('font-monospace', 'text-success');
    notificationSpan.textContent = `NOTIFICATION: `;

    const messageSpan = document.createElement('span');
    messageSpan.textContent = notification;

    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.append(notificationSpan, messageSpan);
    messagesDisplay.append(liEl);
});

io.on('message', (data) => {
    const { sent, username } = data;
    
    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('font-monospace', 'text-primary');
    usernameSpan.textContent = `${username}: `;

    const messageSpan = document.createElement('span');
    messageSpan.textContent = sent;

    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.append(usernameSpan, messageSpan);
    messagesDisplay.append(liEl);
});

// Add an event listener to the "Send" button
sendButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const messageValue = message.value;
    const userValue = user.textContent;
    if (messageValue) {
        // Emit a "send-message" event to the server
        io.emit('message', messageValue, userValue);
        // Clear the input field
        message.value = '';
    }
});
