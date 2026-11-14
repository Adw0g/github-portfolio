/**
 * Chinmayi R - Portfolio Scripts
 * Handles: Custom Cursor, Interactive Loader, Scroll Effects & Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Interactive Loading Screen Sequence
  // ==========================================
  const loadingScreen = document.getElementById('loadingScreen');
  const loadPercent = document.getElementById('loadPercent');
  const loadingContainer = document.getElementById('loadingContainer');
  const welcomeBtn = document.getElementById('welcomeBtn');
  const loadingButton = document.getElementById('loadingButton');

  let currentPercent = 0;
  const loadInterval = setInterval(() => {
    // Progressive random increments
    const step = Math.floor(Math.random() * 8) + 3;
    currentPercent += step;

    if (currentPercent >= 100) {
      currentPercent = 100;
      clearInterval(loadInterval);
      loadPercent.textContent = '100%';

      // Transition loader button to "Explore" state
      setTimeout(() => {
        if (loadingContainer && welcomeBtn) {
          loadingContainer.style.display = 'none';
          welcomeBtn.style.display = 'inline-flex';
          welcomeBtn.style.animation = 'fadeIn 0.5s forwards';
        }
      }, 400);
    } else {
      loadPercent.textContent = `${currentPercent}%`;
    }
  }, 45);

  // Exit loader on button click or auto-exit after slight delay if clicked
  function dismissLoader() {
    loadingScreen.classList.add('loaded');
    document.body.style.overflow = 'auto';
  }

  if (loadingButton) {
    loadingButton.addEventListener('click', () => {
      dismissLoader();
    });
  }

  // Safety fallback: if user doesn't click after 4 seconds of finishing, auto-open
  setTimeout(() => {
    if (!loadingScreen.classList.contains('loaded')) {
      dismissLoader();
    }
  }, 4500);


  // ==========================================
  // 2. Custom Cursor Follower & Hover
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  // Smooth lerp trailing animation for outline
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    if (cursorOutline) {
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states for links and interactive targets
  const interactiveElements = document.querySelectorAll('a, button, [data-cursor="hover"], .project-card, .skill-category, .chip');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorOutline?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline?.classList.remove('hover');
    });
  });


  // ==========================================
  // 3. Navbar Scroll Behavior & Mobile Nav
  // ==========================================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }


  // ==========================================
  // 4. Subtle 3D Card Tilt Effect on Hover
  // ==========================================
  const tiltCards = document.querySelectorAll('.project-card, .about-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });


  // ==========================================
  // 5. Scroll Reveal Animations (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .about-card, .contact-box-wrap');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

});

