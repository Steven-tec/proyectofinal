// Lógica para registrar un usuario
document.querySelector('#registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevenir el envío del formulario

    const email = document.querySelector('#registerEmail').value;  // Usar el id específico para registro
    const password = document.querySelector('#registerPassword').value;  // Usar el id específico para registro

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert(result.error || result.message);
    }
});

// Lógica para recuperar la contraseña
document.querySelector('#recoverPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevenir el envío del formulario

    const email = document.querySelector('#recoverEmail').value;  // Usar el id específico para recuperación

    const response = await fetch('http://localhost:3000/recover-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
    } else {
        alert(data.error || data.message);
    }
});

// Lógica para iniciar sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

    const email = document.getElementById('loginEmail').value;  // Usar el id específico para login
    const password = document.getElementById('loginPassword').value;  // Usar el id específico para login

    // Realizar la petición al backend para verificar las credenciales
    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
        // Redirigir al home.html pasando el correo como parámetro
        window.location.href = `home.html?email=${encodeURIComponent(email)}`;
    } else {
        // Si hay error, mostrar un mensaje
        alert(data.message || 'Error desconocido');
    }
});

// Lógica para registrar un usuario
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Hacer una solicitud al backend para verificar si el correo ya está registrado
    const response = await fetch('http://localhost:5000/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok && data.exists) {
        // Si el correo ya está registrado, mostrar mensaje de error
        alert('Este correo ya está registrado.');
    } else if (response.ok) {
        // Si el correo no está registrado, proceder a registrar
        const registerResponse = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const registerData = await registerResponse.json();

        if (registerResponse.ok) {
            alert('Usuario registrado con éxito!');
            // Redirigir al login
            window.location.href = 'login.html';
        } else {
            alert('Error al registrar el usuario');
        }
    } else {
        alert('Error al verificar el correo');
    }
});
