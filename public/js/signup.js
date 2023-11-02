// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the signup form input fields and submit button
    const usernameInput = document.querySelector('#username-input')
    const passwordInput = document.querySelector('#password-input');
    const signupButton = document.querySelector('#signup-btn');

    // Add an event listener to the signup button
    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the values entered by the user for signup
        const username = usernameInput.value.trim();
        const signupPassword = passwordInput.value.trim();

        if (username && signupPassword) {
            // Send a POST request to the server to sign up
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password: signupPassword }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Redirect to a dashboard page or perform some action upon successful sign-up
                document.location.replace('/chat');
            } else {
                alert('Sign-up failed. Please check your information and try again.');
            }
        }
    });
});
