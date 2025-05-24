const thumb = document.getElementById("scroll-thumb");
const scrollbar = document.querySelector(".scrollbar");

function updateThumb() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;

  const scrollPercent = scrollTop / (docHeight - winHeight);
  const thumbHeight = Math.max((winHeight / docHeight) * winHeight, 30);
  const thumbTop = scrollPercent * (winHeight - thumbHeight);

  thumb.style.height = `${thumbHeight}px`;
  thumb.style.top = `${thumbTop}px`;
}

window.addEventListener("scroll", updateThumb);
window.addEventListener("resize", updateThumb);
updateThumb();

let isDragging = false;
let startY, startScrollY;

thumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
  startScrollY = window.scrollY;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollable = docHeight - winHeight;
  const ratio = scrollable / (winHeight - thumb.offsetHeight);
  window.scrollTo(0, startScrollY + deltaY * ratio);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});
