document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    const logoutButton = document.getElementById("logout-btn");
    const adminForm = document.getElementById('admin-register-form');
    const adminUsername = document.getElementById('admin-username').value;
    const adminPassword = document.getElementById('admin-password').value;

    // Check if the user is already logged in
    if (localStorage.getItem("token")) {
        toggleLoginDisplay(true);
    }

    // Handle login form submission
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("token", result.token);
                loginMessage.textContent = "Login successful!";
                toggleLoginDisplay(true);
            } else {
                loginMessage.textContent = result.message || "Login failed!";
            }
        } catch (error) {
            console.error("Login error:", error);
            loginMessage.textContent = "An error occurred. Please try again.";
        }
    });

    // Handle logout button click
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        loginMessage.textContent = "You have been logged out.";
        toggleLoginDisplay(false);
    });

    // Toggle login and logout display
    function toggleLoginDisplay(isLoggedIn) {
        loginForm.style.display = isLoggedIn ? "none" : "block";
        logoutButton.style.display = isLoggedIn ? "block" : "none";
    };

    adminForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/auth/admin/register/new", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ adminUsername, adminPassword })
            });
            const result = await response.json();
            if (response.ok) {
                
            }
        } catch (err) {
            console.error(err)
        }
    });

    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const message = document.getElementById('register-message');
            if (response.ok) {
                message.textContent = 'Registration successful!';
                window.location.href = "/auth/login"
            } else {
                const data = await response.json();
                message.textContent = data.message || 'Registration failed.';
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});
