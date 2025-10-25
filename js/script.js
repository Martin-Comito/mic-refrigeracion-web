console.log("Script MIC Refrigeración cargado.");

// --- Posibles Funciones Futuras ---

// Ejemplo: Validación simple de formulario de contacto (si lo añades)
/*
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name')?.value; // Usa ? por si no existe
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;

        if (!name || !email || !message) {
            e.preventDefault(); // Detiene el envío
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }
        // Validación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
             e.preventDefault();
             alert('Por favor, ingrese un email válido.');
             return;
        }
        // Si todo está bien, el formulario se envía (a Formspree, por ejemplo)
        console.log('Formulario validado, enviando...');
    });
}
*/

// Ejemplo: Menú Hamburguesa para Móviles (requiere añadir el botón en HTML)
/*
const navToggle = document.querySelector('.nav-toggle-button'); // Añade un <button class="nav-toggle-button">☰</button> en el header
const navMenu = document.querySelector('header nav ul');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-menu-visible'); // Necesitarás añadir estilos CSS para .nav-menu-visible
        // Cambia el ícono del botón si quieres (☰ a X)
        if (navMenu.classList.contains('nav-menu-visible')) {
            navToggle.setAttribute('aria-expanded', 'true');
            // navToggle.textContent = '✕'; // O usa iconos
        } else {
            navToggle.setAttribute('aria-expanded', 'false');
            // navToggle.textContent = '☰'; // O usa iconos
        }
    });
}

// Estilos CSS básicos para menú hamburguesa (añadir en style.css)
/*
@media (max-width: 768px) {
    .nav-toggle-button {
        display: block; // Muestra el botón en móviles
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        // Posiciónalo como necesites
    }
    header nav ul {
        display: none; // Oculta el menú normal
        flex-direction: column;
        position: absolute; // O fixed
        top: 60px; // Ajusta según altura del header
        left: 0;
        width: 100%;
        background-color: var(--bg-content-light); // O el color que prefieras
        padding: 1rem 0;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    header nav ul.nav-menu-visible {
        display: flex; // Muestra el menú al hacer clic
    }
     header nav ul li {
        margin: 0.5rem 0;
        text-align: center;
    }

    // Adapta colores para modo oscuro si es necesario
    @media (prefers-color-scheme: dark) {
         header nav ul {
             background-color: var(--bg-content-dark);
         }
    }
}
*/