import React, {useEffect} from "react";
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const Profilo = ({ showPage, gWVTtoken, sShowPopupFB, setShowPopupConf }) => {
    // useEffect(() => {
    //   if (gWVTtoken() == ''){
    //     showPage(1);
    //     sShowPopupFB(true);
    //   }
    // }, [gWVTtoken, showPage, sShowPopupFB]);
    
    let jsonData =[
        { "email": "angly@gmail.com", "nome": "Angly", "cognome": "Regna", "nickname": "Angly colui che regna"},
    ];

    fetch("http://localhost:3000/users/profile", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            wvt: gWVTtoken()
        }),
    })
    .then(result => {
        if (!result) return;
        const { status, body } = result;
        if (status != 200) {
            showPage(1);
        }else {
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
                                <Text style={styles.testi}>Nome Cognome: {item.nome} {item.cognome}</Text>
                                <Text style={styles.testi}>Nickname: {item.nickname}</Text>
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