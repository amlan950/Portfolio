// Premium Surfaces Website JavaScript

// Portfolio data for modal display
const portfolioData = {
  'anty-onix': {
    title: 'ANTY ONIX',
    type: 'Polished Porcelain',
    description: 'Sophisticated marble-effect porcelain with subtle veining, perfect for bathroom and kitchen applications. This premium surface combines the beauty of natural marble with the durability and practicality of porcelain.',
    sizes: ['120x120 cm', '100x100 cm', '60x120 cm'],
    finish: 'Polished',
    applications: ['Bathrooms', 'Kitchens', 'Living Areas', 'Commercial Spaces'],
    image: 'https://pplx-res.cloudinary.com/image/upload/v1754745616/pplx_project_search_images/1159190584fedef7cceef796b5494e9d55cbede2.png'
  },
  'milan': {
    title: 'MILAN',
    type: 'Polished Porcelain',
    description: 'Elegant white marble-look porcelain ideal for living spaces and high-traffic areas. Features subtle veining and a lustrous finish that brings sophistication to any interior design.',
    sizes: ['120x120 cm', '100x100 cm', '60x120 cm'],
    finish: 'Polished',
    applications: ['Living Rooms', 'Dining Areas', 'Hallways', 'Commercial Lobbies'],
    image: 'https://pplx-res.cloudinary.com/image/upload/v1754729591/pplx_project_search_images/e4d1eff7aa5e99bb255dc8ead2c946523638d469.png'
  },
  'asis': {
    title: 'ASIS',
    type: 'Porcelain',
    description: 'Clean white porcelain with subtle texturing, versatile for any modern interior design. Perfect for creating bright, contemporary spaces with a minimalist aesthetic.',
    sizes: ['60x120 cm', '30x60 cm'],
    finish: 'Rectified',
    applications: ['Bedrooms', 'Offices', 'Retail Spaces', 'Modern Interiors'],
    image: 'https://pplx-res.cloudinary.com/image/upload/v1754715973/pplx_project_search_images/6adf7f34aa83d9c1230caf979c9011ca5c3e30e8.png'
  }
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializePortfolioFilters();
  initializeModal();
  initializeContactForm();
  initializeSmoothScrolling();
  preloadImages();
});

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  // Toggle mobile menu
  navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Portfolio filtering functionality
function initializePortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter portfolio items with smooth animation
      portfolioItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          // Show item
          item.style.display = 'block';
          setTimeout(() => {
            item.classList.remove('hidden');
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        } else {
          // Hide item
          item.classList.add('hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            if (item.classList.contains('hidden')) {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

// Modal functionality
function initializeModal() {
  const modal = document.getElementById('product-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const viewButtons = document.querySelectorAll('.view-btn');

  if (!modal || !modalBackdrop || !modalClose || !modalBody) return;

  // Open modal when view button is clicked
  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const productKey = this.getAttribute('data-product');
      openModal(productKey);
    });
  });

  // Close modal events
  modalClose.addEventListener('click', function(e) {
    e.preventDefault();
    closeModal();
  });

  modalBackdrop.addEventListener('click', function(e) {
    e.preventDefault();
    closeModal();
  });

  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  function openModal(productKey) {
    const product = portfolioData[productKey];
    if (!product) return;

    // Create modal content
    const modalContent = `
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <h3>${product.title}</h3>
      <div class="product-details">
        <div class="detail-item">
          <span class="detail-label">Type:</span>
          <span class="detail-value">${product.type}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Finish:</span>
          <span class="detail-value">${product.finish}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Available Sizes:</span>
          <span class="detail-value">${product.sizes.join(', ')}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Applications:</span>
          <span class="detail-value">${product.applications.join(', ')}</span>
        </div>
      </div>
      <p style="margin-top: 20px; color: var(--color-text-secondary); line-height: 1.6;">
        ${product.description}
      </p>
      <div style="margin-top: 24px;">
        <button class="btn btn--primary" onclick="scrollToContact()">Request Sample</button>
      </div>
    `;

    modalBody.innerHTML = modalContent;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      phone: formData.get('phone')?.trim(),
      project: formData.get('project'),
      message: formData.get('message')?.trim()
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields (Name, Email, Message).', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Validate message length
    if (data.message.length < 10) {
      showNotification('Please provide a more detailed message (at least 10 characters).', 'error');
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending Message...';
    submitButton.disabled = true;

    // Simulate form submission with realistic delay
    setTimeout(() => {
      // Reset form and button
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      // Show success message
      showNotification(
        'Thank you for your message! We\'ll get back to you within 24 hours to discuss your project requirements.',
        'success'
      );
      
      // Scroll to top of contact section to show the notification better
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 2000);
  });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only prevent default for hash links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Handle hero CTA button
  const heroCTA = document.querySelector('.hero .btn');
  if (heroCTA) {
    heroCTA.addEventListener('click', function(e) {
      e.preventDefault();
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = portfolioSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
}

// Utility function to scroll to contact section
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 80;
  const targetPosition = contactSection.offsetTop - navbarHeight;
  
  // Close modal first if open
  const modal = document.getElementById('product-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  
  // Then scroll to contact with a slight delay
  setTimeout(() => {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Focus on the name field for better UX
    setTimeout(() => {
      const nameField = document.getElementById('name');
      if (nameField) {
        nameField.focus();
      }
    }, 800);
  }, 300);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  
  // Set initial styles for animation
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-${type === 'error' ? 'error' : 'success'});
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 3000;
    max-width: 350px;
    font-weight: 500;
    line-height: 1.4;
    word-wrap: break-word;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.classList.add('show');
  }, 100);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, type === 'success' ? 5000 : 4000);
}

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.portfolio-item, .service-card, .value-item');
  animatedElements.forEach(el => {
    if (el) observer.observe(el);
  });
}

// Preload images for better performance
function preloadImages() {
  const imageUrls = [
    ...Object.values(portfolioData).map(product => product.image),
    'https://pplx-res.cloudinary.com/image/upload/v1754806995/pplx_project_search_images/b93cfca77908477a1262e8c1433b5e8d92d6f105.png',
    'https://pplx-res.cloudinary.com/image/upload/v1754681097/pplx_project_search_images/fca433e8e3b648431fc7ab2e283e9c3a9781528d.png'
  ];
  
  imageUrls.forEach(url => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  });
}

// Handle window resize events
window.addEventListener('resize', function() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  
  // Close mobile menu on desktop
  if (window.innerWidth > 768 && navMenu && navToggle) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Handle scroll events for navbar enhancement
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add shadow when scrolled
  if (scrollTop > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    navbar.style.backdropFilter = 'blur(12px)';
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.backdropFilter = 'blur(10px)';
  }
  
  lastScrollTop = scrollTop;
});

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeScrollAnimations, 1000);
});

// Ensure images load properly and handle errors
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Image failed to load:', this.src);
      // Could add a placeholder or retry logic here
    });
    
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });
});

// Add global error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});

// Make scrollToContact globally available
window.scrollToContact = scrollToContact;