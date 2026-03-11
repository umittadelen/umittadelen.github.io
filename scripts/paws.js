// paws.js
// Adds subtle, randomly sized, non-overlapping paw SVGs to the background

const PAW_SRC = './icon/paw.svg';
const PAW_COUNT = 20;
const PAW_MIN_SIZE = 32; // px
const PAW_MAX_SIZE = 96; // px
const PAW_OPACITY_MIN = 0.03;
const PAW_OPACITY_MAX = 0.07;
const SCALE_UP_FACTOR = 1.1;

function loadSVG(url) {
    return fetch(url).then(r => r.text());
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOverlapping(rect, others) {
    return others.some(other => {
        return !(
            rect.right < other.left ||
            rect.left > other.right ||
            rect.bottom < other.top ||
            rect.top > other.bottom
        );
    });
}

function isTooClose(rect, others, minDist) {
    return others.some(other => {
        // Calculate minimum distance between any corner of rect and any corner of other
        const cornersA = [
            [rect.left, rect.top],
            [rect.right, rect.top],
            [rect.left, rect.bottom],
            [rect.right, rect.bottom]
        ];
        const cornersB = [
            [other.left, other.top],
            [other.right, other.top],
            [other.left, other.bottom],
            [other.right, other.bottom]
        ];
        let minCornerDist = Infinity;
        for (const a of cornersA) {
            for (const b of cornersB) {
                const dx = a[0] - b[0];
                const dy = a[1] - b[1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minCornerDist) minCornerDist = dist;
            }
        }
        return minCornerDist < minDist;
    });
}

function createPawElement(svg, size, left, top) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = `${left}px`;
    wrapper.style.top = `${top}px`;
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size}px`;
    // Randomize opacity for each paw
    const opacity = Math.random() * (PAW_OPACITY_MAX - PAW_OPACITY_MIN) + PAW_OPACITY_MIN;
    wrapper.style.opacity = opacity;
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '0';
    // Add random rotation
    const rotation = randomInt(0, 359);
    wrapper.style.transform = `rotate(${rotation}deg)`;
    wrapper.innerHTML = svg;
    // Make SVG fill the wrapper
    const svgElem = wrapper.querySelector('svg');
    if (svgElem) {
        svgElem.setAttribute('width', size);
        svgElem.setAttribute('height', size);
        svgElem.style.display = 'block';
    }
    return wrapper;
}

async function addPawsToBackground() {
    const svg = await loadSVG(PAW_SRC);
    const body = document.body;
    body.style.position = 'relative';
    body.style.overflowX = 'hidden';
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Remove old paws
    if (window.pawParallax && Array.isArray(window.pawParallax)) {
        window.pawParallax.forEach(paw => {
            if (paw.elem && paw.elem.parentNode) paw.elem.parentNode.removeChild(paw.elem);
        });
    }
    const placed = [];
    let tries = 0;
    window.pawParallax = [];
    for (let i = 0; i < PAW_COUNT && tries < PAW_COUNT * 20; ) {
        const size = randomInt(PAW_MIN_SIZE, PAW_MAX_SIZE);
        // Randomized min distance between paws
        const minDist = randomInt(40, 80);
        let left = Math.round((width - size) * (i / (PAW_COUNT - 1)) + randomInt(-20, 20));
        left = Math.max(0, Math.min(left, width - size));
        const top = randomInt(0, height - size);
        const rect = {
            left,
            top,
            right: left + size,
            bottom: top + size
        };
        if (!isOverlapping(rect, placed) && !isTooClose(rect, placed, minDist)) {
            const paw = createPawElement(svg, size, left, top);
            body.appendChild(paw);
            placed.push(rect);
            const depth = Math.random() * 0.6 + 0.2;
            window.pawParallax.push({
                elem: paw,
                left,
                top,
                depth
            });
            i++;
        }
        tries++;
    }

    // Mouse parallax effect
    const parallaxHandler = function(e) {
        const mx = (e.clientX || (e.touches && e.touches[0].clientX) || width/2);
        const my = (e.clientY || (e.touches && e.touches[0].clientY) || height/2);
        window.pawParallax.forEach(paw => {
            const offsetX = (mx / width - 0.5) * 40 * paw.depth;
            const offsetY = (my / height - 0.5) * 40 * paw.depth;
            paw.elem.style.left = `${paw.left + offsetX}px`;
            paw.elem.style.top = `${paw.top + offsetY}px`;
            // Scale up paw if mouse is near
            const pawCenterX = paw.left + paw.elem.offsetWidth / 2;
            const pawCenterY = paw.top + paw.elem.offsetHeight / 2;
            const dist = Math.sqrt((mx - pawCenterX) ** 2 + (my - pawCenterY) ** 2);
            const scale = dist < 120 ? SCALE_UP_FACTOR - (dist / 120) * (SCALE_UP_FACTOR - 1) : 1;
            paw.elem.style.transform = paw.elem.style.transform.replace(/scale\([^)]+\)/, '') + ` scale(${scale})`;
        });
    };
    document.addEventListener('mousemove', parallaxHandler);
    document.addEventListener('touchmove', parallaxHandler);

    // Resize handling
    let prevWidth = width;
    let prevHeight = height;
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        // Spread out paws horizontally for both widen and shrink, adjusting distance for new window size
        window.pawParallax.forEach((paw, i) => {
            paw.left = Math.round((newWidth - paw.elem.offsetWidth) * (i / (PAW_COUNT - 1)));
            paw.left = Math.max(0, Math.min(paw.left, newWidth - paw.elem.offsetWidth));
            paw.top = Math.min(paw.top, newHeight - paw.elem.offsetHeight);
            paw.elem.style.left = `${paw.left}px`;
            paw.elem.style.top = `${paw.top}px`;
        });
        prevWidth = newWidth;
        prevHeight = newHeight;
    });
}

window.addEventListener('DOMContentLoaded', addPawsToBackground);