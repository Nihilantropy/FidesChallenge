import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';
import Footer from './../../components/Footer';

const HomeStory = ({ showPage }) => {
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.testi}>Hai una storia che vuoi condividere?</Text>
          <Pressable onPress={() => showPage(3)}><Text style={styles.link}>Raccontala a Sergio</Text></Pressable>
        </View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Ciclo che farà vedere tutte le storie</Text></View>
        <Footer />
      </ScrollView>
    </View>
  );
};
export default HomeStory;