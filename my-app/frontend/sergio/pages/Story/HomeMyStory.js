import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import styles from './../../assets/style/main.js';

const HomeMyStory = ({ showPage,gWVTtoken,sid,sShowPopupES }) => {
  // useEffect(() => {
  //   if (gWVTtoken() == ''){
  //     showPage(1);
  //   }
  // }, [gWVTtoken, showPage]);

  let jsonData =[
    { "id": 1, "titolo": "Parasati in Love", "storia": "Una storia d'amore tormentata tra due persone con passati difficili che cercano redenzione attraverso il loro legame."},
    { "id": 2, "titolo": "Voglio mangiare il tuo pancreas", "storia": "La toccante amicizia tra un ragazzo introverso e una ragazza malata terminale, che vive intensamente i suoi ultimi giorni, trasformando la vita di entrambi."},
    { "id": 3, "titolo": "Darling in the FranxX", "storia": "è ambientato in un futuro distopico, dove giovani piloti, tra cui Hiro e Zero Two, combattono contro mostri giganti chiamati Klaxosauri utilizzando mecha noti come FranXX. La serie esplora temi di identità, relazioni umane e sacrificio mentre i protagonisti lottano per trovare il loro posto in un mondo rigidamente controllato."}
  ];
  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={styles.box}><Text style={styles.testi}>Le storie che hai raccontato a Sergio</Text></View>
        {jsonData.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.titoli}>{item.titolo}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.testi}>{item.storia}</Text>
            <Text>{"\n"}{"\n"}</Text>
            <View style={[styles.rowpuro, {alignSelf: 'flex-start'}]}>
              <Pressable onPress={() => {sid(item.id); sShowPopupES(true) }}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwElEQVR4nO3ZvS4EURQH8P8JWfcaIR7AR7kFSo0555JQ0ck2PAFPwAv4yGoRhWhotDSEhkJNPABPQLbdTciSDUHYxJwzPu4/OeXM3F/m3mT+GSAmJia3tCH0e+JjT3LkMNaH3xpHvOVJHurjSDbx01JAKHqE0lfjiC9eIHzRzDUFhKIJog1h1BPXGgvMfrjmkAaFpYcOT7zqiffr40iu9RDS2IbXjed54hVgIvk2wxOvaS+8iSlnAJHyn4AAE4knWX71qo1HljPZWjExynHE99aH3BHfa0Cu7CFyqQCRwxwgBwoQ3shha61nDwEvmkPACxqQWXuIzChAhO0hIVWAjPTmsLV6MocApRZPXLWDcBUIrQqQpy/hW0PIjQriGcLnhpAzTcie4RnZVYTUe4kZZEkPApk3gyDMqUHakU5ZQdrBk2qQBDJoBUkQBtQgwHCnFQQY7vz1BcsR36kirAqW0yhUeRQsp1Go8ihYTqNQ5VGwnEahyqNgOY1C9R4SUn1IOmIA0S9YTqdQvU1o9SQVRUhFrVC9jSfZ0YPwNqzSjfEuT3KqADlR/zT5KAnSIQ+ebuYn5+fD0/V7ISYmJubf5BFCwZ3dhu9EdwAAAABJRU5ErkJggg==' }} /></Pressable>
              <Pressable onPress={() => {sid(item.id); showPage(8)}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nO2WsUoDQRCGZwrJzAUSLcVHEBsDaXRGEATfQx9A9AUsBcFeBAtre0FEsEkaGwvBwsZCxFJbkZWNCULQ3J0Xkh2YD7Y95rv5Z3YBHMdxJk8rI9QjQn0m1FdCPWnC2izYot0glC6jhqHzkIHMg3GJYEgmVyIYkGk3GKVTQCL0z32iM1NaJBDKMaRJORlCeYF02agz6k1Bmack/n4NZKtiZw4nXfXf2wlk/38y0omX5qQrz1mxclAuZtKJ34E074miMpKyRFEZsSDRPyNmBsxI5HbGlERyMu0KEt8nA9k2L0Got01YnXOJangngsdpfHicgsdpfHicQiJxas0Q6nm1G1u6U37F/lAHXWLUT9MSAxjl0bxEJObcvESEUa+MvGJHwyhn5jpBIDpcUB1WFhnllFAuYsGEescoH8lKRBjlukhhGchyuhKwvjBYtUUKZJTL5CQiBLpXLvebNUgR+mXNJhmdPBj1fUjkszczvQVgCAbZYdS32BkC3Y0zM+2aHMdxIPIF6EJXv5Hg8/cAAAAASUVORK5CYII=' }} /></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default HomeMyStory;