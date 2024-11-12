import React, {useState} from "react";
import { View,Text,Pressable,ScrollView,TextInput } from 'react-native';
import styles from './../../assets/style/main.js';

const Delete = ({ showPage,sJWTtoken,gJWTtoken,sShowErr }) => {
    /* Fuori se non loggato */
    if (gJWTtoken() == ''){
        showPage(1);
        sShowPopupFB(true);
        return ;
    }

    const [Motivo, setMotivo] = useState('');
    const [height, setHeight] = useState(100);
    const handleTextChange = (text) => {
        if (text.length <= 1000)
            setMotivo(text);
    };
    const handleContentSizeChange = (e) => {
        const newHeight = e.nativeEvent.contentSize.height;
        if (Motivo.length > 0 && newHeight > 100) setHeight(newHeight);
        else if (Motivo.length === 0) setHeight(100);
    };

    async function elimina() {
        fetch("http://localhost:8000/users/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+gJWTtoken()
            },
        })
        .then(response => {
            const status = response.status;
            return response.json().then(data => ({ status, data }));
        })
        .then(({ status, data }) => {
            if (status != 204) {
                sShowErr("Errore interno");
            }else {
                showPage(1);
                sJWTtoken('');
            }
        })
        .catch(error => {
            sShowErr("Errore interno");
        });
    }
    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={styles.box}>
                    <View><Text style={styles.titoli}>Vuoi davvero cancellare il tuo profilo?</Text></View>
                    <View><Text style={styles.testi}>L'operazione non e reversibile</Text></View>
                    <Text>{"\n"}</Text>
                    <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 100, height: height, width: '50%' }]} placeholder="Raccontarci cosa sia successo? *Opzionale" value={Motivo} onChangeText={handleTextChange} />
                    <Text>{"\n"}</Text>
                    <View style={styles.rowpuro}>
                        <Pressable onPress={() => { showPage(6) }}><Text style={styles.link}>Annulla</Text></Pressable>
                        <Text>                  </Text>
                        <Pressable onPress={() => { elimina(); }}><Text style={styles.link}>Procedi</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default Delete;