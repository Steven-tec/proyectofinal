const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const user = new User({ email, password });

    try {
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

module.exports = router;
