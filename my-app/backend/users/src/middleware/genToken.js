import { V4 } from 'paseto';
import { Buffer } from 'buffer';
import { InternalServerError, TokenCreationError } from '../err/dist/CustomError.js';

const privateKey = Buffer.from(process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), 'utf-8');

export async function genToken(payload) {
    try {
        console.log(payload)
        const token = await V4.sign(
            payload, // Payload
            privateKey, // Secret key
            { expiresIn: '1h' } // Token expiration time
        );
        
        if (!token) {
            throw new TokenCreationError();
        }

        console.log("Token created!");
        return token;
    
    } catch (e) {
        console.error("Error during token generation:", e);
        throw new InternalServerError("Token generation failed");
    }
}
