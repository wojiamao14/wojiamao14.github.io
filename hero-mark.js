const mark = document.querySelector(".hero-mark");
const markSection = mark.closest(".hero");
const motion = matchMedia("(prefers-reduced-motion: no-preference)");
const pointer = matchMedia("(hover: hover) and (pointer: fine)");
const tracks = [
  [".orbit-ball-one", "M0 0 A208 88 0 1 1 -416 0 A208 88 0 1 1 0 0", "26s"],
  [".orbit-ball-two", "M0 0 A208 88 0 1 0 416 0 A208 88 0 1 0 0 0", "33s"],
  [".orbit-ball-three", "M0 0 A214 75 0 1 1 0 -150 A214 75 0 1 1 0 0", "39s"],
];

function resetParallax() {
  mark.style.removeProperty("--mark-x");
  mark.style.removeProperty("--mark-y");
}

function syncMotion() {
  for (const [selector, path, duration] of tracks) {
    const ball = mark.querySelector(selector);
    ball.querySelector("animateMotion")?.remove();
    if (!motion.matches) continue;
    const animation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
    animation.setAttribute("path", path);
    animation.setAttribute("dur", duration);
    animation.setAttribute("repeatCount", "indefinite");
    animation.setAttribute("calcMode", "paced");
    animation.setAttribute("begin", "indefinite");
    ball.append(animation);
    animation.beginElement();
  }
  resetParallax();
}

markSection.addEventListener("pointermove", (event) => {
  if (!motion.matches || !pointer.matches || event.pointerType !== "mouse") return;
  const bounds = markSection.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  mark.style.setProperty("--mark-x", `${x * 12}px`);
  mark.style.setProperty("--mark-y", `${y * 10}px`);
}, { passive: true });
markSection.addEventListener("pointerleave", resetParallax);
motion.addEventListener("change", syncMotion);
pointer.addEventListener("change", resetParallax);
syncMotion();
