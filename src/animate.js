const chevronDown =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>';
const chevronLeft =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>';

export function accordionify(accordion, panel) {
  accordion.addEventListener("click", () => {
    accordion.classList.toggle("active");
    if (panel.style.maxHeight) {
      accordion.querySelector("h3 span").innerHTML = chevronLeft;
      panel.style.maxHeight = null;
    } else {
      accordion.querySelector("h3 span").innerHTML = chevronDown;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
