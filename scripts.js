// 
// ARVANIA - Modern Web Design & AI Automation
// 
// Configuration:
// - Agency Name: ARVANIA
// - Contact Email: hello@arvania.com
// - Portfolio Data: See portfolioData array below
// - Contact Form Endpoint: Replace with your Formspree/Netlify Forms endpoint
// 
// How to add new portfolio projects:
// 1. Add new object to portfolioData array with full details
// 2. Ensure id matches with project reference
// 3. Add images to /assets/images/ directory
// 
// How to update contact form:
// 1. Replace form action with your endpoint
// 2. Update form fields if needed
// 3. Update success/error messages
// 

// DOM Elements
const preloader = document.querySelector('.preloader');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const contactForm = document.getElementById('contactForm');
const serviceProgressBars = document.querySelectorAll('.progress-bar');
const skillLevels = document.querySelectorAll('.skill-level');
const sectionHeaders = document.querySelectorAll('.section-header');
const valueCards = document.querySelectorAll('.value-card');
const serviceCards = document.querySelectorAll('.service-card');
const pricingCards = document.querySelectorAll('.pricing-card');
const skillBars = document.querySelectorAll('.skill-bar');
const portfolioProjectsElements = document.querySelectorAll('.portfolio-project');
const aboutText = document.querySelector('.about-text');
const aboutImage = document.querySelector('.about-image');
const contactFormElement = document.querySelector('.contact-form');
const contactInfoElement = document.querySelector('.contact-info');
const detailSections = document.querySelectorAll('.detail-section');
const formModal = document.getElementById('formModal');
const modalClose = document.querySelector('.modal-close');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader after 1.5 seconds
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 1500);
    
    // Set up Intersection Observer for animations
    setupIntersectionObserver();
    
    // Set up event listeners
    setupEventListeners();
    
    // Animate service progress bars
    animateProgressBars();
    
    // Add scroll event for header effect
    window.addEventListener('scroll', handleScroll);
});

// Handle scroll for header effect
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        header.style.padding = '1rem 0';
    }
}

// Set up Intersection Observer
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -150px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    sectionHeaders.forEach(el => observer.observe(el));
    valueCards.forEach(el => observer.observe(el));
    serviceCards.forEach(el => observer.observe(el));
    pricingCards.forEach(el => observer.observe(el));
    skillBars.forEach(el => observer.observe(el));
    portfolioProjectsElements.forEach(el => observer.observe(el));
    
    // Observe about section elements
    if (aboutText) observer.observe(aboutText);
    if (aboutImage) observer.observe(aboutImage);
    
    // Observe contact section elements
    if (contactFormElement) observer.observe(contactFormElement);
    if (contactInfoElement) observer.observe(contactInfoElement);
    
    // Observe detail sections
    detailSections.forEach(el => observer.observe(el));
}

// Set up event listeners
function setupEventListeners() {
    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Modal close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    if (formModal) {
        formModal.addEventListener('click', function(e) {
            if (e.target === formModal) {
                closeModal();
            }
        });
    }
}

// Close modal function
function closeModal() {
    formModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    // Reset the modal content back to loading state for next use
    setTimeout(() => {
        const modalBody = formModal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="loading-spinner"></div>
                <p class="modal-text">Sending your message...</p>
            `;
        }
    }, 300); // Delay to allow fade out animation
}

// Animate progress bars
function animateProgressBars() {
    const animateBar = (bar) => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    };
    
    serviceProgressBars.forEach(animateBar);
    skillLevels.forEach(animateBar);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault(); // Still prevent default to handle it with fetch

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show the modal
    formModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open

    // Disable the submit button to prevent double submission
    submitButton.disabled = true;

    // Use your deployed Google Apps Script Web App URL
    fetch('https://script.google.com/macros/s/AKfycbw33VpdPb2IJ2QmUGYeGRhG16iFUaTCocfneOmzMe110mGE05WYmR0Mc76DvndnRcbS/exec', {
        method: 'POST',
        body: formData, // Send the FormData object directly
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Or response.text() depending on what your script returns
        } else {
            // Throw an error if the response status is not ok (e.g., 4xx, 5xx)
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Submission failed');
            });
        }
    })
    .then(resultData => {
        // Handle successful response from the script
        console.log('Success:', resultData);
        // Update modal content to show success message
        const modalBody = formModal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-check">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22.37 9 12 19 8 15"></polyline>
                </svg>
            </div>
            <p class="modal-text">Your message has been sent successfully!</p>
        `;
    })
    .catch(error => {
        // Handle errors (network issues, script errors, etc.)
        console.error('Error:', error);
        // Update modal content to show error message
        const modalBody = formModal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-x">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
            <p class="modal-text">There was an error sending your message. Please try again later.</p>
        `;
    })
    .finally(() => {
        // Re-enable the button regardless of success/error
        submitButton.disabled = false;
        
        // Close the modal after 4 seconds regardless of success or error
        setTimeout(() => {
            closeModal();
            // Reset the form after modal closes
            contactForm.reset();
        }, 4000); // 4 seconds
    });
}

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimizations
// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Optimize animations for performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical animations
        console.log('Non-critical animations initialized');
    });
} else {
    setTimeout(() => {
        // Fallback for older browsers
        console.log('Non-critical animations initialized (fallback)');
    }, 2000);
}