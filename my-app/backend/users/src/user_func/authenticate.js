import { V4 } from 'paseto';
import { Buffer } from 'buffer';

// Middleware to authenticate using Paseto token
async function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const publicKey = Buffer.from(process.env.PUBLIC_KEY, 'base64'); // Load public key
        const payload = await V4.verify(token, publicKey);

        req.user = payload; // Attach the user info to the request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authenticate;