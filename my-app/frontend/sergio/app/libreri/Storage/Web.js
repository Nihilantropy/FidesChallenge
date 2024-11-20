export const storeToken = async (token) => {
    try {
        localStorage.setItem('token', token);
    } catch (error) {
        console.error('Errore nel salvataggio sicuro del token:', error);
    }
};

export const getToken = async () => {
    try {
        return localStorage.getItem('token');
    } catch (error) {
        console.error('Errore nel recupero sicuro del token:', error);
    }
};
  
export const removeToken = async () => {
    try {
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Errore nella rimozione sicura del token:', error);
    }
};