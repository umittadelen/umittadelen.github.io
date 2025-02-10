const sections = [
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
        header: "PROJECTS:",
        elements: [
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
        header: "CONTACT:",
        elements: [
            { text: "<b>CLICK TO SEND MAIL</b>", link: "mailto:umittadelen1772@gmail.com" }
        ]
    }
];

function createElements() {
    const body = document.body;

    sections.forEach((section, sectionIndex) => {
        // Add section header with an <hr> and <h1>
        const hr = document.createElement("hr");
        hr.classList.add("line");

        const header = document.createElement("h1");
        header.id = "center";
        header.innerHTML = section.header;

        body.appendChild(hr);
        body.appendChild(header);

        // Create a <myBody> to contain elements
        const myBody = document.createElement("myBody");

        section.elements.forEach((element, index) => {
            // Create a card div
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("onclick", `window.location.href='${element.link}'`);
            
            // Create the inner centered text
            const centerDiv = document.createElement("div");
            centerDiv.id = "center";
            const paragraph = document.createElement("p");
            paragraph.innerHTML = element.text;
            centerDiv.appendChild(paragraph);

            // Append to the card
            card.appendChild(centerDiv);

            // Append the card to <myBody>
            myBody.appendChild(card);

            // Add a delay before adding the 'show' class
            setTimeout(() => {
                card.classList.add("show");
            }, index * 300); // Adjust the delay (300ms here) as needed
        });

        // Append <myBody> to the body
        body.appendChild(myBody);
    });
}


document.addEventListener('DOMContentLoaded', createElements);
