// Initialize Lucide Icons
lucide.createIcons();

// Intersection Observer for Scroll Animations
const observeElements = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Add 'visible' class when element comes into view
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once animated to prevent re-animation on scroll up
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Find all elements with the .scroll-reveal class
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => observer.observe(el));
};

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  initThemeToggle();
  initBackToTop();
});

// Dark Mode Toggle Logic
const initThemeToggle = () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (!themeToggleBtn) return; // Exit if button not found

  // Default to light mode unless 'dark' is explicitly saved
  const isDarkMode = localStorage.getItem('theme') === 'dark';

  // Apply initial theme
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Handle click event
  themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    // Save preference to localStorage
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
};

// Back to Top Button Logic
const initBackToTop = () => {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) return;

  // Show/Hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Adjust pixel value to determine when it shows
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};
