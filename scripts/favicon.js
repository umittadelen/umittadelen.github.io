// Animated SVG favicon using eyes-open.svg, eyes-closed.svg, and sleeping-eyes.svg
(async function () {
    // Helper to fetch SVG as text
    async function fetchSVG(path) {
        const res = await fetch(path);
        return await res.text();
    }

    const openSVG = await fetchSVG('icon/eyes-open.svg');
    const closedSVG = await fetchSVG('icon/eyes-closed.svg');
    const sleepingSVG = await fetchSVG('icon/sleeping-eyes.svg');

    function updateFavicon(svgContent) {
        const url = 'data:image/svg+xml,' + encodeURIComponent(svgContent);
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        link.href = url;
        document.head.appendChild(link);
    }

    let isFocused = true;

    window.addEventListener('focus', () => {
        isFocused = true;
        updateFavicon(openSVG);
    });
    window.addEventListener('blur', () => {
        isFocused = false;
        updateFavicon(sleepingSVG);
    });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            isFocused = true;
            updateFavicon(openSVG);
        } else {
            isFocused = false;
            updateFavicon(sleepingSVG);
        }
    });

    function blinkOnce(next) {
        if (!isFocused) {
            updateFavicon(sleepingSVG);
            if (next) setTimeout(next, 120);
            return;
        }
        updateFavicon(closedSVG);
        setTimeout(() => {
            updateFavicon(openSVG);
            if (next) setTimeout(next, 120);
        }, 180);
    }

    function blinkLoop() {
        if (!isFocused) {
            updateFavicon(sleepingSVG);
            setTimeout(blinkLoop, 1000);
            return;
        }
        updateFavicon(openSVG);
        setTimeout(() => {
            // Use a single random value for all animation choices
            const r = Math.random() * 100;
            if (r < 20) {
                // 20% chance for a double blink (from 0 to 20)
                blinkOnce(() => blinkOnce(() => setTimeout(blinkLoop, 1500 + Math.random() * 2000)));
            } else {
                // 80% chance for a single blink (from 20 to 100)
                blinkOnce(() => setTimeout(blinkLoop, 1500 + Math.random() * 2000));
            }
        }, 100 + Math.random() * 1200);
    }

    updateFavicon(openSVG);
    setTimeout(blinkLoop, 1200);
})();
