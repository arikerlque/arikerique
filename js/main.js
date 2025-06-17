function getSavedUser() {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const heading = form?.querySelector("h1")?.textContent;
  const greeting = document.getElementById("greeting");
  const authButton = document.getElementById("auth-button");
  const currentUser = localStorage.getItem("currentUser");
  const saved = getSavedUser();

  // Login/Register handling
  if (form && heading) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = form.querySelector('input[type="text"]').value;
      const password = form.querySelector('input[type="password"]').value;

      if (heading === "Register") {
        const now = new Date().toLocaleString();
        const userData = {
          username,
          password,
          createdAt: now,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Account created! You can now log in.");
        window.location.href = "loginsignup.html";
      } else if (heading === "Login") {
        if (saved && username === saved.username && password === saved.password) {
          localStorage.setItem("currentUser", saved.username);
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          alert("Incorrect username or password!");
        }
      }
    });
  }

  // Homepage greeting + button
  if (greeting && authButton) {
    if (currentUser && saved && currentUser === saved.username) {
      greeting.textContent = `Welcome, ${currentUser}`;
      authButton.textContent = "Logout";
      authButton.onclick = () => {
        localStorage.removeItem("currentUser");
        window.location.reload();
      };
    } else {
      greeting.textContent = "Login";
      authButton.textContent = "Login";
      authButton.onclick = () => {
        window.location.href = "loginsignup.html";
      };
    }
  }

  // Profile page logic
  const profileTitle = document.getElementById("profile-title");
  const nameSpan = document.getElementById("profile-username");
  const dateSpan = document.getElementById("profile-date");

  if (profileTitle && nameSpan && dateSpan) {
    if (currentUser && saved && currentUser === saved.username) {
      nameSpan.textContent = saved.username;
      dateSpan.textContent = saved.createdAt;
    } else {
      nameSpan.textContent = "Not logged in";
      dateSpan.textContent = "N/A";
    }
  }

  // Profile enhancements
  const profilePic = document.getElementById("profile-pic");
  const picUpload = document.getElementById("pic-upload");
  const bio = document.getElementById("bio");
  const theme = document.getElementById("theme-color");
  const title = document.getElementById("user-title");
  const titleSelect = document.getElementById("title-select");
  const wrapper = document.querySelector(".wrapper");

  if (profilePic && picUpload) {
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) profilePic.src = storedPic;

    picUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        profilePic.src = imageData;
        localStorage.setItem("profilePic", imageData);
      };
      if (file) reader.readAsDataURL(file);
    });
  }

  if (bio) {
    const savedBio = localStorage.getItem("profileBio");
    if (savedBio) bio.value = savedBio;
  }

  if (theme && wrapper) {
    const savedTheme = localStorage.getItem("themeColor");
    if (savedTheme) {
      theme.value = savedTheme;
      wrapper.style.backgroundColor = savedTheme;
    }
  }

  if (title && titleSelect) {
    const savedTitle = localStorage.getItem("userTitle");
    if (savedTitle) {
      title.textContent = savedTitle;
      titleSelect.value = savedTitle;
    }
  }
});

function saveBio() {
  const bio = document.getElementById("bio").value;
  localStorage.setItem("profileBio", bio);
  alert("Bio saved!");
}

function saveTheme() {
  const color = document.getElementById("theme-color").value;
  document.querySelector(".wrapper").style.backgroundColor = color;
  localStorage.setItem("themeColor", color);
}

function saveTitle() {
  const title = document.getElementById("title-select").value;
  localStorage.setItem("userTitle", title);
  document.getElementById("user-title").textContent = title;
}

function goHome() {
  window.location.href = "index.html";
}
