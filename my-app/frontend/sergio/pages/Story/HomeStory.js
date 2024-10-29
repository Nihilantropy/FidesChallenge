import React, {useState,useEffect} from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const Racconta = () => {
  /* temp */
  let jsonData = [
    { "id": 1, "titolo": "Parasati in Love", "storia": "Una storia d'amore tormentata tra due persone con passati difficili che cercano redenzione attraverso il loro legame." },
    { "id": 2, "titolo": "Voglio mangiare il tuo pancreas", "storia": "La toccante amicizia tra un ragazzo introverso e una ragazza malata terminale, che vive intensamente i suoi ultimi giorni, trasformando la vita di entrambi." },
    { "id": 3, "titolo": "Darling in the FranxX", "storia": "è ambientato in un futuro distopico, dove giovani piloti, tra cui Hiro e Zero Two, combattono contro mostri giganti chiamati Klaxosauri utilizzando mecha noti come FranXX. La serie esplora temi di identità, relazioni umane e sacrificio mentre i protagonisti lottano per trovare il loro posto in un mondo rigidamente controllato." }
  ];
  const getRandomStory = () => jsonData[Math.floor(Math.random() * jsonData.length)];
  /* fine temp */

  const [stori, setStori] = useState(getRandomStory());
  return (
    <View style={styles.box}>
      <Text style={styles.titoli}>{stori.titolo}</Text>
      <Text>{"\n"}</Text>
      <Text style={styles.testi}>{stori.storia}</Text>
      <Text>{"\n"}</Text>
      <Pressable style={styles.bottoni} onPress={() => setStori(getRandomStory())}><Text style={styles.testi}>Raccontami un'altra storia</Text></Pressable>
    </View>
  );
};

const Inventa = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.testidestra}>Inventa</Text>
    </View>
  );
};

const Preferiti = ({gWVTtoken,sShowPopupFB,setPage}) => {
  useEffect(() => {
    if (gWVTtoken() == ''){
      setPage('');
      sShowPopupFB(true);
    }
  }, [gWVTtoken, setPage, sShowPopupFB]);
  return (
    <View style={styles.box}>
      <Text style={styles.testidestra}>Preferiti</Text>
    </View>
  );
};

const HomeStory = ({ showPage, gWVTtoken,sShowPopupFB }) => {
  const [Page, setPage] = useState('');
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.titoli}>Cosa vuoi che faccia?</Text>
          <Pressable style={styles.bottoni} onPress={() => setPage('Racconta')}><Text style={styles.testi}>Raccontami una storia</Text></Pressable>
          <Pressable style={styles.bottoni} onPress={() => setPage('Preferiti')}><Text style={styles.testi}>Raccontami una delle mie preferite</Text></Pressable>
          <Pressable style={styles.bottoni} onPress={() => setPage('Inventa')}><Text style={styles.testi}>Inventane una nuova</Text></Pressable>
          <Pressable style={styles.bottoni} onPress={() => showPage(3)}><Text style={styles.testi}>Ascoltami parlare</Text></Pressable>
        </View>
        {Page == 'Racconta' && <Racconta /> }
        {Page == 'Preferiti' && <Preferiti gWVTtoken={gWVTtoken} sShowPopupFB={sShowPopupFB} setPage={setPage} /> }
        {Page == 'Inventa' && <Inventa /> }
      </ScrollView>
    </View>
  );
};
export default HomeStory;