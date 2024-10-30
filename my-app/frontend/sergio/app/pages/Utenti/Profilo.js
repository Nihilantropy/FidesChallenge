import React, {useEffect} from "react";
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const Profilo = ({ showPage, gWVTtoken, sShowPopupFB, setShowPopupConf }) => {
    useEffect(() => {
      if (gWVTtoken() == ''){
        showPage(1);
        sShowPopupFB(true);
      }
    }, [gWVTtoken, showPage, sShowPopupFB]);
    
    let jsonData;

    console.log(gWVTtoken());
    fetch("http://localhost/users/profile", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${gWVTtoken()}` // Set token in the Authorization header
        },
    })
    .then(result => {
        if (!result) return;
        const { status, body } = result;
        if (status != 200) {
            showPage(1);
        } else {
            jsonData = body;
        }
    })
    .catch(error => {
        ;//showPage(1);
    });
    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={styles.centro}>
                    <View style={styles.box2}>
                        {jsonData.map((item, index) => (
                            <View key={index}>
                                <Text style={styles.testi}>Email: {item.email}</Text>
                                <Text style={styles.testi}>Nome Cognome: {item.first_name} {item.last_name}</Text>
                                <Text style={styles.testi}>Nickname: {item.username}</Text>
                            </View>
                        ))}
                        <Text style={styles.titoli}>{"\n"}</Text>
                        <Pressable onPress={() => showPage(7)}><Text style={styles.link}>Mostra le mie storie</Text></Pressable>
                        <Pressable onPress={() => setShowPopupConf(true)}><Text style={styles.link}>Elimina il mio account</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default Profilo;