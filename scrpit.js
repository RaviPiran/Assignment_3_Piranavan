/**
 * PLANTIX - Interactive Botanical Script
 * Handles animations, dark mode, accordion, interactive filtering, counters, and toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features once DOM is ready
  initScrollAnimations();
  initNavbarScroll();
  initScrollProgressBar();
  initBackToTop();
  initAccordion();
  initProductFilter();
  initAnimatedCounters();
  initInteractiveCart();
  initContactForm();
  initSavedTheme();
});

/* --------------------------------------------------------------------------
   1. Dark Mode / Theme Toggle
   -------------------------------------------------------------------------- */
function myFunction() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  const isDark = body.classList.contains('dark-mode');
  const image = document.getElementById('modeIcon');

  if (image) {
    // Add quick spin animation class
    image.style.transform = 'rotate(360deg) scale(0.8)';
    setTimeout(() => {
      if (isDark) {
        image.src = './Assets/img/sun(dark).svg';
        image.alt = 'Switch to light mode';
      } else {
        image.src = './Assets/img/moon(dark).svg';
        image.alt = 'Switch to dark mode';
      }
      image.style.transform = 'rotate(0deg) scale(1)';
    }, 200);
  }

  // Save preference in localStorage
  try {
    localStorage.setItem('plantix_theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // Ignore localStorage errors in private browsing
  }

  showToast(isDark ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️');
}

function initSavedTheme() {
  try {
    const saved = localStorage.getItem('plantix_theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      const image = document.getElementById('modeIcon');
      if (image) {
        image.src = './Assets/img/sun(dark).svg';
      }
    }
  } catch (e) {
    // Ignore
  }
}

/* --------------------------------------------------------------------------
   2. FAQ Accordion with Smooth Sliding Animation
   -------------------------------------------------------------------------- */
function initAccordion() {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach((btn) => {
    btn.addEventListener('click', function () {
      const parentCard = this.closest('.faq-card');
      const panel = this.nextElementSibling;
      const isOpen = parentCard.classList.contains('active');

      // Close all other accordions for a clean, focused accordion experience
      document.querySelectorAll('.faq-card').forEach((card) => {
        if (card !== parentCard && card.classList.contains('active')) {
          card.classList.remove('active');
          const otherPanel = card.querySelector('.panel');
          if (otherPanel) {
            otherPanel.style.maxHeight = null;
          }
        }
      });

      // Toggle current accordion
      if (isOpen) {
        parentCard.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        parentCard.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 30 + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach((el) => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    elements.forEach((el) => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   4. Navbar Scroll & Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. Product Category Filtering with Smooth Transition
   -------------------------------------------------------------------------- */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter') || 'all';

      products.forEach((product) => {
        const categories = product.getAttribute('data-category') || '';
        const match = filterValue === 'all' || categories.includes(filterValue);

        if (match) {
          product.style.display = 'flex';
          setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          product.style.opacity = '0';
          product.style.transform = 'translateY(20px) scale(0.9)';
          setTimeout(() => {
            product.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Animated Stats Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const step = target / 60; // 60 frames

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.innerText = (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCounter();
    });
  };

  const statSection = document.querySelector('.stats-section');
  if (statSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    }, { threshold: 0.4 });

    observer.observe(statSection);
  }
}

/* --------------------------------------------------------------------------
   8. Interactive Cart, Wishlist, and Action Buttons
   -------------------------------------------------------------------------- */
function initInteractiveCart() {
  const addButtons = document.querySelectorAll('.btn-add-cart');
  const wishlistButtons = document.querySelectorAll('.action-wishlist');

  addButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productTitle = btn.closest('.product-card').querySelector('.product-title').innerText;
      
      // Button click micro-feedback
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);

      showToast(`Added "${productTitle}" to cart! 🌿`);
    });
  });

  wishlistButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-heart');
        icon.classList.toggle('bi-heart-fill');
        icon.style.color = icon.classList.contains('bi-heart-fill') ? '#ef4444' : '';
      }
      showToast('Saved to your wishlist! ❤️');
    });
  });
}

/* --------------------------------------------------------------------------
   9. Contact Form Validation & Animated Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit-contact');
    const originalText = submitBtn.innerHTML;

    // Loading state animation
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message Sent!';
      submitBtn.style.background = '#15803d';

      showToast('Thank you! Our plant team will reach out within 24 hours. 🌱');
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   10. Newsletter Email Validation
   -------------------------------------------------------------------------- */
function validateEmail() {
  const emailInput = document.getElementById('emailInput');
  const feedbackMessage = document.getElementById('feedbackMessage');
  if (!emailInput || !feedbackMessage) return;

  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailValue)) {
    feedbackMessage.innerText = '✓ Thank you for subscribing to Plantix!';
    feedbackMessage.style.color = '#15803d';
    showToast('Subscribed to Plantix newsletter! 💌');
    emailInput.value = '';

    // Clear feedback message after 4s
    setTimeout(() => {
      feedbackMessage.innerText = '';
    }, 4000);
  } else {
    feedbackMessage.innerText = 'Please enter a valid email address.';
    feedbackMessage.style.color = '#ef4444';

    // Shake animation on error
    emailInput.style.transform = 'translateX(-6px)';
    setTimeout(() => (emailInput.style.transform = 'translateX(6px)'), 80);
    setTimeout(() => (emailInput.style.transform = 'translateX(-4px)'), 160);
    setTimeout(() => (emailInput.style.transform = 'translateX(4px)'), 240);
    setTimeout(() => (emailInput.style.transform = 'translateX(0)'), 320);
  }
}

/* --------------------------------------------------------------------------
   11. Custom Toast Notification
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('customToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'customToast';
    toast.className = 'custom-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   12. Google Map Initialization
   -------------------------------------------------------------------------- */
function initMap() {
  const mapElement = document.getElementById('map');
  const overlay = document.getElementById('mapOverlay');
  if (!mapElement) return;

  if (typeof google === 'undefined' || !google.maps) {
    if (overlay) overlay.style.display = 'flex';
    return;
  }

  try {
    const options = {
      zoom: 16,
      center: { lat: 9.704851, lng: 80.069853 },
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9e8dc' }]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#eef6f1' }]
        }
      ]
    };

    const map = new google.maps.Map(mapElement, options);

    new google.maps.Marker({
      position: { lat: 9.704851, lng: 80.069853 },
      map: map,
      title: 'Plantix Botanical Garden & Nursery',
      animation: google.maps.Animation.DROP
    });

    if (overlay) overlay.style.display = 'none';
  } catch (err) {
    if (overlay) overlay.style.display = 'flex';
  }
}

// Fallback check after 2 seconds if map script fails to load
setTimeout(() => {
  const mapElement = document.getElementById('map');
  const overlay = document.getElementById('mapOverlay');
  if (mapElement && (!mapElement.children.length || typeof google === 'undefined')) {
    if (overlay) overlay.style.display = 'flex';
  }
}, 2000);
