import React, {useState} from "react";
import { View,Text,Pressable,ScrollView,TextInput,Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const { storeToken, getToken, removeToken } = Platform.OS === 'web' ? require('./../../libreri/Storage/Web.js') : require('./../../libreri/Storage/Mobile.js');

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
            if (status != 204) {
                sShowErr("Errore interno");
                removeToken();
                sJWTtoken('');
                showPage(1);
            }else {
                removeToken();
                sJWTtoken('');
                showPage(1);
            }
        })
        .catch(error => {
            removeToken();
            sShowErr("Errore interno");
            sJWTtoken('');
            showPage(1);
        });
    }
    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={styles.box}>
                    <View><Text style={styles.titoli}>Vuoi davvero cancellare il tuo profilo?</Text></View>
                    <View><Text style={styles.testi}>L'operazione non e reversibile</Text></View>
                    <Text>{"\n"}</Text>
                    <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 100, height: height, width: '50%' }]} placeholder="Raccontarci cosa sia successo? *Opsionale" value={Motivo} onChangeText={handleTextChange} />
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