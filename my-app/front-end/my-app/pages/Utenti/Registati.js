import React, { useState } from "react";
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import styles from './../../assets/style/main.js';
import './zz_LibUtenti.js';

const Registati = ({ showPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [errorText, setErrorText] = useState('');

    function registati() {
        if (email === '' || password === '' || confpassword === '') {
            setErrorText("Completa tutti i campi prima di proseguire");
            return;
        }
        if (email === '') {
            setErrorText("Email non valida");
            return;
        }
        if (password !== confpassword) {
            setErrorText("Le password non sono uguali");
            return;
        }
        let passhas = password;
        console.log("invio fetch");
        // fetch a Express (aggiungere la logica del fetch qui)
    }
    return (
        <View style={styles.stacca}>
            <View style={styles.box}>
                <Text style={styles.titoli}>Registati a Sergio</Text>
                <TextInput autoComplete="email" spellCheck={false} style={styles.credenziali} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)}/>
                <TextInput autoComplete="password" spellCheck={false} secureTextEntry={true} style={styles.credenziali} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                <TextInput autoComplete="confpassword" spellCheck={false} secureTextEntry={true} style={styles.credenziali} placeholder="Conferma password" value={confpassword} onChangeText={(text) => setConfpassword(text)} />
                {errorText !== '' && (<Text style={[{ margin: 20 }, styles.testi]}>{errorText}</Text>)}
                <Pressable onPress={() => showPage(4)}>
                    <Text style={[{ margin: 20 }, styles.link]}>Accedi, qui!</Text>
                </Pressable>
                <Pressable style={styles.bottoni} onPress={registati}><Text style={styles.testi}>Registrati</Text></Pressable>
            </View>
        </View>
    );
}
export default Registati;