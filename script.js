function toggleForms() {
    document.getElementById('signup-box').classList.toggle('hidden');
    document.getElementById('signin-box').classList.toggle('hidden');
 }
 
 function signUp() {
    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;
    

    function displayErrorMessage(elementId, message) {
        // Remove any existing error message
        const existingError = document.querySelector(`#${elementId} + .error-message`);
        if (existingError) {
            existingError.remove();
        }

        // Create a new error message
        let errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        document.getElementById(elementId).after(errorMessage);
    }
    if (!/^[a-zA-Z\/-]+$/.test(username)) {
        alert('Invalid username! Only letters, /, and - are allowed.');
        return;
    }
    if (username && password) {
        let userData = { username, password };
        localStorage.setItem(username, JSON.stringify(userData)); // Save user data
        localStorage.setItem("loggedInUser", username); // Automatically log in the user
        alert('Sign-up successful! Redirecting to mood tracker...');
        window.location.href = 'main.html'; // Redirect after successful sign-up
    } else {
        alert('Please enter all details.');
    }
}

function signIn() {
    let username = document.getElementById('signin-username').value;
    let password = document.getElementById('signin-password').value;
    
    if (localStorage.getItem(username)) {
        let storedData = JSON.parse(localStorage.getItem(username));
        if (password === storedData.password) {
            localStorage.setItem("loggedInUser", username); // Save logged-in user
            alert('Login successful! Redirecting to the main page...');
            window.location.href = 'main.html'; // Redirect to main page
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('User not found. Please sign up.');
    }
}
 
 function showSavePrompt(userData) {
    let savePrompt = confirm("Do you want to save your username and password?");
    if (savePrompt) {
        localStorage.setItem(userData.username, JSON.stringify(userData));
        alert('Credentials saved!');
        displaySavedUsers();

        window.location.href = 'main.html';

        
    } else {
        alert('Credentials not saved.');
    }
    toggleForms();
 }
 
 
 function fillCredentials(username) {
    let storedData = JSON.parse(localStorage.getItem(username));
    document.getElementById('signin-username').value = username;
    document.getElementById('signin-password').value = storedData.password;
 }    