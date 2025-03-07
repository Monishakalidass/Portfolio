document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
    });

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.add('fa-moon');
        themeIcon.classList.remove('fa-sun');
    }

    // Typed Text Effect with Enhanced Animation
    const typedTextElement = document.querySelector('.typed-text');
    const texts = ['AI Enthusiast', 'Developer', 'Innovator', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, isDeleting ? 80 : 150);
    }

    type();

    // Section Reveal Animation with Staggered Effect
    const revealElements = document.querySelectorAll('.reveal-animation');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const items = entry.target.querySelectorAll('.education-item, .project-item, .hobby-card, .achievement-card');
                items.forEach((item, index) => {
                    setTimeout(() => item.classList.add('active'), index * 150);
                });
            }
        });
    }, observerOptions);

    revealElements.forEach(element => observer.observe(element));

    // Enhanced Hover Effects
    const navLinks = document.querySelectorAll('.nav-link');
    const socialIcons = document.querySelectorAll('.social-icon');
    const interactiveCards = document.querySelectorAll('.skill-card, .project-item, .hobby-card, .achievement-card');

    [...navLinks, ...socialIcons].forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(2)';
            cursorFollower.style.background = 'rgba(26, 42, 68, 0.3)'; // Navy blue hover
        });
        card.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.background = '';
        });

        // 3D Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Ripple Effect for Buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-button, .connect-me');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Footer Social Icons Animation
    const footerIcons = document.querySelectorAll('.footer-social .social-icon');
    footerIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (name && email && message) {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Particle Effect for Home Section
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particlesContainer.appendChild(particle);

        const size = Math.random() * 5 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = 'rgba(26, 42, 68, 0.5)'; // Navy blue
        particle.style.animation = `floatParticle ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
    }
});