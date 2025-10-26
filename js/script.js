console.log("Script MIC Refrigeración cargado.");

// --- Selectores Globales ---
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const logoElement = document.querySelector('.logo-img'); // Asegúrate de que esta etiqueta esté en tu HTML


// --- Iconos ---
const sunIcon = '☀️'; 
const moonIcon = '🌙'; 

// --- Funcionalidad Modo Claro/Oscuro (CON EXTENSIÓN .PNG) ---

/**
 * Aplica el tema, cambia el logo y guarda la preferencia.
 * @param {string} theme - 'light' o 'dark'.
 */
function applyTheme(theme) {
    if (!bodyElement || !themeToggleButton || !logoElement) {
        // Fallar silenciosamente si el elemento no se encuentra (no rompe la página)
        return;
    }

    if (theme === 'dark') {
        bodyElement.classList.add('dark-mode');
        themeToggleButton.innerHTML = moonIcon; 
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
        
        // CORRECCIÓN: Usar la extensión .png (o el nombre exacto que tenga el archivo)
        logoElement.src = 'img/logo-oscuro.jpg'; 
        logoElement.setAttribute('alt', 'Logo MIC Refrigeración - Oscuro');
        
        localStorage.setItem('theme', 'dark');
    } else {
        bodyElement.classList.remove('dark-mode');
        themeToggleButton.innerHTML = sunIcon; 
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
        
        // CORRECCIÓN: Usar la extensión .png (o el nombre exacto que tenga el archivo)
        logoElement.src = 'img/logo-claro.jpg'; 
        logoElement.setAttribute('alt', 'Logo MIC Refrigeración - Claro');
        
        localStorage.setItem('theme', 'light');
    }
}

// 1. Inicialización y Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Inicialización del Tema ---
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = 'light';
    
    if (savedTheme) {
        initialTheme = savedTheme; 
    } else if (prefersDark) {
        initialTheme = 'dark';
    }
    
    if (themeToggleButton) {
        applyTheme(initialTheme);
        
        // 2. Event listener para el botón de cambio de tema
        themeToggleButton.addEventListener('click', () => {
            const newTheme = bodyElement.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- Funcionalidad Menú Hamburguesa ---

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("nav-menu_visible");

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
                if (window.innerWidth <= 768 && navMenu.classList.contains('nav-menu_visible')) {
                    navMenu.classList.remove('nav-menu_visible');
                    navToggle.setAttribute("aria-label", "Abrir menú");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }
    
    // --- Funcionalidad Carruseles (Base) ---
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');

    function moveSlide(carouselId, direction) {
        const slide = document.querySelector(`.carousel-slide[data-carousel-id="${carouselId}"]`);
        if (!slide) return;

        let currentItemIndex = parseInt(slide.getAttribute('data-current-index') || 0);
        const totalItems = slide.children.length; 

        let newIndex = currentItemIndex + direction;

        if (newIndex < 0) {
            newIndex = totalItems - 1; 
        } else if (newIndex >= totalItems) {
            newIndex = 0; 
        }

        const percentageToMove = (newIndex / totalItems) * 100;

        slide.style.transform = `translateX(-${percentageToMove}%)`;

        slide.setAttribute('data-current-index', newIndex);
    }

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel-target');
            moveSlide(carouselId, -1);
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel-target');
            moveSlide(carouselId, 1);
        });
    });
});