import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    console.log("token: ", token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ",decoded.userId);
        req.user = decoded; // Attach user object to request
        next();
    } catch (error) {
        console.error('Token verification failed: ', error.message);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};
