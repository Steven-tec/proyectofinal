// Función para confirmar el cierre de sesión
function confirmarCerrarSesion() {
    const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmar) {
        // Si el usuario confirma, redirigimos a la página de inicio de sesión (login.html)
        window.location.href = "login.html";
    }
}

// Capturar el parámetro 'email' de la URL
const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');

// Mostrar el correo del usuario en el mensaje
if (userEmail) {
    document.getElementById('user-email').textContent = userEmail;
} else {
    document.getElementById('user-email').textContent = 'Usuario';
}

