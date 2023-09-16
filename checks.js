function loginFormCheck() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var users = JSON.parse(localStorage.getItem("users")) || [];
    // Find user by email
    var user = users.find(function (user) {
        return user.email === email;
    });
    if (!user) {
        // User not found, display error message
        displayError("emailError", "Email not found. Please sign up.");
        return false; 
    }

    if (user.password !== password) {
        // Password does not match, display error message
        displayError("passwordError", "Incorrect password.");
        return false; 
    }
    var userData = {
        email: user.email,
        username: user.username
    };
    
    localStorage.setItem("LoggedIn", JSON.stringify(userData));
    // Login successful, display success message
    displaySuccess("Logged-in Successfully");

    // Redirect to the dashboard or home page after 2 seconds
    setTimeout(function () {
        window.location.href = "portal/index.html"; // Change the URL to your dashboard or home page
    }, 2000); // Delay the redirection for 2 seconds

    return false;

}
function displayError(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.classList.add("d-block");
}

function displaySuccess(message) {
swal.fire(message, "Hurray!!", "success");

}


function showPass() {
    var passcheck = document.getElementById("password");
    if (passcheck.type === "password") {
        passcheck.type = "text";
    } else {
        passcheck.type = "password";
    }
}


// for signup
function signUpformCheck() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
        displayError("emailError", "Please enter a valid email address.");
        return false; // Prevent form submission
    }

    // Validate username length
    if (!isValidUsername(username)) {
        return false; // Prevent form submission
    }


    // Check if the email or username already exists in local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userExists = users.some(function (user) {
        return user.email === email || user.username === username;
    });

    if (userExists) {
        displayError("emailError", "Email or username is already registered.");
        return false; // Prevent form submission
    }

    // Validate password length
    if (password.length < 6 || password.length > 20) {
        displayError("passwordError", "Password must be between 6 and 20 characters.");
        return false; // Prevent form submission
    }

   

    // Save user data to local storage
    var userData = {
        email: email,
        username: username,
        password: password
    };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    displaySuccess("Successfully Signed-Up!");

    // Reset the form fields
    document.getElementById("signupForm").reset();

    // Redirect to the login page after 2 seconds
    setTimeout(function () {
        window.location.href = "/login.html"; // Change the URL to your login page
    }, 400); // Delay the redirection for 2 seconds

    return false; // Prevent form submission (for demonstration purposes)
}

function displayError(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.classList.add("d-block");
}


function displaySuccess(message) {
    swal(message, "Hurray!!", "success");
}

function isValidUsername(username) {
    // Check if username contains numbers or special characters
    var usernamePattern = /^[a-zA-Z]+$/;
    if (!username.match(usernamePattern)) {
        displayError("usernameError", "Username should only contain letters.");
        return false;
    }

    // Check if username length is between 4 and 15 characters
    if (username.length < 4 || username.length > 15) {
        displayError("usernameError", "Username must be between 4 and 15 characters.");
        return false;
    }

    return true; // Username is valid
}