let loginErrorMessage;
const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    if (!loginErrorMessage) {
        console.error("Could not find login-error-message")
    }
    if (!username) {
        loginErrorMessage.textContent = "Please enter your username";
        return;
    }
    if (!password) {
        loginErrorMessage.textContent = "Please enter your password";
        return;
    }
    if (username != "username") {
        loginErrorMessage.textContent = "Incorrect username";
        return
    }
    if (password != "password") {
        loginErrorMessage.textContent = "Incorrect password";
        return
    }
    sessionStorage.setItem("signed-in", true);
    window.location.href = "../"
};

document.addEventListener("DOMContentLoaded", (_e) => {
    const signedIn = sessionStorage.getItem("signed-in") === "true";
    if (signedIn) {
        window.location.href = "../";
    }
    loginErrorMessage = document.querySelector("#login-error-message");
    console.log(loginErrorMessage);

    document.addEventListener("input", (_e) => {
        loginErrorMessage.textContent = "";
    });

    let hidden = true;
    const hideButton = document.querySelector("#hide-button");
    const loginPassword = document.querySelector("#login-password");
    const showIcon = document.querySelector("#password-show-icon");
    const hideIcon = document.querySelector("#password-hide-icon");
    hideButton.addEventListener("click", (_e) => {
        hidden = !hidden;
        if (hidden) {
            loginPassword.type = "password";
            showIcon.style.display = "block";
            hideIcon.style.display = "none";
        } else {
            loginPassword.type = "text";
            hideIcon.style.display = "block";
            showIcon.style.display = "none";
        }
    });

    const inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        const checkInput = (_e) => {
            const labels = input.labels;
            if (labels.length <= 0) {
                console.error("No label found for input on login page");
            }
            const label = labels[0];
            const value = input.value;
            if (value) {
                label.style.display = "none";
            } else {
                label.style.display = "block";
            }
        }
        checkInput();
        input.addEventListener("input", checkInput);
    }

    let form = document.querySelector("#login-form");
    form.addEventListener('submit', handleSubmit);
});

