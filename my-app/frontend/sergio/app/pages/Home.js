import React, { useEffect, useState } from "react";
import { View,Text,Pressable,ScrollView,Platform,Linking } from 'react-native';
import styles from './../assets/style/main.js';
import QRCode from 'react-native-qrcode-svg';

const Qrcode = () => {
  const [route, setRoute] = useState('exp://192.168.43.250:8081');
  const handlePressAndroid = async () => {
    try {
      const supported = await Linking.canOpenURL(route);
      if (supported) await Linking.openURL(route);
        else Linking.openURL('https://play.google.com/store/apps/details?id=com.yourapp');
    } catch (error) {Linking.openURL('https://play.google.com/store/apps/details?id=com.yourapp');}
  };
  const handlePressOIs = async () => {
    try {
      const supported = await Linking.canOpenURL(route);
      if (supported) await Linking.openURL(route);
        else Linking.openURL('https://apple.it');
    } catch (error) {Linking.openURL('https://apple.it');}
  };
  return (
    <View style={styles.box}>
      <Text style={styles.testi}>Preferisci utilizzare l'app? Scansiona il QRcode.</Text>
      <Text style={styles.testi}>{"\n"}</Text>
      <QRCode value={route} size={200} color="black" backgroundColor="white" />
      <Text style={styles.testi}>{"\n"}</Text>
      <Pressable onPress={handlePressAndroid}><Text style={styles.link}>Premi qui per aprire l'app mobile per Android</Text></Pressable>
      <Pressable onPress={handlePressOIs}><Text style={styles.link}>Premi qui per aprire l'app mobile per OIs</Text></Pressable>
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