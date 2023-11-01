// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the login form input fields and submit button
    const emailInput = document.querySelector('#login-email');
    const passwordInput = document.querySelector('#login-password');
    const loginButton = document.querySelector('#login-btn');

    // Add an event listener to the login button
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the values entered by the user for login
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email && password) {
            // Send a POST request to the server to log in
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Redirect to a dashboard page or perform some action upon successful login
                document.location.replace('/dashboard');
            } else {
                alert('Login failed. Please check your email and password.');
            }
        }
    });
});
