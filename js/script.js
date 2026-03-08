/**
 * Soorya Kumar Portfolio
 * Interactive logic for UI
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.scrollto').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                let target = document.querySelector(this.getAttribute('href'));
                
                // close mobile menu if opened
                if (document.body.classList.contains('mobile-nav-active')) {
                    document.body.classList.remove('mobile-nav-active');
                    let toggleBtn = document.querySelector('.mobile-nav-toggle');
                    toggleBtn.classList.remove('bx-x');
                    toggleBtn.classList.add('bx-menu');
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile nav toggle
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            document.body.classList.toggle('mobile-nav-active');
            this.classList.toggle('bx-menu');
            this.classList.toggle('bx-x');
        });
    }

    // Scroll reveal animation using Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // optional: reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a.scrollto');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Custom Typing Animation Logic
    const typedSpan = document.querySelector('.typed');
    if (typedSpan) {
        const typedItemsString = typedSpan.getAttribute('data-typed-items');
        const items = typedItemsString.split(',').map(s => s.trim());
        let itemIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 100;

        function typeLoop() {
            const currentItem = items[itemIndex];
            
            if (isDeleting) {
                typedSpan.textContent = currentItem.substring(0, charIndex - 1);
                charIndex--;
                delay = 50;
            } else {
                typedSpan.textContent = currentItem.substring(0, charIndex + 1);
                charIndex++;
                delay = 100;
            }

            if (!isDeleting && charIndex === currentItem.length) {
                isDeleting = true;
                delay = 2000; // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                itemIndex = (itemIndex + 1) % items.length;
                delay = 500; // Wait before typing new string
            }

            setTimeout(typeLoop, delay);
        }

        // Start animation
        if(items.length > 0) {
            setTimeout(typeLoop, 500);
        }
    }
});