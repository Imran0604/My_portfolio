// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.8)";
        navbar.style.borderBottom = "1px solid var(--neon-cyan)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.borderBottom = "1px solid rgba(20, 200, 194, 0.15)";
    }
});

// --- TYPING EFFECT ---
const textElement = document.getElementById('typing-text');
const phrases = [
    "Vibe Codder",
    "Web Developer",
    "Robotics & IoT Engineer",
    "I build smart systems",
    "Hardware x Software"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; 
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// --- COPY EMAIL ---
const copyBtn = document.getElementById('copyBtn');
if(copyBtn){
    copyBtn.addEventListener('click', () => {
        const email = document.getElementById('email-text').innerText;
        navigator.clipboard.writeText(email);
        alert("Email copied to clipboard: " + email);
    });
}


// --- SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width;
        }
    });
});

const progressBars = document.querySelectorAll('.progress-fill');
progressBars.forEach(bar => {
    observer.observe(bar);
});


// 1. HERO & ABOUT: "Starfield / Network with Moving Stars"
const minimalConfig = {
    background: { color: { value: "transparent" } },
    particles: {
        // --- Main Group (Your existing smaller dots) ---
        number: {
            value: 30, 
            density: { enable: true, area: 800 }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3 },
        size: { value: { min: 1, max: 2 } },
        links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out"
        }
    },
    // --- New Group (Moving Stars) ---
    emitters: {
        direction: "none",
        rate: {
            quantity: 1,
            delay: 2.0
        },
        size: {
            width: 100,
            height: 100
        },
        position: {
            x: 50,
            y: 50
        },
        particles: {
            shape: { type: "star" }, // Star shape
            size: { value: { min: 2, max: 6 } }, // Slightly larger than dots
            color: { value: ["#ffffff", "#00f3ff"] }, // White and cyan stars
            opacity: { 
                value: { min: 0.1, max: 0.3 }, // Twinkle effect
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: 1.5, // Move faster than the dots
                direction: "none",
                random: true,
                straight: false,
                outModes: "out"
            },
            links: { enable: false } // Stars are not connected by lines
        }
    },
    interactivity: {
        events: { onHover: { enable: true, mode: "grab" } },
        modes: { grab: { distance: 150, links: { opacity: 0.6 } } }
    }
};

// 2. SKILLS & TOOLBOX: "Hardware Schematic"
// Hexagons, but much smaller and slower than before.
const hardwareConfig = {
    background: { color: { value: "transparent" } },
    particles: {
        number: { 
            value: 20, // Very sparse
            density: { enable: true, area: 800 } 
        },
        color: { value: "#00f3ff" }, // Just Cyan (Single color is more professional)
        shape: { 
            type: "polygon", 
            polygon: { nb_sides: 6 } // Hexagon
        },
        opacity: { value: 0.2 }, // Faint
        size: { value: { min: 3, max: 5 } }, // Not huge
        links: {
            enable: true,
            distance: 150,
            color: "#00f3ff",
            opacity: 0.1,
            width: 1
        },
        move: { 
            enable: true, 
            speed: 0.8, 
            direction: "none", 
            random: true, 
            outModes: "bounce" 
        }
    },
    interactivity: {
        events: { onHover: { enable: true, mode: "repulse" } }, // Pushes away from mouse (cleaner)
        modes: { repulse: { distance: 100, duration: 0.4 } }
    }
};

// INITIALIZE
window.addEventListener('load', async () => {
    try {
        // Apply Minimal config to About
        await tsParticles.load("about-particles", minimalConfig);
        
        // Apply Hardware config to Skills & Toolbox
        await tsParticles.load("iot-particles-1", hardwareConfig);
        await tsParticles.load("iot-particles-2", hardwareConfig);
        
        console.log("Minimal particles loaded");
    } catch (error) {
        console.error("Error loading particles:", error);
    }
});

// --- DIRECTIONAL SCROLL OBSERVER ---

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'active' class which triggers the CSS transition
            entry.target.classList.add('active');
            
            // Stop watching this element (so it doesn't animate out again)
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15 // Trigger when 15% visible
});

// Target all elements with the 'reveal' class
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => revealObserver.observe(el));

// --- MOBILE MENU TOGGLE ---
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

if(menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        // Toggle the 'active' class to slide the menu in/out
        navMenu.classList.toggle('active');
        
        // Optional: Change icon from Bars to X when open
        const icon = menuBtn.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}