import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './../../assets/style/main.js';

const HomeMyStory = () => {
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}><Text style={styles.testi}>Tutte le storie che hai raccontato</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Le varie storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Le varie storie</Text></View>
        <View style={styles.box}><Text style={styles.testi}>Le varie storie</Text></View>
      </ScrollView>
    </View>
  );
};
export default HomeMyStory;