document.addEventListener("DOMContentLoaded", function () {
    console.log("signup.js is loaded!");

    const form = document.querySelector(".signup-box");
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("real-name");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const robotCheckPopup = document.getElementById("robot-check-popup");
    const riddlePopup = document.getElementById("riddle-popup");

    let attempts = 0;
    const maxAttempts = 3;
    const lockoutDuration = 15000; // 15 seconds lockout duration

    function isValidEmail(email) {
        return email.includes("@");
    }

    function showElement(id) {
        console.log(`Showing element: ${id}`);
        document.getElementById(id).style.display = "flex";
    }

    function hideElement(id) {
        console.log(`Hiding element: ${id}`);
        document.getElementById(id).style.display = "none";
    }

    function displayMessage(message, type = "error") {
        let messageBox = document.getElementById("message-box");

        if (!messageBox) {
            console.log("Creating message box...");
            messageBox = document.createElement("div");
            messageBox.id = "message-box";
            document.body.appendChild(messageBox);
        }

        console.log(`Displaying message: ${message}`);
        messageBox.className = type;
        messageBox.innerText = message;
        messageBox.style.display = "block";
        messageBox.style.opacity = "1";

        setTimeout(() => {
            messageBox.classList.add("fade-out");
            setTimeout(() => {
                console.log("Removing message box...");
                messageBox.remove();
            }, 1000);
        }, 4000);
    }

    function clearMessage() {
        const messageBox = document.getElementById("message-box");
        if (messageBox) messageBox.remove();
    }

    function lockoutUser() {
        const lockoutTime = Date.now() + lockoutDuration;
        localStorage.setItem('lockoutTime', lockoutTime);
        document.body.innerHTML = "<h1>You have been locked out. Wait 15 seconds before refreshing.</h1>";
        setTimeout(() => location.reload(), lockoutDuration);
    }

    function checkLockout() {
        const lockoutTime = localStorage.getItem('lockoutTime');
        if (lockoutTime && Date.now() < lockoutTime) {
            document.body.innerHTML = "<h1>You have been locked out. Wait 15 seconds before refreshing.</h1>";
        } else {
            localStorage.removeItem('lockoutTime');
        }
    }

    checkLockout();

    document.getElementById("robot-btn").addEventListener("click", function () {
        hideElement("robot-check-popup");
        lockoutUser();
    });

    document.getElementById("human-btn").addEventListener("click", function () {
        showElement("riddle-popup");
    });

    document.getElementById("submit-riddle").addEventListener("click", function () {
        let answer1 = document.getElementById("riddle1").value.toLowerCase();
        let answer2 = document.getElementById("riddle2").value.toLowerCase();
        let answer3 = document.getElementById("riddle3").value.toLowerCase();

        if (answer1 === "sand" && answer2 === "shadow" && answer3 === "memory") {
            hideElement("riddle-popup");
            hideElement("robot-check-popup");
            displayMessage("You are verified as human!", "success");
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                lockoutUser();
            } else {
                displayMessage(`Incorrect answers! You have ${maxAttempts - attempts} attempts left.`);
            }
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("1");
        clearMessage();

        if (!emailInput.value || !nameInput.value || !passwordInput.value || !dobInput.value) {
            console.log("2");
            displayMessage("All fields are required!");
            setTimeout(() => showElement("robot-check-popup"), 1000);
            return;
        }

        if (!isValidEmail(emailInput.value)) {
            console.log("3");
            displayMessage("Invalid email format.");
            setTimeout(() => showElement("robot-check-popup"), 1000);
            return;
        }

        console.log("4");
        displayMessage("Almost there! Solve the Riddle Wizard's challenge!", "info");
        setTimeout(() => showElement("robot-check-popup"), 1000);
    });
});
