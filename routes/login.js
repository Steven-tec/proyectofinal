document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.ok) {
            // Redirigir al home pasando el correo como parámetro
            window.location.href = `home.html?email=${email}`;
        } else {
            alert(data.message || 'Error desconocido'); // Mensaje de error del servidor
        }
    } catch (error) {
        alert('Hubo un error de conexión. Por favor, intenta de nuevo más tarde.');
    }
});
