// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navbar = document.getElementById('navbar');

mobileNavToggle?.addEventListener('click', () => {
    navbar?.classList.toggle('active');
    const icon = mobileNavToggle.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar?.classList.remove('active');
        const icon = mobileNavToggle?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Dropdown toggle for mobile
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const htmlSection = section as HTMLElement;
        const sectionHeight = htmlSection.offsetHeight;
        const sectionTop = htmlSection.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem?.classList.contains('active');

        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            accordionItem?.classList.add('active');
        }
    });
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Show success message
    alert('Votre message a été envoyé. Nous vous remercions de votre attention.');
    contactForm.reset();
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
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

// Header scroll effect
const header = document.getElementById('header');

function headerScrollEffect() {
    if (window.scrollY > 50) {
        header?.style.setProperty('box-shadow', '0 2px 20px rgba(0, 0, 0, 0.15)');
    } else {
        header?.style.setProperty('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.1)');
    }
}

window.addEventListener('scroll', headerScrollEffect);

// Animate progress bars on scroll
const languageItems = document.querySelectorAll('.language-item');
let animated = false;

function animateProgressBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || animated) return;

    const sectionTop = skillsSection.offsetTop;
    const scrollY = window.scrollY + window.innerHeight;

    if (scrollY > sectionTop + 200) {
        languageItems.forEach(item => {
            const progressBar = item.querySelector('.progress') as HTMLElement;
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1s ease-out';
                    progressBar.style.width = width;
                }, 100);
            }
        });
        animated = true;
    }
}

window.addEventListener('scroll', animateProgressBars);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    highlightNavLink();
    toggleBackToTop();
    headerScrollEffect();
});