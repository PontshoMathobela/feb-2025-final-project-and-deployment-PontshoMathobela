// ========== 1. Show Welcome Message on Page Load ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to My Blog!");
});

// ========== 2. Toggle Light/Dark Mode ==========
function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  // Update button text
  const btn = document.getElementById("themeToggleBtn");
  if (document.body.classList.contains("dark-mode")) {
    btn.textContent = "Switch to Light Mode";
  } else {
    btn.textContent = "Switch to Dark Mode";
  }
}

// ========== 3. Toggle Blog Post Visibility ==========
function togglePost(id) {
  const post = document.getElementById(id);
  if (post.style.display === "none") {
    post.style.display = "block";
  } else {
    post.style.display = "none";
  }
}

// ========== 4. Form Validation ==========
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || message === "") {
    alert("Please fill out all fields.");
    return false;
  }

  alert("Thank you for your message!");
  return true;
}
