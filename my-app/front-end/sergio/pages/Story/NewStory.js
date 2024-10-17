import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';
import Footer from './../../components/Footer';

const NewStory = ({ showPage, gWVTtoken, sShowPopupFB }) => {
  useEffect(() => {
    if (gWVTtoken() == ''){
      showPage(2);
      sShowPopupFB(true);
    }
  }, [gWVTtoken, showPage, sShowPopupFB]);
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.testi}>Racconta la tua storia</Text>
          <Pressable onPress={() => showPage(2)}>
            <Text style={styles.link}>Annulla</Text>
          </Pressable>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};
export default NewStory;