gsap.defaults({ ease: "none" });

const svgns = "http://www.w3.org/2000/svg";
const root = document.getElementById("pointer");

const cursorCircle = document.createElementNS(svgns, "circle");
cursorCircle.setAttribute("r", 10);
cursorCircle.setAttribute("fill", "none");
cursorCircle.setAttribute("stroke", "#000");
cursorCircle.setAttribute("stroke-width", 2);
cursorCircle.setAttribute("opacity", 0.8);
root.appendChild(cursorCircle);

// Add a small 2x2px center circle
const centerCircle = document.createElementNS(svgns, "circle");
centerCircle.setAttribute("r", 1.5); // diameter 3px
centerCircle.setAttribute("fill", "#000");
centerCircle.setAttribute("cx", 0);
centerCircle.setAttribute("cy", 0);
root.appendChild(centerCircle);

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

window.addEventListener("mousemove", (e) => {
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

// Start hidden
hideCursor();