import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';
import stylec from './../../assets/style/main.css';
import hashPassword from './zz_LibUtenti.js';

const validator = require('validator');
const Accesso = ({ showPage,sJWTtoken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    function accesso() {
        setErrorText("");
        /* ====== Basic Check ====== */
        if (email === '' || password === '') {
            setErrorText("Completa tutti i campi prima di proseguire");
            return;
        }
        if (!validator.isEmail(email)) {
            setErrorText("Email non valida");
            return;
        }

        /* ====== Sanitized ====== */
        const sanitizedEmail = validator.escape(email);
        const hashedPassword = hashPassword(password);
        if (hashedPassword == '') {
            setErrorText("Errore interno");
            return;
        }
        
        /* ====== Send post ====== */
        console.log("invio fetch = email:"+sanitizedEmail+" | password:"+hashedPassword);
        try {
            fetch("http://localhost/users/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: sanitizedEmail,
                    first_name: sanitizedNome,
                    last_name: sanitizedCognome,
                    username: sanitizedNickname,
                    password: hashedPassword
                }),
            })
            .then(result => {
                if (!result) return;
                const { status, body } = result;
                if (status != 200) {
                    setErrorText(body.message);
                }else {
                    sJWTtoken(body.tokenjwt);
                    showPage(2);
                }
            })
            .catch(error => {
                    setErrorText("Errore interno");
            });            
        }catch (error) {
            setErrorText("Errore interno");
            return ;
        }
    }
    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={styles.box}>
                    <Text style={styles.titoli}>Accesso a Sergio</Text>
                    <TextInput autoComplete="email" spellCheck={false} placeholder="Email" style={styles.credenziali} value={email} onChangeText={(text) => setEmail(text)}/>
                    <TextInput autoComplete="password" spellCheck={false} secureTextEntry={true} style={styles.credenziali} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                    {errorText !== '' && (<Text style={[{ margin: 20 }, styles.testi]}>{errorText}</Text>)}
                    <Pressable onPress={() => showPage(5)}><Text style={[{ margin: 20 }, styles.link]}>Registati, qui!</Text></Pressable>
                    <Pressable style={styles.bottoni} onPress={accesso}><Text style={styles.testi}>Accedi</Text></Pressable>
                    <Pressable onPress={() => showPage(1)} style={ styles.sinistra }><Text style={ styles.tornaallahome }>Torna alla home</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
export default Accesso;