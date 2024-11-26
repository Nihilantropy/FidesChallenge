import React, {useEffect,useState} from "react";
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import styles from './../../assets/style/main.js';
import global from './../../global.js';

const { storeToken, getToken, removeToken } = Platform.OS === 'web' ? require('./../../libreri/Storage/Web.js') : require('./../../libreri/Storage/Mobile.js');

const Profilo = ({ showPage,sJWTtoken,gJWTtoken, sShowPopupFB }) => {
    const [jsonData, setJsonData] = useState([{email: '', first_name: '', last_name: '', username: ''}]);
    const [disponibili, setdisponibili] = useState(1);
    useEffect(() => {
        /* Fuori se non loggato */
        if (gJWTtoken() == ''){
          showPage(1);
          sShowPopupFB(true);
          return ;
        }

        /* Ricerca info */
        const getdata = async () => {
            const api_url = global.url_users+"profile";
            fetch(api_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+gJWTtoken()
                }
            })
            .then(response => {
                const status = response.status;
                if (status == 200) {
                    return response.json().then(data => {
                        setJsonData(data);
                    });
                } else if (status == 204){
                    setdisponibili(0);
                } else {
                    showPage(1);
                }
            })
            .catch(error => {
                showPage(1);
            });
        }
        getdata();
    }, [gJWTtoken, showPage, sShowPopupFB, setJsonData]);

    return (
        <View style={styles.stacca}>
            { disponibili == 0 && (
                <View style={styles.box}><Text style={styles.titoli}>Non mi hai raccontato nessuna storia</Text></View>
            )}
            { disponibili == 1 && (
                <ScrollView>
                    <View style={styles.centro}>
                        <View style={styles.box2}>
                            <View>
                                <Text style={styles.testi}>Email: {jsonData.email}</Text>
                                <Text style={styles.testi}>Nome Cognome: {jsonData.first_name} {jsonData.last_name}</Text>
                                <Text style={styles.testi}>Nickname: {jsonData.username}</Text>
                            </View>
                            <Text style={styles.titoli}>{"\n"}</Text>
                            <Pressable onPress={() => showPage(7)}><Text style={styles.link}>Mostra le mie storie</Text></Pressable>
                            <Pressable onPress={() => showPage(9)}><Text style={styles.link}>Elimina il mio account</Text></Pressable>
                            <Pressable onPress={() => {removeToken(),sJWTtoken(''),showPage(1)}}><Text style={styles.link}>Esci</Text></Pressable>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
export default Profilo;