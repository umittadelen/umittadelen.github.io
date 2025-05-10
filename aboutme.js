let currentTextIndex = 0;
let activeSplit = null; // Holds the current SplitText instance
const texts = [
    `he/him<br>${Date().match(/\d{4}/) - 2008} years old<br>gamer / programmer / 3D designer<br>Oslo/Norway`,
    `undeployed<br>content creator<br>arnigts / HSR / BA / PJSK<br>PY / HTML / CSS / JS / C++ / C#`
];

// Function to switch text and handle animations
function switchText() {
    const aboutText = document.getElementById("aboutText");

    // If there is active animation, stop it and animate the current text falling down
    if (activeSplit) {
        gsap.to(activeSplit.words, {
            y: 50,                   // Fall distance for the current text
            opacity: 0,              // Fade out
            rotation: 10,            // Slight rotation effect
            ease: "power2.in",       // Ease effect for smoothness
            stagger: 0.03,           // Staggered timing for each word
            duration: 0.5,           // Duration of the animation
            onComplete: () => {
                // After current text animation finishes, reset and switch text
                activeSplit.revert();
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                aboutText.innerHTML = texts[currentTextIndex];

                // Animate the new text coming in from above
                activeSplit = new SplitText(aboutText, { type: "words" });
                gsap.fromTo(
                    activeSplit.words,
                    {
                        y: -50,        // Start from above the container
                        opacity: 0,    // Start invisible
                        rotation: -10, // Start with a slight rotation
                    },
                    {
                        y: 0,           // Fall into place
                        opacity: 1,     // Fade in
                        rotation: 0,    // Remove rotation
                        ease: "elastic.out(1, 0.5)",  // Elastic easing for a bouncy effect
                        duration: 1.0,   // Duration of the animation
                        stagger: 0.04    // Stagger the words' appearance
                    }
                );
            }
        });
    } else {
        // First-time loading: Animate new text coming from above
        aboutText.innerHTML = texts[currentTextIndex];
        activeSplit = new SplitText(aboutText, { type: "words" });
        gsap.from(activeSplit.words, {
            y: -80,                 // Start high above the container
            opacity: 0,             // Start invisible
            rotation: -10,          // Start with a slight rotation
            ease: "elastic.out(1, 0.5)",  // Elastic easing for a bouncy effect
            duration: 1.0,          // Duration of the animation
            stagger: 0.04           // Stagger the words' appearance
        });
    }
}

// Init on page load: Show first text
document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById("about-section");
    const aboutTextContainer = document.createElement("div");
    aboutTextContainer.classList.add("aboutTextContainer");
    aboutTextContainer.innerHTML = `
        <h1 class="center">
            <span onclick="switchText()">ABOUT ME:<span id="small-text">click to change</span></span>
        </h1>
        <p class="aboutText" id="aboutText"></p>
    `;
    aboutSection.appendChild(aboutTextContainer);

    const aboutText = document.getElementById("aboutText");
    aboutText.innerHTML = texts[currentTextIndex];
    activeSplit = new SplitText(aboutText, { type: "words" });
    gsap.from(activeSplit.words, {
        y: -80,                 // Start high above the container
        opacity: 0,             // Start invisible
        rotation: -10,          // Start with a slight rotation
        ease: "elastic.out(1, 0.5)",  // Elastic easing for a bouncy effect
        duration: 1.0,          // Duration of the animation
        stagger: 0.04           // Stagger the words' appearance
    });
});