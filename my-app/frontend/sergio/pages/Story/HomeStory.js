import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const HomeStory = ({ showPage }) => {
  let jsonData =[
    { "id": 1, "titolo": "Parasati in Love", "storia": "Una storia d'amore tormentata tra due persone con passati difficili che cercano redenzione attraverso il loro legame."},
    { "id": 2, "titolo": "Voglio mangiare il tuo pancreas", "storia": "La toccante amicizia tra un ragazzo introverso e una ragazza malata terminale, che vive intensamente i suoi ultimi giorni, trasformando la vita di entrambi."},
    { "id": 3, "titolo": "Darling in the FranxX", "storia": "è ambientato in un futuro distopico, dove giovani piloti, tra cui Hiro e Zero Two, combattono contro mostri giganti chiamati Klaxosauri utilizzando mecha noti come FranXX. La serie esplora temi di identità, relazioni umane e sacrificio mentre i protagonisti lottano per trovare il loro posto in un mondo rigidamente controllato."}
  ];
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.titoli}>Hai una storia che vuoi condividere?</Text>
          <Pressable onPress={() => showPage(3)}><Text style={styles.link}>Raccontala a Sergio</Text></Pressable>
        </View>
        {jsonData.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.titoli}>{item.titolo}</Text>
            <Text style={styles.testi}>{item.storia}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default HomeStory;