import React, {useEffect,useState} from "react";
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const Profilo = ({ showPage,sJWTtoken,gJWTtoken, sShowPopupFB }) => {
    const [jsonData, setJsonData] = useState([{email: '', first_name: '', last_name: '', username: ''}]);
    useEffect(() => {
        /* Fuori se non loggato */
        if (gJWTtoken() == ''){
          showPage(1);
          sShowPopupFB(true);
          return ;
        }

        /* Ricerca info */
        fetch("http://localhost:8000/users/profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+gJWTtoken()
            }
        })
        .then(response => {
            const status = response.status;
            return response.json().then(data => ({ status, data }));
        })
        .then(({ status, data }) => {
            if (status !== 200) {
                showPage(1);
            } else {
                setJsonData(data);
            }
        })
        .catch(error => {
            showPage(1);
        });
    }, [gJWTtoken, showPage, sShowPopupFB, setJsonData]);

    return (
        <View style={styles.stacca}>
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
                        <Pressable onPress={() => {sJWTtoken(''),showPage(1)}}><Text style={styles.link}>Esci</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default Profilo;