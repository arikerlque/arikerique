
// === LOGIN SYSTEM ===

document.addEventListener("DOMContentLoaded", () => {
  const authButton = document.getElementById("auth-button");
  const usernameDisplay = document.getElementById("username-display");
  const loginForm = document.getElementById("login-form");

  const user = localStorage.getItem("user");

  if (user) {
    if (usernameDisplay) usernameDisplay.textContent = `Welcome, ${user}!`;
    if (authButton) authButton.textContent = "Logout";
  } else {
    if (usernameDisplay) usernameDisplay.textContent = `Welcome, Trespasser`;
    if (authButton) authButton.textContent = "Login";
  }

  if (authButton) {
    authButton.addEventListener("click", () => {
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
        location.reload();
      } else {
        window.location.href = "loginsignup.html";
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById("username-input");
      if (usernameInput && usernameInput.value.trim() !== "") {
        localStorage.setItem("user", usernameInput.value.trim());
        window.location.href = "index.html";
      }
    });
  }

  // === THEME COLOR SUPPORT ===
  applyThemeColor();

  const saveThemeBtn = document.getElementById("save-theme");
  if (saveThemeBtn) {
    saveThemeBtn.addEventListener("click", () => {
      const color = document.getElementById("theme-color").value;
      localStorage.setItem("themeColor", color);
      document.documentElement.style.setProperty("--theme-accent", color);
    });
  }
});

function applyThemeColor() {
  const color = localStorage.getItem("themeColor");
  if (color) {
    document.documentElement.style.setProperty("--theme-accent", color);
  }
}
