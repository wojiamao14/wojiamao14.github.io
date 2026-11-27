const exploreDetail = document.querySelector(".explore-detail");
for (const card of document.querySelectorAll(".explore-card")) {
  function showDetail() {
    exploreDetail.querySelector("strong").textContent = card.dataset.title;
    exploreDetail.querySelector("p").textContent = card.dataset.description;
    exploreDetail.querySelector("small").textContent = card.dataset.topics;
  }
  card.addEventListener("pointerenter", showDetail);
  card.addEventListener("focus", showDetail);
}


const progress = document.querySelector(".scroll-progress");
function updateProgress() {
  const page = document.documentElement;
  const distance = page.scrollHeight - page.clientHeight;
  const fraction = distance > 0 ? Math.min(1, Math.max(0, page.scrollTop / distance)) : 0;
  progress.style.transform = `scaleX(${fraction})`;
}

progress.hidden = false;
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

const hero = document.querySelector(".hero");
const about = document.querySelector("#about");
const explore = document.querySelector("#explore");
const content = document.querySelector(".home-content");
const header = document.querySelector(".header");
const transitionLinks = document.querySelectorAll('.hero-next, .header a[href="#about"], a[href="#top"]');
let touchStart;
let touchDestination;
let wheelTimer;
let transitionUntil = 0;

function updateHeaderTheme() {
  const boundary = content.getBoundingClientRect().top;
  const height = header.offsetHeight || 1;
  const light = Math.max(0, Math.min(1, 1 - boundary / height));
  header.style.setProperty("--glass-light", `${light * 100}%`);
  header.classList.toggle("is-light", light >= 0.52);
}

updateHeaderTheme();
window.addEventListener("scroll", updateHeaderTheme, { passive: true });
window.addEventListener("resize", updateHeaderTheme);
window.addEventListener("pageshow", updateHeaderTheme);

function aboutPosition() {
  return window.scrollY + content.getBoundingClientRect().top;
}

function explorePosition() {
  return window.scrollY + explore.getBoundingClientRect().top - header.offsetHeight;
}

function transitions() {
  const introduction = aboutPosition();
  return [
    [0, introduction, Math.max(0, hero.offsetHeight - window.innerHeight)],
    [introduction, explorePosition(), introduction + Math.max(0, about.offsetHeight - window.innerHeight)],
  ];
}

function destinationFor(direction) {
  const position = window.scrollY;
  for (const [, end, readableThrough] of transitions()) {
    if (direction > 0 && position >= readableThrough - 1 && position < end - 1) return end;
    if (direction < 0 && position > readableThrough + 1 && position <= end + 1) return readableThrough;
  }
  return undefined;
}

function glideTo(position) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  transitionUntil = performance.now() + (reducedMotion ? 0 : 650);
  window.scrollTo({ top: position, behavior: reducedMotion ? "instant" : "smooth" });
}

// Native scrollbar dragging bypasses the wheel and touch handlers.
let previousScrollPosition = window.scrollY;
let lastScrollDirection = 0;

window.addEventListener("scroll", () => {
  const position = window.scrollY;
  if (position !== previousScrollPosition) {
    lastScrollDirection = Math.sign(position - previousScrollPosition);
    previousScrollPosition = position;
  }
}, { passive: true });

function settleBetweenSections() {
  const position = window.scrollY;
  if (!lastScrollDirection) return;
  for (const [, end, readableThrough] of transitions()) {
    if (position > readableThrough + 1 && position < end - 1) {
      glideTo(lastScrollDirection > 0 ? end : readableThrough);
      return;
    }
  }
}

if ("onscrollend" in document) {
  document.addEventListener("scrollend", settleBetweenSections);
} else {
  let settleTimer;
  window.addEventListener("scroll", () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settleBetweenSections, 180);
  }, { passive: true });
}

for (const link of transitionLinks) {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);
    if (link.hash === "#explore") {
      glideTo(explorePosition());
      explore.focus({ preventScroll: true });
    } else {
      const toAbout = link.hash === "#about";
      glideTo(toAbout ? aboutPosition() : 0);
      (toAbout ? about : document.querySelector(".brand")).focus({ preventScroll: true });
    }
  });
}

window.addEventListener("wheel", (event) => {
  if (event.ctrlKey || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
  const destination = destinationFor(event.deltaY);
  const transitioning = performance.now() < transitionUntil;
  if (!wheelTimer && !transitioning && destination === undefined) {
    // Catch a wheel step that crosses a screen boundary from free-scrolling content.
    const previous = transitions().reverse().find(([, end]) =>
      window.scrollY > end && window.scrollY + event.deltaY <= end);
    if (!previous || event.deltaMode !== 0 || event.deltaY >= 0) return;
    event.preventDefault();
    glideTo(previous[2]);
    wheelTimer = setTimeout(() => { wheelTimer = undefined; }, 140);
    return;
  }
  event.preventDefault();
  if (!wheelTimer && !transitioning && destination !== undefined) glideTo(destination);
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => { wheelTimer = undefined; }, 140);
}, { passive: false });

document.addEventListener("touchstart", (event) => {
  touchDestination = undefined;
  touchStart = event.touches.length === 1 ? event.touches[0].clientY : undefined;
}, { passive: true });

document.addEventListener("touchmove", (event) => {
  if (event.touches.length !== 1) touchStart = undefined;
  if (touchStart === undefined || !event.cancelable) return;
  const distance = touchStart - event.touches[0].clientY;
  const destination = destinationFor(distance);
  if (touchDestination === undefined && destination === undefined) return;
  event.preventDefault();
  if (touchDestination === undefined && Math.abs(distance) >= 30) {
    touchDestination = destination;
    glideTo(destination);
  }
}, { passive: false });

for (const type of ["touchend", "touchcancel"]) {
  document.addEventListener(type, () => { touchStart = undefined; });
}

const interestControls = [...about.querySelectorAll("[data-interest]")];
const interestLines = [...about.querySelectorAll("[data-interest-line]")];
const interestDetail = about.querySelector("#interest-detail");
const interestDescriptions = [
  "探索大模型、机器学习与智能系统。",
  "学习编程，理解软件与计算系统。",
  "尝试用技术解决现实中的工程问题。",
  "记录日常、灵感和值得记住的时刻。",
  "理解技术背后的数学原理。",
];

for (const control of interestControls) {
  control.addEventListener("click", () => {
    const interest = control.dataset.interest;
    if (control.getAttribute("aria-pressed") === "true") return;
    for (const option of interestControls) {
      option.setAttribute("aria-pressed", String(option.dataset.interest === interest));
    }
    for (const line of interestLines) {
      line.classList.toggle("is-active", line.dataset.interestLine === interest);
    }
    interestDetail.querySelector("strong").textContent = control.textContent.trim();
    interestDetail.querySelector("p").textContent = interestDescriptions[Number(interest)];
  });
  if (control instanceof SVGElement) {
    control.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (!event.repeat) control.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  }
}
