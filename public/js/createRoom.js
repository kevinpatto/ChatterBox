const roomName = document.getElementById('room-name');
const createButton = document.getElementById('create-room');
console.log(createButton);

createButton.addEventListener('click', async () => {
    const roomNameValue = roomName.value;
    console.log(roomNameValue);
    if (roomNameValue) {
        try {
            const response = await fetch(`/api/chatrooms/create`, {
                method: 'POST',
                body: JSON.stringify({ roomName: roomNameValue }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                roomName.value = '';
                document.location.replace('/profile');
            } else {
                console.error('Failed to create chatroom')
            }
        } catch (error) {
            console.error('An error occured: ', error)
        }
    }
});