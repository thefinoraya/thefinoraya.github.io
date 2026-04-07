/**
 * Market Pulse Animation - Brutalist Edition
 * High-frequency data stream and topological interference
 */

const canvas = document.getElementById('market-pulse');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
const spacing = 50;

const COLORS = {
    primary: '#F59E0B',
    cta: '#8B5CF6',
    text: '#F8FAFC'
};

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initPoints();
}

function initPoints() {
    points = [];
    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            points.push({
                x, y,
                originX: x,
                originY: y,
                size: Math.random() * 2,
                vibration: Math.random() * 10
            });
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const time = Date.now() * 0.002;
    
    // Draw grid points
    points.forEach(p => {
        const noise = Math.sin(time + (p.x + p.y) * 0.01) * 5;
        const distToMouse = 0; // Can implement mouse repulsion later
        
        ctx.beginPath();
        ctx.arc(p.x + noise, p.y + noise, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${0.1 + Math.sin(time + p.vibration) * 0.05})`;
        ctx.fill();
    });

    // Draw "Market Heartbeat" - High frequency jagged line
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(139, 92, 246, 0.2)`;
    
    const pulseY = height * 0.5;
    for (let x = 0; x < width; x += 5) {
        const y = pulseY + 
                 Math.sin(x * 0.01 + time * 5) * 50 * Math.random() + 
                 Math.cos(x * 0.05 - time) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Occasional "Glitch" line
    if (Math.random() > 0.98) {
        ctx.beginPath();
        ctx.lineWidth = Math.random() * 3;
        ctx.strokeStyle = COLORS.primary;
        const glitchY = Math.random() * height;
        ctx.moveTo(0, glitchY);
        ctx.lineTo(width, glitchY);
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

// Parallax effect for the market animation
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX - width / 2) / 30;
    const y = (e.clientY - height / 2) / 30;
    
    const animationHero = document.querySelector('.market-hero-animation');
    if (animationHero) {
        // Keeps the existing vertical centering while adding parallax offset
        animationHero.style.transform = `translate(calc(${x}px), calc(-50% + ${y}px))`;
    }
});

window.addEventListener('resize', resize);
resize();
draw();
