import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';
// import stylec from './../../assets/style/main.css';
import hashPassword from './zz_LibUtenti.js';

const validator = require('validator');
const Accesso = ({ showPage,sJWTtoken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const accesso = async () => {
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
        const hashedPassword = await hashPassword(password);
        if (hashedPassword == '') {
            setErrorText("Errore interno");
            return;
        }
        
        /* ====== Send post ====== */
        fetch("http://localhost:8000/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: sanitizedEmail,
                password: hashedPassword
            }),
        })
        .then(response => {
            const status = response.status;
            return response.json().then(data => ({ status, data }));
        })
        .then(({ status, data }) => {
            if (status !== 200) {
                setErrorText(data.message);
            } else {
                sJWTtoken(data.token);
                showPage(2);
            }
        })
        .catch(error => {
            setErrorText("Errore interno");
        });
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