document.getElementById("signIn-btn").addEventListener("click", () => {
    const userNameInput = document.getElementById("input-username");
    const userName = userNameInput.value;
    // console.log(userName)

    const passwordInput = document.getElementById("input-password");
    const password = passwordInput.value;

    if (userName === "admin" && password === "admin123") {
        alert("Sign In Successfull...");
        window.location.assign("./home.html");
    } else if (userName !== "admin") {
        alert("Wrong Username...");
        return;
    } else if (password !== "admin123") {
        alert("Wrong Password...");
        return;
    }
});
