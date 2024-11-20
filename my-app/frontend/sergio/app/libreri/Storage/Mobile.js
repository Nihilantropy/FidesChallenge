import EncryptedStorage from 'react-native-encrypted-storage';

export const storeToken = async (token) => {
  try {
    await EncryptedStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Errore nel salvataggio sicuro del token:', error);
  }
};

export const getToken = async () => {
  try {
    return await EncryptedStorage.getItem('userToken');
  } catch (error) {
    console.error('Errore nel recupero sicuro del token:', error);
  }
};

export const removeToken = async () => {
  try {
    await EncryptedStorage.removeItem('userToken');
  } catch (error) {
    console.error('Errore nella rimozione sicura del token:', error);
  }
};