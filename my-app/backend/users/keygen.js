import { generateKeyPairSync } from 'crypto';

// Generate a new key pair
const { privateKey, publicKey } = generateKeyPairSync('ed25519');

// Convert keys to base64 for easy storage
const privateKeyBase64 = privateKey.export({ type: 'pkcs8', format: 'pem' });
const publicKeyBase64 = publicKey.export({ type: 'spki', format: 'pem' });

// Output the keys
console.log(privateKeyBase64);
console.log(publicKeyBase64);
