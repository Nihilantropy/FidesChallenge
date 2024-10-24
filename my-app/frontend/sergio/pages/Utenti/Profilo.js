import React, {useEffect} from "react";
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const Profilo = ({ showPage, gWVTtoken, sShowPopupFB }) => {
    // useEffect(() => {
    //   if (gWVTtoken() == ''){
    //     showPage(1);
    //     sShowPopupFB(true);
    //   }
    // }, [gWVTtoken, showPage, sShowPopupFB]);

    return (
        <View style={styles.stacca}>
        <ScrollView>
            <View style={styles.box}>
            <Text style={styles.titoli}>Dati dell'utente</Text>
            <Text style={styles.titoli}>{"\n"}</Text>
            <Pressable onPress={() => showPage(7)}><Text style={styles.link}>Mostra le mie storie</Text></Pressable>
            </View>
        </ScrollView>
        </View>
    );
}
export default Profilo;