document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const inputField = document.querySelector("input.form-control");
    const sendButton = document.querySelector("button#button-addon2");
    const messagesDiv = document.querySelector("div#messages");

    // Event listener for sending a message
    sendButton.addEventListener("click", function () {
        const message = inputField.value;
        if (message.trim() !== "") {
            // Add your code to send the message and update the chat interface
            const newMessageElement = document.createElement("div");
            newMessageElement.textContent = message;
            messagesDiv.appendChild(newMessageElement);
            inputField.value = "";
        }
    });
});
