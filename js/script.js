console.log("Script MIC Refrigeración cargado.");

// --- Funcionalidad Menú Hamburguesa ---
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

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


// --- Funcionalidad Modo Claro/Oscuro ---
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const logoElement = document.querySelector('.logo-img');

const sunIcon = '☀️'; 
const moonIcon = '🌙'; 

function applyTheme(theme) {
    if (theme === 'dark') {
        bodyElement.classList.add('dark-mode');
        themeToggleButton.innerHTML = moonIcon; 
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
        if (logoElement) {
            logoElement.src = 'img/logo-oscuro.jpg'; 
            logoElement.setAttribute('alt', 'Logo MIC Refrigeración - Oscuro');
        }
        localStorage.setItem('theme', 'dark');
    } else {
        bodyElement.classList.remove('dark-mode');
        themeToggleButton.innerHTML = sunIcon; 
        themeToggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
        if (logoElement) {
            logoElement.src = 'img/logo-claro.jpg'; 
            logoElement.setAttribute('alt', 'Logo MIC Refrigeración - Claro');
        }
        localStorage.setItem('theme', 'light');
    }
}

// 1. Determina el tema inicial al cargar la página
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let initialTheme = 'light';
if (savedTheme) {
    initialTheme = savedTheme; 
} else if (prefersDark) {
    initialTheme = 'dark';
}

if (bodyElement && themeToggleButton) {
    applyTheme(initialTheme);
}


// 2. Event listener para el botón de cambio de tema
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const newTheme = bodyElement.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}


// --- Funcionalidad Carruseles ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Selecciona todos los botones de navegación de carrusel
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');

    // Función para manejar el movimiento del carrusel (CORREGIDA)
    function moveSlide(carouselId, direction) {
        const slide = document.querySelector(`.carousel-slide[data-carousel-id="${carouselId}"]`);
        if (!slide) return;

        let currentItemIndex = parseInt(slide.getAttribute('data-current-index') || 0);
        const totalItems = slide.children.length; // 4 items

        let newIndex = currentItemIndex + direction;

        // 1. MANEJO DE LÍMITES (LOOP)
        if (newIndex < 0) {
            newIndex = totalItems - 1; // Mueve al último item
        } else if (newIndex >= totalItems) {
            newIndex = 0; // Mueve al primer item
        }

        // 2. CÁLCULO DEL DESPLAZAMIENTO DEFINITIVO
        // (4 items) / (totalItems) * 100 = 25% por item
        const percentageToMove = (newIndex / totalItems) * 100;

        // 3. APLICACIÓN DEL DESPLAZAMIENTO
        slide.style.transform = `translateX(-${percentageToMove}%)`;

        // 4. ACTUALIZA EL ÍNDICE
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