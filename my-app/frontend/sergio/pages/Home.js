import React from "react";
import { View, Text, Pressable, ScrollView, Platform, Image } from 'react-native';
import styles from './../assets/style/main.js';

const Qrcode = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.testi}>Preferisci utilizzare l'app? Scansiona il QRcode</Text>
      <Text style={styles.testi}>{"\n"}</Text>
      <Image style={styles.qrcode} source={{ uri: 'data:image/png;base64,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' }} />
    </View>
  );
};

const Home = ({ showPage }) => {
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.titoli}>Sergio è una piattaforma che permette di narrare e leggere storie da tutto il mondo</Text>
          <Text style={styles.titoli}>{"\n"}</Text>
          <Pressable onPress={() => showPage(2)}><Text style={styles.link}>Inizia a leggere, qui</Text></Pressable>
        </View>
        { Platform.OS === 'web' && <Qrcode /> }
      </ScrollView>
    </View>
  );
}
export default Home;