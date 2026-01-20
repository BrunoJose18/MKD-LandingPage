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


// ===== CARROSSEL =====
const slideTrack = document.querySelector(".carousel-slide");
const slides = document.querySelectorAll(".carousel-conteudo");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;

function updateCarousel() {
  // Pegamos a largura exata do container visível no momento
  const viewportWidth = document.querySelector(".carousel-viewport").offsetWidth;
  
  // O deslocamento é simplesmente o índice vezes a largura total (100%)
  // Se houver GAP no CSS, precisamos somar o gap ao viewportWidth
  const style = window.getComputedStyle(slideTrack);
  const gap = parseInt(style.gap) || 0;
  
  const moveDistance = index * (viewportWidth + gap);

  slideTrack.style.transform = `translateX(-${moveDistance}px)`;
}

next.addEventListener("click", () => {
  if (index < slides.length - 1) {
    index++;
  } else {
    index = 0; // Volta ao primeiro
  }
  updateCarousel();
});

prev.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = slides.length - 1; // Vai ao último
  }
  updateCarousel();
});

// Essencial para manter o alinhamento ao girar o celular ou redimensionar a tela
window.addEventListener("resize", updateCarousel);

// Inicializa
updateCarousel();


document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos
    const container = document.querySelector('.cards-planos-container');
    const cards = document.querySelectorAll('.cards-planos');
    const indicadores = document.querySelectorAll('.indicador');

    // Configuração do Observador
    const observerOptions = {
        root: container,   // Quem é a janela de rolagem?
        threshold: 0.5     // Ativa quando 50% do card estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Descobre qual é o índice do card que apareceu (0 ou 1)
                const index = Array.from(cards).indexOf(entry.target);
                
                // Remove a classe 'ativo' de todos os indicadores
                indicadores.forEach(ind => ind.classList.remove('ativo'));
                
                // Adiciona a classe 'ativo' apenas no indicador correspondente
                if(indicadores[index]) {
                    indicadores[index].classList.add('ativo');
                }
            }
        });
    }, observerOptions);

    // Manda o observador vigiar cada card
    cards.forEach(card => {
        observer.observe(card);
    });
});