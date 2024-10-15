import React, { useState } from "react";
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import styles from './../../assets/style/main.js';
import './zz_LibUtenti.js';

const Accesso = ({ showPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    function accesso() {
        if (email === '' || password === '') {
            setErrorText("Completa tutti i campi prima di proseguire");
            return;
        }
        if (email === '') {
            setErrorText("Email non valida");
            return;
        }
        let passhas = password;
        console.log("invio fetch");
        // fetch a Express (aggiungere la logica del fetch qui)
    }
    return (
        <View style={styles.stacca}>
            <View style={styles.box}>
                <Text style={styles.titoli}>Accesso a Sergio</Text>
                <TextInput autoComplete="email" spellCheck={false} style={styles.credenziali} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)}/>
                <TextInput autoComplete="password" spellCheck={false} secureTextEntry={true} style={styles.credenziali} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                {errorText !== '' && (<Text style={[{ margin: 20 }, styles.testi]}>{errorText}</Text>)}
                <Pressable onPress={() => showPage(5)}>
                    <Text style={[{ margin: 20 }, styles.link]}>Registati, qui!</Text>
                </Pressable>
                <Pressable style={styles.bottoni} onPress={accesso}><Text style={styles.testi}>Accedi</Text></Pressable>
            </View>
        </View>
    );
}
export default Accesso;