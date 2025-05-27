// --- Custom Animated Cursor & Easter Egg Toggle ---
// Uses GSAP for animation. Switches between SVG and PNG cursor on secret code.

// --- Config ---
const svgns = "http://www.w3.org/2000/svg";
const root = document.getElementById("pointer");
const pngCursorUrl = "./icon/pointer.png"; // PNG cursor path

// --- Secret Codes ---
const konamiKeys = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"];
const wasdKeys = ["w","w","s","s","a","d","a","d"];
let keyBuffer = [];
let usingPngCursor = false;

// --- SVG Cursor Elements ---
const cursorCircle = document.createElementNS(svgns, "circle");
cursorCircle.setAttribute("r", 10);
cursorCircle.setAttribute("fill", "none");
cursorCircle.setAttribute("stroke", "#000");
cursorCircle.setAttribute("stroke-width", 2);
cursorCircle.setAttribute("opacity", 0.8);
root.appendChild(cursorCircle);

const centerCircle = document.createElementNS(svgns, "circle");
centerCircle.setAttribute("r", 1.5);
centerCircle.setAttribute("fill", "#000");
centerCircle.setAttribute("cx", 0);
centerCircle.setAttribute("cy", 0);
root.appendChild(centerCircle);

// --- Cursor Visibility State ---
let isActive = false;
let hideTimeout = null;

function showCursor() {
    if (!isActive) {
        root.style.display = "block";
        isActive = true;
    }
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
}

function hideCursor() {
    if (hideTimeout) return;
    root.style.display = "none";
    isActive = false;
    hideTimeout = null;
}

// --- Mouse Move Handler ---
window.addEventListener("mousemove", (e) => {
    if (usingPngCursor) return; // Skip SVG cursor logic if PNG cursor is active
    showCursor();
    cursorCircle.setAttribute("cx", e.clientX);
    cursorCircle.setAttribute("cy", e.clientY);
    centerCircle.setAttribute("cx", e.clientX);
    centerCircle.setAttribute("cy", e.clientY);
    // Elastic GSAP animation for the big circle
    gsap.to(cursorCircle, {
        duration: 0.6,
        attr: { cx: e.clientX, cy: e.clientY },
        ease: "elastic.out(1, 0.4)"
    });
});

window.addEventListener("mouseout", hideCursor);
window.addEventListener("pointerout", hideCursor);

// --- Easter Egg: Toggle PNG Cursor ---
function setPngCursor(enable) {
    if (enable) {
        root.style.display = "none";
        // Set PNG cursor, default hotspot is top-left (0,0). To center, add x y: url('...') x y, auto
        document.body.style.cursor = `url('${pngCursorUrl}'), auto`;
    } else {
        document.body.style.cursor = "none";
        root.style.display = "block";
    }
    usingPngCursor = enable;
}

window.addEventListener("keydown", (e) => {
    keyBuffer.push(e.key);
    if (keyBuffer.length > 8) keyBuffer.shift();
    // Check for Konami code
    if (keyBuffer.join(",") === konamiKeys.join(",")) {
        setPngCursor(!usingPngCursor);
        keyBuffer = [];
    }
    // Check for WASD code
    if (keyBuffer.join("").toLowerCase() === wasdKeys.join("").toLowerCase()) {
        setPngCursor(!usingPngCursor);
        keyBuffer = [];
    }
});

// --- Init: Start Hidden ---
hideCursor();