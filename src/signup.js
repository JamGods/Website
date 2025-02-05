//This is where we listen for the events to grab 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-box");
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("real-name");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const submitButton = document.querySelector("button[type='submit']");

    function isValidEmail(email) {
        return email.includes("@");
    }
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        let errorMessage = "";
        if (!emailInput.value || !nameInput.value || !passwordInput.value || !dobInput.value) {
            errorMessage = "All fields are required.";
        } else if (!isValidEmail(emailInput.value)) {
            errorMessage = "Invalid email format.";
        } else {
            const dobParts = dobInput.value.split("/");
            if (dobParts.length !== 3 || isNaN(dobParts[2])) {
                errorMessage = "Invalid date of birth format. Use DD/MM/YY.";
            } else {
                const birthYear = parseInt(dobParts[2], 10);
                const currentYear = new Date().getFullYear() % 100;
                if ((currentYear - birthYear) < 13) {
                    errorMessage = "You must be at least 13 years old to sign up.";
                }
            }
        }
        if (errorMessage) {
            alert(errorMessage);
        } else {
            alert("Signup successful!");
            form.submit();
        }
    });
});
