// Initialize AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
import { debounce } from 'lodash';

// ========== 1. Initialize Animations ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to My Blog!");
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });
  initializeAnimations();
  setupScrollAnimations();

  const btn = document.getElementById("themeToggleBtn");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
    // Set initial button text based on mode
    btn.textContent = document.body.classList.contains("dark-mode")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  }

  // Load saved theme preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "Switch to Light Mode";
  }
});

// ========== 2. Enhanced Theme Toggle ==========
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("themeToggleBtn");
  if (btn) {
    if (document.body.classList.contains("dark-mode")) {
      btn.textContent = "Switch to Light Mode";
      localStorage.setItem("darkMode", "true");
    } else {
      btn.textContent = "Switch to Dark Mode";
      localStorage.setItem("darkMode", "false");
    }
  }
}

// ========== 3. Enhanced Blog Post Interactions ==========
function togglePost(id) {
  const post = document.getElementById(id);
  const isHidden = post.style.display === "none";

  if (isHidden) {
    post.style.display = "block";
    post.style.opacity = "0";
    requestAnimationFrame(() => {
      post.style.opacity = "1";
      post.style.transition = "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  } else {
    post.style.opacity = "0";
    post.style.transition = "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    setTimeout(() => {
      post.style.display = "none";
    }, 300);
  }
}

// ========== 4. Enhanced Post Reactions ==========
const reactionCounts = new Map();

function reactToPost(postId, reaction) {
  const counter = document.getElementById(`${postId}-${reaction}s`);
  const key = `${postId}-${reaction}`;
  const currentCount = reactionCounts.get(key) || 0;
  const newCount = currentCount + 1;

  reactionCounts.set(key, newCount);
  counter.textContent = newCount;

  // Animate the counter
  counter.style.transform = 'scale(1.2)';
  setTimeout(() => {
    counter.style.transform = 'scale(1)';
  }, 200);

  showToast(`Thanks for your ${reaction}!`);

  // Save to localStorage
  localStorage.setItem('reactions', JSON.stringify(Array.from(reactionCounts.entries())));
}

// Load saved reactions
try {
  const saved = localStorage.getItem('reactions');
  if (saved) {
    reactionCounts.clear();
    JSON.parse(saved).forEach(([key, value]) => reactionCounts.set(key, value));
    // Update UI
    reactionCounts.forEach((value, key) => {
      const [postId, reaction] = key.split('-');
      const counter = document.getElementById(`${postId}-${reaction}s`);
      if (counter) counter.textContent = value;
    });
  }
} catch (error) {
  console.error('Error loading saved reactions:', error);
}

// ========== 5. Enhanced Share Functionality ==========
async function sharePost(title) {
  const url = window.location.href;
  const shareData = {
    title: title,
    text: `Check out this post: ${title}`,
    url: url
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast('Thanks for sharing!');
    } else {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
    showToast('Error sharing post', 'error');
  }
}

// ========== 6. Enhanced Form Validation ==========
function validateForm() {
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  const errors = [];

  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Please enter a valid email");
  if (!message) errors.push("Message is required");

  if (errors.length > 0) {
    showToast(errors.join('. '), "error");
    return false;
  }

  // Simulate form submission
  showToast("Message sent successfully!", "success");

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";

  return false;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ========== 7. Enhanced Toast Notifications ==========
let toastTimeout;

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimeout);

  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.backgroundColor = type === 'error' ? '#ff4444' :
                               type === 'success' ? '#00c851' : '#333';

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 300);
  }, 3000);
}

// ========== 8. Enhanced Search Functionality ==========
const searchPosts = debounce(() => {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const filter = searchInput.value.toLowerCase();
  const posts = document.getElementsByClassName('blog-card');

  Array.from(posts).forEach(post => {
    const tags = post.dataset.tags || '';
    const title = post.querySelector('h2')?.textContent || '';
    const content = post.querySelector('p')?.textContent || '';

    const matches = tags.toLowerCase().includes(filter) ||
                   title.toLowerCase().includes(filter) ||
                   content.toLowerCase().includes(filter);

    if (matches) {
      post.style.display = '';
      requestAnimationFrame(() => {
        post.style.opacity = '1';
      });
    } else {
      post.style.opacity = '0';
      setTimeout(() => {
        post.style.display = 'none';
      }, 300);
    }
  });
}, 300);

// ========== 9. Enhanced Scroll Animations ==========
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ========== 10. Enhanced Typing Effect ==========
function initializeAnimations() {
  const typingElements = document.querySelectorAll('.typing-effect');

  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, Math.random() * 50 + 50);
      }
    }

    type();
  });
}