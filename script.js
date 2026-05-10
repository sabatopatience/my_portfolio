// Portfolio Interactive Features

// Typing effect for hero text
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Smooth scrolling for navigation links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Particle background effect
function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            ctx.fill();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Gallery lightbox functionality
function createLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <img src="" alt="">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const overlay = lightbox.querySelector('.lightbox-overlay');
    const content = lightbox.querySelector('.lightbox-content');
    const img = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            img.src = item.src;
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }, 10);
        });
    });

    function closeLightbox() {
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        .lightbox-content img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 10px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.innerHTML = '';
        new TypeWriter(heroTitle, 'Niyonziza Sabato Patience');
    }

    // Initialize smooth scrolling
    smoothScroll();

    // Initialize scroll animations
    createScrollObserver();

    // Initialize particle background
    createParticles();

    // Initialize gallery lightbox
    createLightbox();

    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});