"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.roles.includes(role)) {
            return next();
        }
        else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};
exports.requireRole = requireRole;
