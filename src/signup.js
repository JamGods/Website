//This is where we listen for the events to grab 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-box")
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("real-name");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const submitButton = document.querySelector("button[type='submit']");

    function isValidEmail(email) {
        return email.includes("@");
    }

    
});