const sections = [
    {
        header: "PROJECTS:",
        elements: [
            { text: "Mrcpack<br>Viewer", link: "https://umittadelen.github.io/mrpackViewer/"},
            { text: "Custom<br>Timer", link: "https://umittadelen.github.io/CustomTimer/"},
            { text: "better<br>prompting", link: "https://umittadelen.github.io/better_prompting/"},
            { text: "Text to image<br>prompt builder", link: "https://umittadelen.github.io/PromptBuilder/" },
            { text: "chroma console<br>python package", link: "https://pypi.org/project/chromaconsole/" },
            { text: "minecraft cit generator", link: "https://umittadelen.github.io/optifinetools/" },
            { text: "counter", link: "https://umittadelen.github.io/counter/" },
            { text: "celebrate", link: "https://umittadelen.github.io/celebrate/" },
            { text: "words", link: "https://umittadelen.github.io/words/" },
            { text: "optifine tools", link: "https://umittadelen.github.io/optifinetools/" },
            { text: "<b>EasyUI</b><br>Image Generator", link: "https://github.com/umittadelen/stableDiffusionEasyUI" },
            { text: "periodic table", link: "https://umittadelen.github.io/periodic-table/"},
            { text: "Genetic Code<br>Calculator", link: "https://umittadelen.github.io/DenGenetiskeKoden/"},
            { text: "clock", link: "https://umittadelen.github.io/clock/"}
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
            { text: "bluesky", link: "https://umittadelen.bsky.social"},
            { text: "discord", link: "./discord"}
        ]
    },
    {
        header: "CONTACT:",
        elements: [
            { text: "<b>CLICK TO SEND MAIL</b>", link: "mailto:umittadelen1772@gmail.com" }
        ]
    }
];

function createElements() {
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
                gsap.to(card, {
                    duration: 0.4,
                    ease: "elastic.out(2, 0.5)",
                    x: -2.5,
                    y: -2.5,
                    boxShadow: "7.5px 7.5px 16px rgba(0, 0, 0, 0.3)",
                    onComplete: () => {
                        window.location.href = element.link;
                    }
                });
            });
            
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
