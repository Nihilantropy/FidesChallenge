/* ====== HASHING PASSWORD ====== */
import * as Crypto from 'expo-crypto';

const hashPassword = async (password) => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
    );
    return digest; // Restituisce l'hash della password
};
export default hashPassword;