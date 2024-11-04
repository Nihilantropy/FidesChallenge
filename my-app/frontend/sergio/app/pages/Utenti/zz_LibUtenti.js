/* ====== HASHING PASSWORD ====== */
import * as Crypto from 'expo-crypto';
const hashPassword = async (password) => {
    const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
    );
    return hash;
};
export default hashPassword;