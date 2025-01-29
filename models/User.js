const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Middleware para cifrar la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar la contraseña ingresada con la cifrada
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;