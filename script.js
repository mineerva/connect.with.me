// Three.js Background
const canvas = document.getElementById('three-js-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimized for performance

// Initialize lights
const ambientLight = new THREE.AmbientLight(0xD9D9D9, 0.6);
const pointLight = new THREE.PointLight(0xFFFFFF, 1.3, 100);
pointLight.position.set(0, 0, 30);
scene.add(ambientLight);
scene.add(pointLight);

camera.position.z = 60;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loading Tips
const loadingTips = [
    { tip: "Initializing Data...", subtext: "Preparing personal experiences." },
    { tip: "Loading Stories Catalog...", subtext: "Fetching available informations." },
    { tip: "Syncing Systems Security...", subtext: "Processing projects and ideas." },
];

function updateLoadingTip() {
    const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)];
    document.getElementById('loading-tip').textContent = randomTip.tip;
    document.getElementById('loading-subtext').textContent = randomTip.subtext;
}

// Slider Logic for Informations
const items = document.querySelectorAll('.slider .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let active = 1; // Start with the second item (index 1) as the active one

function loadShow() {
    let stt = 0;
    // Pre-set opacity for next/previous cards to enable cross-fade
    if (active + 1 < items.length) items[active + 1].style.opacity = 0.95;
    if (active - 1 >= 0) items[active - 1].style.opacity = 0.95;
    
    items[active].style.transform = `translateX(0) scale(1)`; // Center card
    items[active].style.zIndex = 10; // Higher z-index for active card
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${100 * stt}px) scale(${1 - 0.1 * stt})`; // Tighter spacing
        items[i].style.zIndex = 5 - stt; // Gradual z-index decrease
        items[i].style.filter = stt === 1 ? 'none' : stt > 3 ? 'blur(5px)' : 'blur(2px)'; // No blur for stt=1
        items[i].style.opacity = stt === 1 ? 0.95 : stt === 2 ? 0.85 : stt === 3 ? 0.75 : 0; // Finer opacity gradient
    }
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-100 * stt}px) scale(${1 - 0.1 * stt})`; // Tighter spacing
        items[i].style.zIndex = 5 - stt; // Gradual z-index decrease
        items[i].style.filter = stt === 1 ? 'none' : stt > 3 ? 'blur(5px)' : 'blur(2px)'; // No blur for stt=1
        items[i].style.opacity = stt === 1 ? 0.95 : stt === 2 ? 0.85 : stt === 3 ? 0.75 : 0; // Finer opacity gradient
    }
}
loadShow();

next.onclick = function() {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
};

prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
};

// Login Handling
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const mainContent = document.getElementById('main-content');
const loader = document.getElementById('loader');

// Audio Control
const backgroundAudio = document.getElementById('background-audio');
const loaderAudio = document.getElementById('loader-audio');

function playBackgroundAudio() {
    backgroundAudio.play().catch(error => {
        console.log("Audio playback failed:", error);
        document.addEventListener('click', () => {
            backgroundAudio.play();
        }, { once: true });
    });
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password === 'owl') {
        loginOverlay.classList.remove('show');
        scene.remove(ambientLight);
        scene.remove(pointLight);
        setTimeout(() => {
            mainContent.classList.add('show');
            const navbar = document.querySelector('.navbar');
            const heroSection = document.querySelector('.hero-section');
            navbar.classList.add('show');
            heroSection.classList.add('show');
            loadShow(); // Initialize slider
            playBackgroundAudio();
        }, 700);
    } else {
        loginError.classList.add('show');
        passwordInput.value = '';
        setTimeout(() => {
            loginError.classList.remove('show');
        }, 3000);
    }
});

// Loader and Animation with Percentage
window.addEventListener('load', () => {
    const progressBar = document.getElementById('progress-bar');
    const percentageText = document.getElementById('loading-percentage');
    
    loaderAudio.play().catch(error => {
        console.log("Loader audio playback failed:", error);
    });
    
    updateLoadingTip();
    setInterval(updateLoadingTip, 2000);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        percentageText.textContent = `Loading ${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            percentageText.textContent = "Loading 100%";
            loaderAudio.pause();
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => {
                    loginOverlay.classList.add('show');
                }, 700);
            }, 500);
        }
    }, 30);
});

// Smooth scroll to sections with snapping
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'auto' }); // Use 'auto' to respect snapping
    });
});

items[i].style.transform = `translateX(${80 * stt}px) scale(${1 - 0.1 * stt})`; // Tighter spacing
