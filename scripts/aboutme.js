let currentTextIndex = 0;
let activeSplit = null;

const texts = [
  `he/him<br>${Date().match(/\d{4}/) - 2008} years old<br>gamer / programmer / 3D designer<br>Oslo/Norway`,
  `undeployed<br>content creator<br>arnigts / HSR / BA / PJSK<br>PY / HTML / CSS / JS / C++ / C#`
];

function switchText() {
  const aboutText = document.getElementById("aboutText");

  if (activeSplit) {
    gsap.to(activeSplit.words, {
      x: 50,
      opacity: 0,
      ease: "power2.in",
      stagger: 0.03,
      duration: 0.4,
      onComplete: () => {
        activeSplit.revert();
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        aboutText.innerHTML = texts[currentTextIndex];
        activeSplit = new SplitText(aboutText, { type: "words" });

        gsap.fromTo(
          activeSplit.words,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.6, stagger: 0.04 }
        );
      }
    });
  } else {
    aboutText.innerHTML = texts[currentTextIndex];
    activeSplit = new SplitText(aboutText, { type: "words" });

    gsap.from(activeSplit.words, {
      x: -50,
      opacity: 0,
      ease: "power2.out",
      duration: 0.6,
      stagger: 0.04
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.getElementById("about-section");
  aboutSection.innerHTML = `
    <div class="aboutTextContainer">
      <h1 class="center">
        <span onclick="switchText()">ABOUT ME: <span id="small-text">click to change</span></span>
      </h1>
      <p class="aboutText" id="aboutText"></p>
    </div>
  `;
  switchText();
});