const hoverAvailable = window.matchMedia("(any-hover: hover)");

for (const menu of document.querySelectorAll(".nav-menu")) {
  let openedByHover = false;

  menu.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && hoverAvailable.matches && !menu.open) {
      menu.open = true;
      openedByHover = true;
    }
  });

  menu.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse" || !openedByHover) return;
    openedByHover = false;
    if (!menu.contains(document.activeElement)) menu.open = false;
  });

  menu.addEventListener("focusout", (event) => {
    if (!menu.contains(event.relatedTarget) && !menu.matches(":hover")) {
      menu.open = false;
      openedByHover = false;
    }
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      openedByHover = false;
      menu.querySelector("summary").focus();
    }
  });
}
