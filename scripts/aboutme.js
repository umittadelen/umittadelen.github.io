const panels = [
  {
    label: "i code in",
    badges: [
      { text: "Python",     link: "https://www.python.org/" },
      { text: "HTML",       link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { text: "CSS",        link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { text: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { text: "Java",       link: "https://dev.java/" },
      { text: "C++",        link: "https://isocpp.org/" },
      { text: "C#",         link: "https://learn.microsoft.com/en-us/dotnet/csharp/" }
    ]
  },
  {
    label: "i'm playing",
    badges: [
      { text: "Arknights", link: "https://www.arknights.global/" },
      { text: "Endfield",  link: "https://endfield.gryphline.com/" },
      { text: "PJSK",      link: "https://www.colorfulstage.com/" },
      { text: "WUWA",      link: "https://wutheringwaves.kurogames.com/" }
    ]
  },
  {
    label: "i also do",
    badges: [
      { text: "3D & Robotics",    link: "https://www.instagram.com/umittadelen/" },
      { text: "Content Creation", link: "" },
      { text: "Game Dev",         link: "" }
    ]
  }
];

function badgeHTML(b) {
  if (!b.link) return `<span class="badge">${b.text}</span>`;
  return `<a class="badge" href="${b.link}" target="_blank" rel="noopener">${b.text}</a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const age = new Date().getFullYear() - 2008;

  const aboutSection = document.getElementById("about-section");
  aboutSection.innerHTML = `
    <div class="hero-content">
      <p class="hero-eyebrow">hey, i'm</p>
      <h1 class="hero-name">umit<span class="accent">tadelen</span></h1>

      <div class="hero-bio-strip">
        <span class="bio-chip"><i data-feather="user"></i><span>he/him</span></span>
        <span class="bio-chip-dot"></span>
        <span class="bio-chip"><i data-feather="gift"></i><span>${age} y/o</span></span>
        <span class="bio-chip-dot"></span>
        <span class="bio-chip"><i data-feather="map-pin"></i><span>Oslo, Norway</span></span>
      </div>

      <div class="hero-panels">
        ${panels.map(p => `
        <div class="hero-panel">
          <p class="panel-label">${p.label}</p>
          <div class="panel-badges">
            ${p.badges.map(badgeHTML).join("\n            ")}
          </div>
        </div>`).join("")}
      </div>
    </div>
  `;

  if (typeof feather !== "undefined") feather.replace();

  if (typeof gsap !== "undefined") {
    gsap.from(".hero-bio-strip", { y: 16, opacity: 0, duration: 0.5, delay: 0.15, ease: "power2.out" });
    gsap.from(".hero-panel", { y: 24, opacity: 0, duration: 0.55, ease: "power2.out", stagger: 0.1, delay: 0.3 });
  }
});
