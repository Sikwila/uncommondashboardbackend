// # authMiddleware.js for role-based access

const jwt = require('jsonwebtoken');

// Authentication Middleware
exports.authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');  // Token from headers
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Verify token and attach user payload to req.user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Role-Based Access Control Middleware
exports.roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    };
};
