// ========== HAMBURGER MENU FUNCTIONALITY ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
// Enhanced Mobile Dropdown Functionality
dropdowns.forEach((dropdown) => {
  const dropdownBtn = dropdown.querySelector('.dropbtn');
  dropdownBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      dropdown.classList.toggle('active');

      // Close other open dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });
    }
  });
});



// ========== SEARCH FUNCTIONALITY ==========
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.querySelector('.search-overlay');
const closeSearch = document.querySelector('.close-search');

searchBtn.addEventListener('click', () => {
    searchOverlay.style.display = 'flex';
    setTimeout(() => {
        searchOverlay.classList.add('active');
        document.querySelector('.search-container input').focus();
    }, 10);
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    setTimeout(() => {
        searchOverlay.style.display = 'none';
    }, 300);
});

// Close search overlay when clicking outside
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        setTimeout(() => {
            searchOverlay.style.display = 'none';
        }, 300);
    }
});

// ========== NAVBAR SCROLL EFFECT ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)'; // Hide navbar on scroll down
    } else {
        navbar.style.transform = 'translateY(0)'; // Show navbar on scroll up
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

gsap.registerPlugin(ScrollTrigger);

const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTimeline
    .to(".hero-content", { opacity: 1, duration: 1 })
    .to(".line-1", { opacity: 1, y: 0, duration: 1 }, "-=0.5")
    .to(".line-2", { opacity: 1, y: 0, duration: 1 }, "-=0.7")
    .to(".line-3", { opacity: 1, y: 0, duration: 1 }, "-=0.7")
    .to(".hero-description", { opacity: 1, y: 0, duration: 1 }, "-=0.5")
    .to(".hero-buttons", { opacity: 1, y: 0, duration: 1 }, "-=0.7")
    .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.5");

gsap.to(".video-container", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// --- TEXT REVEAL ON SCROLL ---
gsap.utils.toArray('.hero-content > *').forEach(element => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: "top center",
            toggleActions: "play reverse reverse play"
        },
        y: 0,
        opacity: 1,
        duration: 1.5
    });
});

// --- ABOUT SECTION ANIMATIONS ---
gsap.from(".year-badge", {
    scrollTrigger: { trigger: ".about-section", start: "top 80%" },
    scale: 0,
    rotation: -180,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)"
});

gsap.from(".about-title, .about-description", {
    scrollTrigger: { trigger: ".about-content", start: "top 80%" },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out"
});

// --- EXPERTISE ITEMS ANIMATION ---
gsap.from(".expertise-item", {
    scrollTrigger: { trigger: ".expertise-grid", start: "top 80%" },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// --- STATS COUNTER ANIMATION ---
gsap.from(".stat-block", {
    scrollTrigger: { trigger: "body", start: "top 80%" },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)"
});
gsap.utils.toArray(".service-item").forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%", // Adjust this if needed
            toggleActions: "play none none none"
        },
        x: -100, // Moves from left
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2, // Stagger effect manually
        ease: "power3.out"
    });
});
// --- STATS COUNTER ANIMATION ---
const stats = document.querySelectorAll('.stat-number');
let animated = false;

ScrollTrigger.create({
    trigger: ".stats-wrapper",
    start: "top 80%",
    onEnter: () => {
        if (!animated) {
            animated = true;
            stats.forEach(stat => {
                const value = parseInt(stat.getAttribute('data-value'));
                let current = 0;
                const increment = value / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        stat.textContent = value;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.ceil(current);
                    }
                }, 30);
            });
        }
    }
});

// Animate services title
gsap.to('.services-title', {
  opacity: 1,
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.services-title',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  }
})

// Animate service cards
gsap.utils.toArray('.service-card').forEach((card, index) => {
  // Initial state
  gsap.set(card, {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotationX: 15
  })

  // Create timeline for each card
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      end: 'top 15%',
      toggleActions: 'play none none reverse',
      markers: false
    }
  })

  tl.to(card, {
    opacity: 1,
    y: 0,
    scale: 1,
    rotationX: 0,
    duration: 1,
    ease: 'power3.out',
    delay: index * 0.2
  })

  // Animate image on hover
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.service-image img'), {
      scale: 1.1,
      duration: 0.5
    })
    gsap.to(card, {
      y: -20,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    })
  })

  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelector('.service-image img'), {
      scale: 1,
      duration: 0.5
    })
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
  })
})

// Add parallax effect to service images
gsap.utils.toArray('.service-image').forEach(image => {
  gsap.to(image, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: image,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
});
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.utils.toArray('.stat-card').forEach((card, index) => {
      // Initial state
      gsap.set(card, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: 15
      });
  
      // Create timeline for each card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });
  
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.2
      });
  
      // Animate card on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -20,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
  
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });
  
    // Add parallax effect to stats cards
    gsap.utils.toArray('.stat-card').forEach(card => {
      gsap.to(card, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  });
  
  
// Footer animations
function initFooter() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate footer sections
    gsap.utils.toArray('.footer-section').forEach((section, index) => {
        gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                onEnter: () => section.classList.add('active')
            }
        });
    });

    // Scroll to top functionality
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Social links hover animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize both services and footer
document.addEventListener('DOMContentLoaded', () => {
    initFooter();
});
