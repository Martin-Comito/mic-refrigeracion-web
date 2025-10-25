console.log("Script MIC Refrigeración cargado.");

// --- Funcionalidad Menú Hamburguesa ---
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        // Toggle (añade/quita) la clase para mostrar/ocultar el menú
        navMenu.classList.toggle("nav-menu_visible");

        // Lógica de accesibilidad (aria-expanded)
        if (navMenu.classList.contains("nav-menu_visible")) {
            navToggle.setAttribute("aria-label", "Cerrar menú");
            navToggle.setAttribute("aria-expanded", "true");
        } else {
            navToggle.setAttribute("aria-label", "Abrir menú");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Cierra el menú al hacer clic en un enlace (en móvil)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Solo ejecuta si la pantalla es <= 768px (móvil) y el menú está visible
            if (window.innerWidth <= 768 && navMenu.classList.contains('nav-menu_visible')) {
                navMenu.classList.remove('nav-menu_visible');
                navToggle.setAttribute("aria-label", "Abrir menú");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });
}


// --- Funcionalidad Modo Claro/Oscuro ---
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const logoElement = document.querySelector('.logo-img');

const sunIcon = '🌙'; // Icono para modo claro
const moonIcon  = '☀️'; // Icono para modo oscuro

/**
 * Aplica el tema, cambia el logo y guarda la preferencia.
 * @param {string} theme - 'light' o 'dark'.
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        bodyElement.classList.add('dark-mode');
        themeToggleButton.innerHTML = sunIcon;
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
        // CAMBIO DE LOGO A OSCURO
        if (logoElement) logoElement.src = 'img/logo-oscuro.jpg'; 
        localStorage.setItem('theme', 'dark');
    } else {
        bodyElement.classList.remove('dark-mode');
        themeToggleButton.innerHTML = moonIcon;
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
        // CAMBIO DE LOGO A CLARO
        if (logoElement) logoElement.src = 'img/logo-claro.jpg'; 
        localStorage.setItem('theme', 'light');
    }
}

// 1. Determina el tema inicial al cargar la página
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let initialTheme = 'light';
if (savedTheme) {
    initialTheme = savedTheme; // Usa la preferencia guardada del usuario
} else if (prefersDark) {
    initialTheme = 'dark'; // Si no hay guardada, usa la del sistema
}
applyTheme(initialTheme);


// 2. Event listener para el botón de cambio de tema
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        // Alterna entre el tema actual y el opuesto
        const newTheme = bodyElement.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}
// --- Funcionalidad Carruseles ---

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones de navegación de carrusel
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');

    // Función para manejar el movimiento del carrusel
    function moveSlide(carouselId, direction) {
        const slide = document.querySelector(`.carousel-slide[data-carousel-id="${carouselId}"]`);
        if (!slide) return;

        // Calcula el índice actual del slide
        let currentItemIndex = parseInt(slide.getAttribute('data-current-index') || 0);
        const totalItems = slide.children.length;

        // Calcula el nuevo índice
        let newIndex = currentItemIndex + direction;

        // Manejo de límites (loop infinito)
        if (newIndex < 0) {
            newIndex = totalItems - 1;
        } else if (newIndex >= totalItems) {
            newIndex = 0;
        }

        // Calcula la posición de desplazamiento
        const itemWidth = slide.clientWidth / totalItems; // El ancho de un solo item
        const scrollAmount = newIndex * itemWidth;

        // Aplica el desplazamiento usando CSS Transform
        slide.style.transform = `translateX(-${newIndex * 100}%)`;

        // Actualiza el índice en el atributo de datos
        slide.setAttribute('data-current-index', newIndex);
    }

    // Event Listeners para los botones
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel-target');
            moveSlide(carouselId, -1); // Mover hacia atrás
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel-target');
            moveSlide(carouselId, 1); // Mover hacia adelante
        });
    });
});