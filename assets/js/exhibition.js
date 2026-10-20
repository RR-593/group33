// Exhibition menu toggle — placeholder behaviour only.
// Shows/hides the placeholder panel; replace panel contents once the real
// menu is designed.
(function () {
  var toggle = document.getElementById("exhibition-menu-toggle");
  var menu = document.getElementById("exhibition-menu");

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });
})();
