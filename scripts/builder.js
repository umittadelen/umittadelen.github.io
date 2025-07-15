const sections = [
    {
        header: "PROJECTS:",
        elements: [
            { text: "Mrcpack<br>Viewer", link: "https://umittadelen.github.io/mrpackViewer/" },
            { text: "3D Tic-Tac-Toe", link: "https://umittadelen.github.io/3DTTT/" },
            { text: "Cursed Clocks (Arduino)", link: "https://github.com/umittadelen/cursed_clocks" },
            { text: "Arduino Video Renderer", link: "https://github.com/umittadelen/arduinoVideoRenderer" },
            { text: "Custom<br>Timer", link: "https://umittadelen.github.io/CustomTimer/" },
            { text: "better<br>prompting", link: "https://umittadelen.github.io/better_prompting/" },
            { text: "Text to image<br>prompt builder", link: "https://umittadelen.github.io/PromptBuilder/" },
            { text: "chroma console<br>python package", link: "https://pypi.org/project/chromaconsole/" },
            { text: "minecraft cit generator", link: "https://umittadelen.github.io/optifinetools/" },
            { text: "counter", link: "https://umittadelen.github.io/counter/" },
            { text: "celebrate", link: "https://umittadelen.github.io/celebrate/" },
            { text: "words", link: "https://umittadelen.github.io/words/" },
            { text: "optifine tools", link: "https://umittadelen.github.io/optifinetools/" },
            { text: "<b>EasyUI</b><br>Image Generator", link: "https://github.com/umittadelen/stableDiffusionEasyUI" },
            { text: "periodic table", link: "https://umittadelen.github.io/periodic-table/" },
            { text: "Genetic Code<br>Calculator", link: "https://umittadelen.github.io/DenGenetiskeKoden/" },
            { text: "clock", link: "https://umittadelen.github.io/clock/" }
        ]
    },
    {
        header: "SOCIALS:",
        elements: [
            { text: "github", link: "https://github.com/umittadelen" },
            { text: "instagram", link: "https://www.instagram.com/umittadelen/" },
            { text: "X", link: "https://twitter.com/umittadelenmc" },
            { text: "twitch", link: "https://www.twitch.tv/umittadelen" },
            { text: "linkedin", link: "https://www.linkedin.com/in/ümit-taşdelen-446881266/" },
            { text: "bluesky", link: "https://umittadelen.bsky.social" },
            { text: "discord", link: "", disabled: true },
            { text: "youtube", link: "https://www.youtube.com/@umittadelen" },
        ]
    },
    {
        header: "CONTACT:",
        elements: [
            { text: "<b>CLICK TO SEND MAIL</b>", link: "mailto:umittadelen1772@gmail.com" }
        ]
    }
];

function setupPreviewModal() {
    const previewContainer = document.querySelector('.preview-container');
    const iframeWrapper = previewContainer.querySelector('.iframe-wrapper');
    const iframe = previewContainer.querySelector('iframe');
    const closeBtn = previewContainer.querySelector('#close-button');

    // Hide on load
    previewContainer.style.display = 'none';
    previewContainer.style.opacity = 0;
    iframeWrapper.style.transform = 'scale(0.7)';

    // Close modal helper
    function closePreviewModal() {
        gsap.to(iframeWrapper, {
            duration: 0.5,
            scale: 0.7,
            ease: 'elastic.in(1, 0.5)'
        });
        gsap.to(previewContainer, {
            duration: 0.3,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                previewContainer.style.display = 'none';
                iframe.src = '';
            }
        });
    }

    closeBtn.addEventListener('click', closePreviewModal);

    // Close when clicking outside the iframe-wrapper
    previewContainer.addEventListener('mousedown', (e) => {
        if (e.target === previewContainer) {
            closePreviewModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (previewContainer.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
            closePreviewModal();
        }
    });

    // Expose a function to show the modal
    window.showPreview = function (link) {
        // Only preview .github.io links in the modal
        if (/^https?:\/\/[^\/]+\.github\.io(\/|$)/i.test(link)) {
            iframe.src = link;
            previewContainer.style.display = 'flex';
            previewContainer.style.backdropFilter = 'blur(5px)'; // Add blur
            previewContainer.style.background = 'rgba(30, 30, 30, 0.35)'; // Subtle dark overlay
            gsap.fromTo(previewContainer, {
                opacity: 0,
                filter: 'blur(5px)',
                top: '-60px'
            }, {
                duration: 0.5,
                opacity: 1,
                filter: 'blur(0px)',
                top: '0px',
                ease: 'power3.out'
            });
            gsap.fromTo(iframeWrapper, {
                scale: 0.6,
                rotateY: 15,
            }, {
                duration: 0.8,
                scale: 1,
                rotateY: 0,
                ease: 'elastic.out(1, 0.5)'
            });
        }
    };
}

function createElements() {
    setupPreviewModal(); // Use the static modal
    console.log("Creating elements...");
    const body = document.getElementById("body");

    sections.forEach((section, sectionIndex) => {
        // Add section header with an <hr> and <h1>
        const hr = document.createElement("hr");
        hr.classList.add("line");

        const header = document.createElement("h1");
        header.classList.add("center");
        header.id = `header-${sectionIndex}`;
        header.innerHTML = section.header;

        if (sectionIndex === 0) {
            header.innerHTML = `<span>` + section.header + `<br><span id="small-text">right-click to preview (if supported)</span></span>`;
        }

        body.appendChild(hr);
        body.appendChild(header);

        const myBody = document.createElement("div");
        myBody.classList.add("my-body");

        section.elements.forEach((element, index) => {
            // Create a card div
            const card = document.createElement("div");
            card.classList.add("card");
            const cardHolder = document.createElement("div");
            cardHolder.classList.add("card-holder");
            card.setAttribute("id", `card-${sectionIndex}-${index}`);
            cardHolder.setAttribute("id", `cardholder-${sectionIndex}-${index}`);

            // handle disabled state
            if (element.disabled) {
                cardHolder.classList.add("disabled");
            } else {
                cardHolder.addEventListener("mouseenter", () => {
                    gsap.killTweensOf(card); // cancel any existing animation on this card
                    gsap.to(card, {
                        duration: 0.6,
                        ease: "elastic.out(2, 0.5)",
                        x: -5,
                        y: -5,
                        boxShadow: "10px 10px 16px rgba(0, 0, 0, 0.3)"
                    });
                });

                cardHolder.addEventListener("mouseleave", () => {
                    gsap.killTweensOf(card); // cancel ongoing tween
                    gsap.to(card, {
                        duration: 0.6,
                        ease: "elastic.out(2, 0.5)",
                        x: 0,
                        y: 0,
                        boxShadow: "5px 5px 16px rgba(0, 0, 0, 0.3)"
                    });
                });

                cardHolder.addEventListener("click", () => {
                    window.location.href = element.link;
                });

                cardHolder.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    window.showPreview(element.link);
                });
            }

            // Create the inner centered text
            const centerDiv = document.createElement("div");
            centerDiv.classList.add("center");
            const paragraph = document.createElement("p");
            paragraph.innerHTML = element.text;
            centerDiv.appendChild(paragraph);

            // Append to the card
            card.appendChild(centerDiv);

            cardHolder.appendChild(card);

            myBody.appendChild(cardHolder);
        });

        body.appendChild(myBody);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createElements();
});
