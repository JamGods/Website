document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-box");
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("real-name");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const submitButton = document.querySelector("button[type='submit']");
    const robotCheckPopup = document.getElementById("robot-check-popup");
    const riddlePopup = document.getElementById("riddle-popup");

    let attempts = 0;
    const maxAttempts = 3;
    const lockoutDuration = 15000; // 15 seconds lockout duration

    function isValidEmail(email) {
        return email.includes("@");
    }

    function showElement(id) {
        document.getElementById(id).style.display = "flex"; // Change to flex to center the popups
    }

    function hideElement(id) {
        document.getElementById(id).style.display = "none";
    }

    function lockoutUser() {
        const lockoutTime = Date.now() + lockoutDuration; // Calculate lockout end time
        localStorage.setItem('lockoutTime', lockoutTime); // Store lockout time in localStorage
        document.body.innerHTML = "<h1>You have been locked out. Wait 15 seconds before refreshing.</h1>";
        setTimeout(() => location.reload(), lockoutDuration);
    }

    function checkLockout() {
        const lockoutTime = localStorage.getItem('lockoutTime');
        if (lockoutTime && Date.now() < lockoutTime) {
            document.body.innerHTML = "<h1>You have been locked out. Wait 15 seconds before refreshing.</h1>";
        } else {
            localStorage.removeItem('lockoutTime'); // Clear the lockout time when the lockout period is over
        }
    }

    // Check if the user is locked out when the page loads
    checkLockout();

    // Robot Check Popup Button Events
    document.getElementById("robot-btn").addEventListener("click", function () {
        hideElement("robot-check-popup");
        lockoutUser();
    });

    document.getElementById("human-btn").addEventListener("click", function () {
        // Do not hide the robot check popup, just show the riddle popup on top
        showElement("riddle-popup");
    });

    document.getElementById("submit-riddle").addEventListener("click", function () {
        let answer1 = document.getElementById("riddle1").value.toLowerCase();
        let answer2 = document.getElementById("riddle2").value.toLowerCase();
        let answer3 = document.getElementById("riddle3").value.toLowerCase();
        
        if (answer1 === "egg" && answer2 === "footsteps" && answer3 === "echo") {
            // After correct answer, show buttons to close popups
            let riddleCloseBtn = document.createElement("button");
            riddleCloseBtn.textContent = "Close Riddle Popup";
            riddleCloseBtn.addEventListener("click", function () {
                hideElement("riddle-popup");
                riddleCloseBtn.style.display = "none"; // Hide the button after it is clicked
            });
            document.querySelector("#riddle-popup .popup").appendChild(riddleCloseBtn);

            let robotCloseBtn = document.createElement("button");
            robotCloseBtn.textContent = "Close Robot Check Popup";
            robotCloseBtn.addEventListener("click", function () {
                hideElement("robot-check-popup");
                robotCloseBtn.style.display = "none"; // Hide the button after it is clicked
            });
            document.querySelector("#robot-check-popup .popup").appendChild(robotCloseBtn);
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                lockoutUser();
            } else {
                alert(`Incorrect answers! You have ${maxAttempts - attempts} attempts left.`);
            }
        }
    });

    // Submit button click handler
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        let errorMessage = "";

        if (!emailInput.value || !nameInput.value || !passwordInput.value || !dobInput.value) {
            errorMessage = "All fields are required.";
        } else if (!isValidEmail(emailInput.value)) {
            errorMessage = "Invalid email format.";
        }

        if (errorMessage) {
            showElement("robot-check-popup");
        } else {
            alert("Signup successful!");
            form.submit();
        }
    });
});