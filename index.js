document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".nav-bar");

  // Toggle menu ao clicar no botão
  menuButton.addEventListener("click", function () {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    navbar.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-container a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navbar.classList.remove("active");
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", function (event) {
    const isClickInside =
      navbar.contains(event.target) || menuButton.contains(event.target);

    if (!isClickInside && navbar.classList.contains("active")) {
      menuButton.setAttribute("aria-expanded", "false");
      navbar.classList.remove("active");
    }
  });
});