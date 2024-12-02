import React, { useState } from "react";
import { View,Text,Pressable,ScrollView,Platform,Linking } from 'react-native';
import styles from './../assets/style/main.js';
import QRCode from 'react-native-qrcode-svg';

const Qrcode = () => {
  const [route, setRoute] = useState('exp://192.168.1.20:8081');
  return (
    <View style={styles.box}>
      <Text style={styles.testi}>
        Preferisci parlarmi dall'app? Scansiona il QRcode. O premi {' '}
        <Pressable onPress={() => Linking.openURL(route)}><Text style={styles.link}>Qui</Text></Pressable>
      </Text>
      <Text style={styles.testi}>{"\n"}</Text>
      <QRCode value={route} size={200} color="black" backgroundColor="white" />
      <Text style={styles.testi}>{"\n"}</Text>
      <Text style={styles.testi}>Per la versione Mobile installare: React Go</Text>
      <View style={[styles.rowpuro, {justifyContent: 'space-between'}]}>
        <Pressable onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=host.exp.exponent')}><Text style={styles.link}>Android</Text></Pressable>
        <Text>           </Text>
        <Pressable onPress={() => Linking.openURL('https://apps.apple.com/it/app/expo-go/id982107779')}><Text style={styles.link}>OIs</Text></Pressable>
      </View>
    </View>
  );
};

const Home = ({ showPage }) => {
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={[styles.titoli, {alignSelf: 'flex-start'}]}>Ciao 👋{"\n"}Sono Sergio 🤗, il tuo narrastore tascabile ✨</Text>
          <Text style={[styles.testi, {alignSelf: 'flex-start'}]}>Con me puoi scoprire storie emozionanti da ogni angolo del mondo o crearne di nuove insieme a me!</Text>
          <Text style={styles.titoli}>{"\n"}</Text>
          <Pressable onPress={() => showPage(2)}><Text style={styles.link}>Inizia qui</Text></Pressable>
        </View>
        { Platform.OS === 'web' && <Qrcode /> }
      </ScrollView>
    </View>
  );
}
export default Home;