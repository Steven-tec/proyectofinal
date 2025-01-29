const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'No token, no access' });

    try {
        const decoded = jwt.verify(token, 'secreto');
        req.user = decoded;  // Guardamos los datos del usuario en la solicitud
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = protectRoute;
