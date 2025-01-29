const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Simula una base de datos de usuarios
const users = [
    { email: 'usuario@example.com', password: '$2a$10$zqHjrF4b3Sk9mp3/NoQpseQdF70o5ozxw2XzhL5Pb4t/mH3P8OZ9G' } // Contraseña: '123456'
];

// Middleware para leer el cuerpo de las peticiones (POST)
app.use(bodyParser.json());

// Ruta para el login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por correo
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos.' });
    }

    // Verificar la contraseña (usando bcrypt para comparar la contraseña encriptada)
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos.' });
    }

    // Si el login es exitoso, crear un JWT para la sesión
    const token = jwt.sign({ email: user.email }, 'mi_clave_secreta', { expiresIn: '1h' });

    // Enviar respuesta
    res.json({ message: 'Inicio de sesión exitoso', token });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
