import * as SecureStore from 'expo-secure-store';

export const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync('userToken', token);
  } catch (error) {
    console.error('Errore nel salvataggio sicuro del token:', error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync('userToken');
  } catch (error) {
    console.error('Errore nel recupero sicuro del token:', error);
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken');
  } catch (error) {
    console.error('Errore nella rimozione sicura del token:', error);
  }
};
