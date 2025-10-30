console.log("Script MIC Refrigeración cargado.");

// --- Selectores Globales ---
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const logoElement = document.querySelector('.logo-img'); 

// --- Iconos ---
const sunIcon = '☀️'; 
const moonIcon = '🌙'; 

// --- Funcionalidad Modo Claro/Oscuro (CORREGIDA CON TEXTO) ---

/**
 * Aplica el tema, cambia el logo, el texto del botón y guarda la preferencia.
 * @param {string} theme - 'light' o 'dark'.
 */
function applyTheme(theme) {
    if (!bodyElement || !themeToggleButton || !logoElement) {
        return;
    }

    if (theme === 'dark') {
        bodyElement.classList.add('dark-mode');
               themeToggleButton.innerHTML = moonIcon + ' Modo Claro'; 
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
        
        // MODO OSCURO: Usa el logo CLARO (blanco)
        logoElement.src = 'img/logoclaro.png'; 
        logoElement.setAttribute('alt', 'Logo MIC Refrigeración - Oscuro');
        
        localStorage.setItem('theme', 'dark');
        
    } else {
        bodyElement.classList.remove('dark-mode');
        themeToggleButton.innerHTML = sunIcon + ' Modo Oscuro'; 
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
        
        // MODO CLARO: Usa el logo OSCURO (negro/azul)
        logoElement.src = 'img/logoclaro.png'; 
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

    //
    // --- INICIO DE LA CORRECCIÓN ---
    //
    /**
     * Mueve el carrusel al índice correcto.
     * Esta función está diseñada para trabajar con un CSS
     * donde cada .carousel-item tiene 'width: 100%'.
     */
    function moveSlide(carouselId, direction) {
        // 1. Busca el slide correcto usando el ID
        const slide = document.querySelector(`.carousel-slide[data-carousel-id="${carouselId}"]`);
        if (!slide) return; // Si no lo encuentra, no hace nada

        // 2. Lee los datos actuales
        let currentItemIndex = parseInt(slide.getAttribute('data-current-index') || 0);
        const totalItems = slide.children.length; 

        // 3. Calcula el nuevo índice
        let newIndex = currentItemIndex + direction;

        // 4. Lógica para carrusel infinito (si llega al final, vuelve al inicio)
        if (newIndex < 0) {
            newIndex = totalItems - 1; // Si está en la primera y va para atrás, va a la última
        } else if (newIndex >= totalItems) {
            newIndex = 0; // Si está en la última y va para adelante, vuelve a la primera
        }

        // 5. ¡LA CORRECCIÓN CLAVE!
        // Mueve la "tira" de fotos en pasos exactos de 100%
        // Ej: Foto 1 (newIndex=1) -> translateX(-100%)
        // Ej: Foto 7 (newIndex=7) -> translateX(-700%)
        slide.style.transform = `translateX(-${newIndex * 100}%)`;

        // 6. Guarda el nuevo índice en el HTML para el próximo clic
        slide.setAttribute('data-current-index', newIndex);
    }
    //
    // --- FIN DE LA CORRECCIÓN ---
    //

    // Asigna el evento de clic a todos los botones "Anterior"
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel-target');
            moveSlide(carouselId, -1); // -1 para retroceder
        });
    });

    // Asigna el evento de clic a todos los botones "Siguiente"
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel-target');
            moveSlide(carouselId, 1); // 1 para avanzar
        });
    });
});