// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the login form input fields and submit button
    const passwordInput = document.querySelector('#login-password');
    const loginButton = document.querySelector('#login-btn');
    const signupButton = document.querySelector('#signup-btn');

    // Add an event listener to the login button
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the values entered by the user for login
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            // Send a POST request to the server to log in with both username and password
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                // Redirect to a dashboard page or perform some action upon successful login
                document.location.replace('/chat');
            } else {
                alert('Login failed. Please check your username and password.');
            }
        }
    });

    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log(signupButton);
        document.location.replace('/chat')
    })
    
});
