import React from 'react';
import { View, Text, Linking, Pressable } from 'react-native';
import styles from './../assets/style/main.js';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.testi}>
        Progetto a cura di: Claudio Rea | Mario Cantelli | {' '}
        <Pressable onPress={() => Linking.openURL('https://andreianghi.ddns.net')}><Text style={styles.link}>Andrei Anghi [Angly colui che regna]</Text></Pressable>
      </Text>
    </View>
  );
};
export default Footer;