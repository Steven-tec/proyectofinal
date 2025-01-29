// Datos simulados de usuarios registrados
const usuariosRegistrados = [
    { email: "steven@gmail.com", password: "steven123" },
    { email: "alexis@gmail,com", password: "alexis123" },
    { email: "ronny@gmail.com", password: "ronny123" },
    { email: "david@gmail.com", password: "david123" },
];

// Al cargar la página, verificar si hay un usuario guardado en localStorage
window.onload = function() {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
        document.getElementById('email').value = storedEmail;
        document.getElementById('password').value = storedPassword;
        document.getElementById('rememberMe').checked = true;
    }
};

// Función para manejar la lógica de login y redirección
function iniciarSesion() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked; // Obtener si "Recuérdame" está seleccionado

    // Buscar si el correo y la contraseña coinciden con un usuario registrado
    const usuario = usuariosRegistrados.find(u => u.email === email && u.password === password);

    if (usuario) {
        // Si el usuario está registrado y las credenciales son correctas, redirige a home.html
        window.location.href = `home.html?email=${encodeURIComponent(email)}`;

        // Si "Recuérdame" está marcado, guardar las credenciales en localStorage
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password); // Guardar también la contraseña si es necesario
        }
    } else {
        // Si las credenciales no coinciden, muestra un mensaje de error
        alert('Correo o contraseña incorrectos.');
    }
}
