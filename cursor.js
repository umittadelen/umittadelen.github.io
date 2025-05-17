gsap.defaults({ ease: "none" });

const svgns = "http://www.w3.org/2000/svg";
const root = document.getElementById("pointer");
const ease = 0.75;

const cursorCircle = document.createElementNS(svgns, "circle");
cursorCircle.setAttribute("r", 10);
cursorCircle.setAttribute("fill", "none");
cursorCircle.setAttribute("stroke", "#000");
cursorCircle.setAttribute("stroke-width", 2);
cursorCircle.setAttribute("opacity", 0.8);
root.appendChild(cursorCircle);

let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let lastPointer = { x: pointer.x, y: pointer.y };
let velocity = 0;
let isActive = false;

function showCursor() {
    if (!isActive) {
        root.style.display = "block";
        isActive = true;
    }
}

function hideCursor() {
    if (isActive) {
        root.style.display = "none";
        isActive = false;
    }
}

// Desktop mouse move
window.addEventListener("mousemove", (e) => {
    showCursor();

    pointer.x = e.clientX;
    pointer.y = e.clientY;

    const dx = pointer.x - lastPointer.x;
    const dy = pointer.y - lastPointer.y;
    velocity = Math.sqrt(dx * dx + dy * dy);

    lastPointer.x = pointer.x;
    lastPointer.y = pointer.y;

    cursorCircle.setAttribute("cx", pointer.x);
    cursorCircle.setAttribute("cy", pointer.y);
});

// Mouse leave screen
window.addEventListener("mouseout", hideCursor);

// Touch support
window.addEventListener("touchstart", (e) => {
    showCursor();
    const touch = e.touches[0];
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;

    cursorCircle.setAttribute("cx", pointer.x);
    cursorCircle.setAttribute("cy", pointer.y);
});

window.addEventListener("touchmove", (e) => {
    showCursor();
    const touch = e.touches[0];
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;

    cursorCircle.setAttribute("cx", pointer.x);
    cursorCircle.setAttribute("cy", pointer.y);
});

window.addEventListener("touchend", hideCursor);
window.addEventListener("touchcancel", hideCursor);

// Start hidden
hideCursor();

let leader = pointer;
const total = 100;

for (let i = 0; i < total; i++) {
    leader = createLine(leader, i);
}

function createLine(leader, i) {
    const line = document.createElementNS(svgns, "line");
    root.appendChild(line);

    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", 0);
    line.setAttribute("y2", 0);

    line.style.stroke = "#000";
    line.style.strokeLinecap = "round";

    const minWidth = 0.5;
    const maxWidth = 2;
    const thickness = minWidth + (1 - i / total) * (maxWidth - minWidth);
    line.style.strokeWidth = thickness;

    gsap.set(line, { x: -15, y: -15 });

    gsap.to(line, {
        duration: 1000,
        repeat: -1,
        x: "+=1",
        y: "+=1",
        modifiers: {
            x() {
                let posX = gsap.getProperty(line, "x");
                let leaderX = gsap.getProperty(leader, "x");
                let x = posX + (leaderX - posX) * ease;
                line.setAttribute("x2", leaderX - x);
                return x;
            },
            y() {
                let posY = gsap.getProperty(line, "y");
                let leaderY = gsap.getProperty(leader, "y");
                let y = posY + (leaderY - posY) * ease;
                line.setAttribute("y2", leaderY - y);
                return y;
            },
        },
        onComplete: () => {
            line.remove();
        }
    });

    return line;
}
