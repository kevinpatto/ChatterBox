// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the login form input fields and submit button
    const usernameInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-btn');

    // Add an event listener to the login button
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the values entered by the user for login
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            // Send a POST request to the server to log in with both username and password
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                // Redirect to a dashboard page or perform some action upon successful login
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        }
    });
});
