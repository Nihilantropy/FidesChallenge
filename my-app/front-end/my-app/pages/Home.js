import React from "react";
import { View, Text, Pressable } from 'react-native';
import styles from './../assets/style/main.js';

const Home = ({ showPage }) => {
  return (
    <View style={styles.stacca}>
      <View style={styles.box}>
        <Text style={styles.titoli}>
          Sergio è una piattaforma che permette di narrare e leggere storie da tutto il mondo
        </Text>
        <Pressable onPress={() => showPage(3)}>
          <Text style={styles.link}>Inizia a leggere, qui</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default Home;