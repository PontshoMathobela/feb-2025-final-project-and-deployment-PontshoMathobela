// Animation and Interaction Functions
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeAnimations();
  setupScrollAnimations();
});

// Theme Management
function initializeTheme() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  const button = document.getElementById('themeToggleBtn');

  if (darkMode) {
    document.body.classList.add('dark-mode');
    if (button) updateThemeButton(button, true);
  } else {
    document.body.classList.remove('dark-mode');
    if (button) updateThemeButton(button, false);
  }

  if (button) {
    button.addEventListener('click', () => {
      toggleTheme();
      updateThemeButton(button, document.body.classList.contains('dark-mode'));
    });
    // Set initial button text
    updateThemeButton(button, document.body.classList.contains('dark-mode'));
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
}

function updateThemeButton(button, isDarkMode) {
  if (!button) return;
  button.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  // Optional: Add button animation
  button.style.transform = 'scale(1.1)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);
}

// Card Animations
function initializeAnimations() {
  const cards = document.querySelectorAll('.blog-card');
  
  cards.forEach((card, index) => {
    // Add initial animation delay
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
    
    // Add hover animations
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Scroll Animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll('.blog-card').forEach(card => {
    observer.observe(card);
  });
}

// Smooth Scroll for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});