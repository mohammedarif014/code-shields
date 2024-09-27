function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePasswordCheckbox = document.getElementById('togglePassword');
    passwordInput.type = togglePasswordCheckbox.checked ? 'text' : 'password';
}

function generateStrongPassword() {
    const passwordInput = document.getElementById('password');
    const strongPassword = createStrongPassword();
    passwordInput.value = strongPassword;
    checkPasswordStrength(); // Automatically check strength
}

function createStrongPassword() {
    const length = 16; // Length of the password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const feedbackText = document.getElementById('strength-text');
    const suggestionsText = document.getElementById('suggestions');
    const hackTimeText = document.getElementById('hack-time');

    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*]/.test(password);

    let suggestions = [];

    // Check criteria and suggest improvements
    if (!lengthCriteria) {
        suggestions.push("Your password must be at least 8 characters long.");
    }
    if (!uppercaseCriteria) {
        suggestions.push("Include at least one uppercase letter (e.g., A, B, C).");
    }
    if (!numberCriteria) {
        suggestions.push("Add at least one number (e.g., 1, 2, 3).");
    }
    if (!specialCharCriteria) {
        suggestions.push("Use at least one special character (e.g., !, @, #, $).");
    }

    // Provide feedback based on the criteria met
    if (suggestions.length > 0) {
        feedbackText.textContent = "Weak Password";
        feedbackText.className = 'weak';

        // Create a numbered list for suggestions
        suggestionsText.innerHTML = "<ol>" + suggestions.map(s => `<li>${s}</li>`).join("") + "</ol>";
    } else {
        feedbackText.textContent = "Strong Password";
        feedbackText.className = 'strong';
        suggestionsText.textContent = "Great job! This is a strong password.";
    }

    let hackTime = estimateHackTime(password);
    hackTimeText.textContent = `Estimated time to hack: ${hackTime}`;
}

function estimateHackTime(password) {
    const guessesPerSecond = 1e9; // Fast attack

    let possibleCombinations = 1;

    if (/[a-z]/.test(password)) possibleCombinations *= 26; // Lowercase
    if (/[A-Z]/.test(password)) possibleCombinations *= 26; // Uppercase
    if (/\d/.test(password)) possibleCombinations *= 10; // Digits
    if (/[!@#$%^&*]/.test(password)) possibleCombinations *= 10; // Special chars

    const totalCombinations = Math.pow(possibleCombinations, password.length);
    const timeInSeconds = Math.floor(totalCombinations / guessesPerSecond); // Convert to integer

    // Format time based on its length
    if (timeInSeconds < 60) {
        return `${timeInSeconds} seconds`;
    } else if (timeInSeconds < 3600) {
        return `${Math.floor(timeInSeconds / 60)} minutes`; // Return as integer
    } else if (timeInSeconds < 86400) {
        return `${Math.floor(timeInSeconds / 3600)} hours`; // Return as integer
    } else {
        return `${Math.floor(timeInSeconds / 86400)} days`; // Return as integer
    }
}