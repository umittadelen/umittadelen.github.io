// disable-zoom.js
// Prevent zoom, double-tap, right-click, and pinch gestures

// Disable zoom via keyboard (Ctrl +, Ctrl -, Ctrl 0)
window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '0'].includes(e.key)) {
        e.preventDefault();
    }
});

// Prevent zoom with Ctrl + mouse wheel
window.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// Prevent pinch zoom (trackpad, touchscreen)
window.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});
window.addEventListener('gesturechange', function(e) {
    e.preventDefault();
});
window.addEventListener('gestureend', function(e) {
    e.preventDefault();
});

// Prevent touch zoom (multi-finger, allow single finger dragging)
document.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Prevent double-tap/double-click zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
