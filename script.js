document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL STATE ---
  const header = document.querySelector('header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // --- MOBILE NAV DRAWER ---
  const menuBtn = document.querySelector('.menu-btn');
  const navLinksList = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  menuBtn.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinksList.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
      menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
  });

  // --- TYPING ANIMATION ---
  const roles = [
    "Java Full Stack Developer",
    "Computer Science Engineer",
    "Back-End API Builder",
    "Open Source Enthusiast"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedRoleSpan = document.querySelector('.typed-role');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const waitBetweenRoles = 2000;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedRoleSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedRoleSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = waitBetweenRoles;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = 500; // Small delay before starting next word
    }

    setTimeout(typeEffect, currentSpeed);
  }

  // Start typing effect if element exists
  if (typedRoleSpan) {
    setTimeout(typeEffect, 1000);
  }

  // --- SCROLL ACTIVE SECTIONS TRACKING & FADE-IN REVEAL ---
  const sections = document.querySelectorAll('section');
  const revealElements = document.querySelectorAll('.reveal');

  // Trigger reveal on page load
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });

    // Update active nav link
    let currentSectionId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.clientHeight;
      if (window.scrollY >= (secTop - 250)) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  // Run on scroll and on load
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial load run

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatus = document.querySelector('.form-status');
  const submitBtnText = document.querySelector('.submit-btn-text');
  const submitBtnIcon = document.querySelector('.submit-btn-icon');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      // Simple Email Regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Transition to loading state
      submitBtnText.textContent = 'Sending Message...';
      submitBtnIcon.className = 'fas fa-spinner fa-spin';
      contactForm.querySelectorAll('.form-input').forEach(el => el.disabled = true);

      // Simulate API/Network call
      setTimeout(() => {
        // Save message locally to mock backend storage
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({ name, email, subject, message, date: new Date().toISOString() });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        // Restore submit button state
        submitBtnText.textContent = 'Send Message';
        submitBtnIcon.className = 'fas fa-paper-plane';
        contactForm.querySelectorAll('.form-input').forEach(el => {
          el.disabled = false;
          el.value = ''; // clear input
        });

        showStatus(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
      }, 1500);
    });
  }

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    
    // Auto-scroll slightly to show message
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }
  }

  // --- BACK TO TOP CLICK ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
