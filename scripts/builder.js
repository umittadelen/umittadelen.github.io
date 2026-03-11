const sections = [
    {
        header: "PROJECTS:",
        elements: [
            { text: "3D Maze Generator", link: "https://www.umittadelen.net/3DMazeGen/" },
            { text: "Tetris", link: "https://www.umittadelen.net/TETRIS/" },
            { text: "Github Chat", link: "https://www.umittadelen.net/githubChat/" },
            { text: "Image Upscaler", link: "http://www.umittadelen.net/imageUpscaler/" },
            { text: "Marlin Timelapser", link: "https://github.com/umittadelen/marlinTimelapser" },
            { text: "Mrcpack<br>Viewer", link: "https://www.umittadelen.net/mrpackViewer/" },
            { text: "3D Tic-Tac-Toe", link: "https://www.umittadelen.net/3DTTT/" },
            { text: "Cursed Clocks (Arduino)", link: "https://github.com/umittadelen/cursed_clocks" },
            { text: "Arduino Video Renderer", link: "https://www.umittadelen.net/arduinoVideoRenderer/" },
            { text: "Custom<br>Timer", link: "https://www.umittadelen.net/CustomTimer/" },
            { text: "better<br>prompting", link: "https://www.umittadelen.net/better_prompting/" },
            { text: "Text to image<br>prompt builder", link: "https://www.umittadelen.net/PromptBuilder/" },
            { text: "chroma console<br>python package", link: "https://pypi.org/project/chromaconsole/" },
            { text: "counter", link: "https://www.umittadelen.net/counter/" },
            { text: "celebrate", link: "https://www.umittadelen.net/celebrate/" },
            { text: "words", link: "https://www.umittadelen.net/words/" },
            { text: "optifine tools", link: "https://www.umittadelen.net/optifinetools/" },
            { text: "<b>EasyUI</b><br>Image Generator", link: "https://github.com/umittadelen/stableDiffusionEasyUI" },
            { text: "periodic table", link: "https://www.umittadelen.net/periodic-table/" },
            { text: "Genetic Code<br>Calculator", link: "https://www.umittadelen.net/DenGenetiskeKoden/" },
            { text: "clock", link: "https://www.umittadelen.net/clock/" }
        ]
    },
    {
        header: "SOCIALS:",
        elements: [
            { text: "github",    icon: "github",    link: "https://github.com/umittadelen" },
            { text: "instagram", icon: "instagram", link: "https://www.instagram.com/umittadelen/" },
            { text: "X",         icon: "twitter",   link: "https://twitter.com/umittadelenmc" },
            { text: "twitch",    icon: "twitch",    link: "https://www.twitch.tv/umittadelen" },
            { text: "linkedin",  icon: "linkedin",  link: "https://www.linkedin.com/in/umit-tasdelen/" },
            { text: "bluesky",   icon: "cloud",     link: "https://umittadelen.bsky.social" },
            { text: "youtube",   icon: "youtube",   link: "https://www.youtube.com/@umittadelen" },
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
    const body = document.getElementById("body");

    sections.forEach((section, sectionIndex) => {
        // Thin separator line between sections
        if (sectionIndex > 0) {
            const sep = document.createElement("div");
            sep.classList.add("section-sep");
            body.appendChild(sep);
        }

        const sectionEl = document.createElement("section");
        sectionEl.classList.add("page-section");
        sectionEl.id = section.header.replace(":", "").trim().toLowerCase();

        // Section heading
        const heading = document.createElement("div");
        heading.classList.add("section-heading");

        const h2 = document.createElement("h2");
        h2.textContent = section.header.replace(":", "").trim().toLowerCase();
        heading.appendChild(h2);


        sectionEl.appendChild(heading);

        // ── CONTACT ──────────────────────────────────────────
        if (sectionIndex === 2) {
            const wrap = document.createElement("div");
            wrap.classList.add("contact-cta-wrap");

            const sub = document.createElement("p");
            sub.classList.add("contact-subtext");
            sub.textContent = "Have a question, project idea, or just want to say hi?";
            wrap.appendChild(sub);

            // Create hitbox wrapper
            const hitbox = document.createElement("div");
            hitbox.classList.add("contact-button-hitbox");

            const btn = document.createElement("div");
            btn.classList.add("contact-btn");
            btn.innerHTML = '<i data-lucide="mail"></i><span>send me a mail</span>';
            btn.addEventListener("click", () => { window.location.href = section.elements[0].link; });
            if (typeof lucide !== "undefined") lucide.createIcons({ el: btn });
            hitbox.appendChild(btn);
            wrap.appendChild(hitbox);

            sectionEl.appendChild(wrap);

        // ── SOCIALS ──────────────────────────────────────────
        } else if (sectionIndex === 1) {
            const grid = document.createElement("div");
            grid.classList.add("socials-grid");

            section.elements.forEach((element) => {
                const wrap = document.createElement("div");
                wrap.classList.add("social-pill-wrap");
                if (element.disabled) wrap.classList.add("disabled");

                const pill = document.createElement("button");
                pill.classList.add("social-pill");
                const iconName = element.icon || "link";
                pill.innerHTML = `<i data-lucide="${iconName}"></i><span>${element.text}</span>`;
                if (typeof lucide !== "undefined") lucide.createIcons({ el: pill });

                if (!element.disabled) {
                    wrap.addEventListener("mouseenter", () => {
                        gsap.killTweensOf(pill);
                        gsap.to(pill, { duration: 0.4, ease: "power2.out", y: -3, scale: 1.04 });
                    });
                    wrap.addEventListener("mouseleave", () => {
                        gsap.killTweensOf(pill);
                        gsap.to(pill, { duration: 0.4, ease: "power2.out", y: 0, scale: 1 });
                    });
                    pill.addEventListener("click", () => { window.location.href = element.link; });
                }

                wrap.appendChild(pill);
                grid.appendChild(wrap);
            });

            sectionEl.appendChild(grid);

        // ── PROJECTS ─────────────────────────────────────────
        } else {
            const grid = document.createElement("div");
            grid.classList.add("cards-grid");

            section.elements.forEach((element, index) => {
                const wrap = document.createElement("div");
                wrap.classList.add("proj-card-wrap");
                wrap.id = `cardholder-${sectionIndex}-${index}`;
                if (element.disabled) wrap.classList.add("disabled");

                const card = document.createElement("div");
                card.classList.add("proj-card");
                card.id = `card-${sectionIndex}-${index}`;

                const p = document.createElement("p");
                p.innerHTML = element.text;
                card.appendChild(p);

                const arrow = document.createElement("span");
                arrow.classList.add("card-arrow");
                arrow.innerHTML = '<i data-lucide="arrow-up-right"></i>';
                card.appendChild(arrow);
                if (typeof lucide !== "undefined") lucide.createIcons({ el: arrow });

                if (!element.disabled) {
                    wrap.addEventListener("mouseenter", () => {
                        gsap.killTweensOf(card);
                        gsap.to(card, { duration: 0.5, ease: "elastic.out(1.5, 0.5)", y: -5, scale: 1.02 });
                        card.classList.add("hovered");
                    });
                    wrap.addEventListener("mouseleave", () => {
                        gsap.killTweensOf(card);
                        gsap.to(card, { duration: 0.5, ease: "elastic.out(1.5, 0.5)", y: 0, scale: 1 });
                        card.classList.remove("hovered");
                    });
                    wrap.addEventListener("click", () => { window.location.href = element.link; });
                }

                wrap.appendChild(card);
                grid.appendChild(wrap);
            });

            sectionEl.appendChild(grid);
        }

        body.appendChild(sectionEl);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createElements();
});
