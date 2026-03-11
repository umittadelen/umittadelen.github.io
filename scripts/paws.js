// paws.js
// Adds subtle, randomly sized, non-overlapping paw SVGs to the background

const PAW_SRC = './icon/paw.svg';
const PAW_COUNT = 20;
const PAW_MIN_SIZE = 32; // px
const PAW_MAX_SIZE = 96; // px
const PAW_OPACITY = 0.05;

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

function createPawElement(svg, size, left, top) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = `${left}px`;
    wrapper.style.top = `${top}px`;
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size}px`;
    wrapper.style.opacity = PAW_OPACITY;
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
    const width = window.innerWidth;
    const height = window.innerHeight;
    const placed = [];
    let tries = 0;
    for (let i = 0; i < PAW_COUNT && tries < PAW_COUNT * 10; ) {
        const size = randomInt(PAW_MIN_SIZE, PAW_MAX_SIZE);
        const left = randomInt(0, width - size);
        const top = randomInt(0, height - size);
        const rect = {
            left,
            top,
            right: left + size,
            bottom: top + size
        };
        if (!isOverlapping(rect, placed)) {
            const paw = createPawElement(svg, size, left, top);
            body.appendChild(paw);
            placed.push(rect);
            i++;
        }
        tries++;
    }
}

window.addEventListener('DOMContentLoaded', addPawsToBackground);