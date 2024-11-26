import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Platform } from 'react-native';
import styles from './../../assets/style/main.js';
// import stylec from './../../assets/style/main.css';
import hashPassword from './zz_LibUtenti.js';
import '../../components/global.js'

const { storeToken, getToken, removeToken } = Platform.OS === 'web' ? require('./../../libreri/Storage/Web.js') : require('./../../libreri/Storage/Mobile.js');

const validator = require('validator');
const Registati = ({ showPage,sJWTtoken }) => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const registati = async () => {
        /* ====== Basic Check ====== */
        setErrorText("");
        if (email === '' || nome === '' || cognome === '' || nickname === '' || password === '' || confpassword === '') {
            setErrorText("Completa tutti i campi prima di proseguire");
            return;
        }
        if (!validator.isEmail(email)) {
            setErrorText("Email non valida");
            return;
        }
        /* Regex per controllare ch ci sia almeno 1 carattere: speciale, in maiuscolo; e almeno 1 numero. Minimo di lunghezza: 1 */
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;
        if (!passwordRegex.test(password)) {
            setErrorText("La password deve contenere almeno:\n1 carattere maiuscolo\n1 carattere speciale (@,$,!,%,*,?)\n1 numero");
            return;
        }
        if (password !== confpassword) {
            setErrorText("Le password non sono uguali");
            return;
        }

        /* ====== Sanitized ====== */
        const sanitizedEmail = validator.escape(email);
        const sanitizedNome = validator.escape(nome);
        const sanitizedCognome = validator.escape(cognome);
        const sanitizedNickname = validator.escape(nickname);
        const hashedPassword = await hashPassword(password);
        if (hashedPassword == '') {
            setErrorText("Errore interno");
            return;
        }

        /* ====== Send post ====== */
        const api_url = global.url_users + "create";
        fetch(api_url, {
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
        .then(response => {
            const status = response.status;
            return response.json().then(data => ({ status, data }));
        })
        .then(({ status, data }) => {
            if (status !== 201) {
                setErrorText(data.message);
            } else {
                storeToken(data.token);
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
                    <Text style={styles.titoli}>Registati a Sergio</Text>
                    <TextInput autoComplete="email" spellCheck={false} style={styles.credenziali} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)}/>
                    <TextInput autoComplete="nome" spellCheck={false} style={styles.credenziali} placeholder="Nome" value={nome} onChangeText={(text) => setNome(text)}/>
                    <TextInput autoComplete="cognome" spellCheck={false} style={styles.credenziali} placeholder="Cognome" value={cognome} onChangeText={(text) => setCognome(text)}/>
                    <TextInput autoComplete="nickname" spellCheck={false} style={styles.credenziali} placeholder="Nickname" value={nickname} onChangeText={(text) => setNickname(text)}/>
                    <TextInput autoComplete="password" spellCheck={false} secureTextEntry={true} style={styles.credenziali} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                    <TextInput autoComplete="confpassword" spellCheck={false} secureTextEntry={true} style={styles.credenziali} placeholder="Conferma password" value={confpassword} onChangeText={(text) => setConfpassword(text)} />
                    {errorText !== '' && (<Text style={[{ margin: 20 }, styles.testi]}>{errorText}</Text>)}
                    <Pressable onPress={() => showPage(4)}>
                        <Text style={[{ margin: 20 }, styles.link]}>Accedi, qui!</Text>
                    </Pressable>
                    <Pressable style={styles.bottoni} onPress={registati}><Text style={styles.testi}>Registrati</Text></Pressable>
                    <Pressable onPress={() => showPage(1)} style={ styles.sinistra }><Text style={ styles.tornaallahome }>Torna alla home</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
export default Registati;