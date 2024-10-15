import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './../../assets/style/main.js';

const NewStory = ({ showPage, gLoginTF, sShowPopupFB }) => {
  useEffect(() => {
    if (!gLoginTF()){
      showPage(2);
      sShowPopupFB(true);
    }
  }, [gLoginTF, showPage, sShowPopupFB]);
  return (
    <View style={styles.stacca}>
      <View style={styles.box}>
        <Text style={styles.testi}>Racconta la tua storia</Text>
        <Pressable onPress={() => showPage(2)}>
          <Text style={styles.link}>Annulla</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default NewStory;