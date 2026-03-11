document.addEventListener("DOMContentLoaded", () => {
  const age = new Date().getFullYear() - 2008;

  const aboutSection = document.getElementById("about-section");
  aboutSection.innerHTML = `
    <div class="hero-content">
      <p class="hero-eyebrow">hey, i'm</p>
      <h1 class="hero-name">umit<span class="accent">tadelen</span></h1>

      <div class="hero-bio-strip">
        <span class="bio-chip"><i data-lucide="user-round"></i><span>he/him</span></span>
        <span class="bio-chip-dot"></span>
        <span class="bio-chip"><i data-lucide="cake-slice"></i><span>${age} y/o</span></span>
        <span class="bio-chip-dot"></span>
        <span class="bio-chip"><i data-lucide="map-pin"></i><span>Oslo, Norway</span></span>
      </div>

      <div class="hero-panels">
        <div class="hero-panel">
          <p class="panel-label">tech stack</p>
          <div class="panel-badges">
            <span class="badge">Python</span>
            <span class="badge">HTML</span>
            <span class="badge">CSS</span>
            <span class="badge">JavaScript</span>
            <span class="badge">Java</span>
            <span class="badge">C++</span>
            <span class="badge">C#</span>
          </div>
        </div>
        <div class="hero-panel">
          <p class="panel-label">currently playing</p>
          <div class="panel-badges">
            <span class="badge">Arknights</span>
            <span class="badge">Endfield</span>
            <span class="badge">Endfield</span>
            <span class="badge">PJSK</span>
            <span class="badge">WUWA</span>
          </div>
        </div>
        <div class="hero-panel">
          <p class="panel-label">also does</p>
          <div class="panel-badges">
            <span class="badge">3D Design</span>
            <span class="badge">Content Creation</span>
            <span class="badge">Game Dev</span>
          </div>
        </div>
      </div>
    </div>
  `;

  if (typeof lucide !== "undefined") lucide.createIcons();

  // Animate panels in
  if (typeof gsap !== "undefined") {
    gsap.from(".hero-bio-strip", { y: 16, opacity: 0, duration: 0.5, delay: 0.15, ease: "power2.out" });
    gsap.from(".hero-panel", { y: 24, opacity: 0, duration: 0.55, ease: "power2.out", stagger: 0.1, delay: 0.3 });
  }
});
