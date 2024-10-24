import React from "react";
import { View, Text, Pressable,ScrollView } from 'react-native';
import styles from './../assets/style/main.js';

const Home = ({ showPage }) => {
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.titoli}>Sergio è una piattaforma che permette di narrare e leggere storie da tutto il mondo</Text>
          <Text style={styles.titoli}>{"\n"}</Text>
          <Pressable onPress={() => showPage(2)}><Text style={styles.link}>Inizia a leggere, qui</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
export default Home;