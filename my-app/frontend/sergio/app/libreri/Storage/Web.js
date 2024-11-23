import Cookies from 'js-cookie';

export const storeToken = (token) => {
    try {
        Cookies.set('token', token, {
            /*secure: true, abiklita https */
            sameSite: 'strict',
            expires: 1/24,
        });
    } catch (error) {
        console.error('Errore nel salvataggio del token nei cookie:', error);
    }
};

export const getToken = () => {
    try {
        return Cookies.get('token');
    } catch (error) {
        console.error('Errore nel recupero del token dai cookie:', error);
        return null;
    }
};

export const removeToken = () => {
    try {
        Cookies.remove('token');
    } catch (error) {
        console.error('Errore nella rimozione del token dai cookie:', error);
    }
};