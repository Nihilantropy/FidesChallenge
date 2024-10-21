import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';

// Load existing environment variables
dotenv.config();

function generateEd25519Keys() {
    // Generate Ed25519 key pair
    const { publicKey, privateKey } = generateKeyPairSync('ed25519');

    // Convert keys to PEM format
    const publicKeyPem = publicKey.export({ format: 'pem', type: 'spki' }).toString();
    const privateKeyPem = privateKey.export({ format: 'pem', type: 'pkcs8' }).toString();

    // Prepare the .env content
    const envContent = `
# Ed25519 keys for Paseto
PRIVATE_KEY="${privateKeyPem.replace(/\n/g, '\\n')}"
PUBLIC_KEY="${publicKeyPem.replace(/\n/g, '\\n')}"
`;

    // Append keys to the .env file
    fs.appendFileSync('.env', envContent.trim() + '\n', { flag: 'a' });

    console.log('Ed25519 keys generated and appended to .env file.');
}

generateEd25519Keys();
