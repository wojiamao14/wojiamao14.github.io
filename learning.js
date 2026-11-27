const gardenViews = document.querySelector(".garden-views");
const notesView = document.querySelector("#entry-1");
const reviewView = document.querySelector("#entry-2");
const search = document.querySelector("#garden-search");
const filters = [...document.querySelectorAll("[data-filter]")];
const reset = document.querySelector("#garden-reset");
const count = document.querySelector("#garden-count");
const empty = document.querySelector("#garden-empty");
const notes = [...document.querySelectorAll("[data-note]")].map((element) => ({
  element,
  domain: element.dataset.note,
  text: element.textContent.toLowerCase().replace(/\s+/g, " "),
}));

let domain = "all";

function updateNotes() {
  const query = search.value.trim().toLowerCase().replace(/\s+/g, " ");
  let visible = 0;
  for (const note of notes) {
    const matches = (domain === "all" || domain === note.domain) && note.text.includes(query);
    note.element.hidden = !matches;
    if (matches) visible++;
  }
  for (const filter of filters) {
    filter.setAttribute("aria-pressed", String(filter.dataset.filter === domain));
  }
  count.textContent = `${visible} 篇笔记`;
  empty.hidden = visible !== 0;
  reset.disabled = domain === "all" && !search.value;
}

function updateView() {
  const showReview = location.hash === "#entry-2";
  notesView.hidden = showReview;
  reviewView.hidden = !showReview;
  for (const link of gardenViews.querySelectorAll("a")) {
    if (link.hash === (showReview ? "#entry-2" : "#entry-1")) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
  return showReview ? reviewView : notesView;
}

function followViewLink(event) {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.currentTarget;
  event.preventDefault();
  if (link.dataset.domain) {
    domain = link.dataset.domain;
    search.value = "";
    updateNotes();
  }
  if (location.hash !== link.hash) history.pushState(null, "", link.hash);
  const panel = updateView();
  panel.focus({ preventScroll: true });
  panel.scrollIntoView();
}

for (const link of document.querySelectorAll(".garden-views a, [data-domain]")) {
  link.addEventListener("click", followViewLink);
}
for (const filter of filters) {
  filter.addEventListener("click", () => {
    domain = filter.dataset.filter;
    updateNotes();
  });
}
search.addEventListener("input", updateNotes);
reset.addEventListener("click", () => {
  domain = "all";
  search.value = "";
  search.focus();
  updateNotes();
});
window.addEventListener("hashchange", () => {
  const panel = updateView();
  if (location.hash === `#${panel.id}`) panel.scrollIntoView();
});
updateView();
updateNotes();
