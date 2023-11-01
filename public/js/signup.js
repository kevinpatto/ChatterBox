// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the signup form input fields and submit button
    const usernameInput = document.querySelector('#username-signup');
    const signupEmailInput = document.querySelector('#signup-email');
    const signupPasswordInput = document.querySelector('#signup-password');
    const signupButton = document.querySelector('#signup-btn');

    // Add an event listener to the signup button
    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the values entered by the user for signup
        const username = usernameInput.value.trim();
        const signupEmail = signupEmailInput.value.trim();
        const signupPassword = signupPasswordInput.value.trim();

        if (username && signupEmail && signupPassword) {
            // Send a POST request to the server to sign up
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email: signupEmail, password: signupPassword }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Redirect to a dashboard page or perform some action upon successful sign-up
                document.location.replace('/dashboard');
            } else {
                alert('Sign-up failed. Please check your information and try again.');
            }
        }
    });
});
