
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const toggleLabel = document.getElementById('toggleLabel');
let isLight = false;

themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    document.body.classList.toggle('light', isLight);
    toggleIcon.textContent = isLight ? '☀️' : '🌙';
    toggleLabel.textContent = isLight ? 'Light' : 'Dark';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Restore saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    isLight = true;
    document.body.classList.add('light');
    toggleIcon.textContent = '☀️';
    toggleLabel.textContent = 'Light';
}

// Custom cursor
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.transform = `translate(${tx - 18}px, ${ty - 18}px)`;
    requestAnimationFrame(animTrail);
}
animTrail();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        trail.style.width = '60px';
        trail.style.height = '60px';
        trail.style.borderColor = 'rgba(168,85,247,0.6)';
    });
    el.addEventListener('mouseleave', () => {
        trail.style.width = '36px';
        trail.style.height = '36px';
        trail.style.borderColor = 'rgba(168,85,247,0.4)';
    });
});

// Counter animation
function animateCounter(el, target, duration = 1800) {
    let start = null;
    function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + '+';
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.id === 'dsaCount') {
                setTimeout(() => animateCounter(document.getElementById('dsaCount'), 900), 300);
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.exp-item, .project-card, .ach-card, .reveal').forEach(el => observer.observe(el));
document.getElementById('dsaCount') && observer.observe(document.getElementById('dsaCount'));

// Stagger delays
document.querySelectorAll('.exp-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
});
document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.ach-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
});
