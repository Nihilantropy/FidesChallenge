import React, {useState,useEffect} from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import styles from './../../assets/style/main.js';

const HomeMyStory = ({ showPage,gJWTtoken,sid,sShowPopupES }) => {
  const [storie, setStorie] = useState([{}]);
  const [disponibili, setdisponibili] = useState(1);
  useEffect(() => {
    if (gJWTtoken() == ''){
      showPage(1);
    }

    async function my_story(){
      fetch("http://localhost:8000/stories/user", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+gJWTtoken()
        }
      })
      .then(response => {
        const status = response.status;
        if (status == 200) {
          return response.json().then(data => {
            setStorie(data);
          });
        } else if (status == 204){
          setdisponibili(0);
        } else {
          showPage(1);
        }
      })
      .catch(error => {
        showPage(1);
      });
    }
    my_story();
  }, [gJWTtoken, showPage]);

  return (
    <View style={styles.stacca}>
      { disponibili == 0 && (
        <ScrollView>
          <View style={styles.box}>
            <Text style={styles.titoli}>Non mi hai ancora raccontatato nessuna storia</Text>
            <Text>{"\n"}</Text>
            <Pressable onPress={() => showPage(3)}><Text style={[styles.testi,styles.link]}>Racconta una storia</Text></Pressable>
          </View>
        </ScrollView>
      )}
      { disponibili == 1 && (
        <ScrollView>
          <View style={styles.box}><Text style={styles.testi}>Le storie che hai raccontato a Sergio</Text></View>
          {storie.map((item, index) => (
            <View key={index} style={[styles.box]}>
              <Pressable onPress={() => {sid(item.id); showPage(10) }}><Text style={[styles.titoli,styles.link]}>{item.title}</Text></Pressable>
              <View style={[styles.rowpuro, {alignSelf: 'flex-start'}]}>
                <Pressable onPress={() => {sid(item.id); sShowPopupES(true) }}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwElEQVR4nO3ZvS4EURQH8P8JWfcaIR7AR7kFSo0555JQ0ck2PAFPwAv4yGoRhWhotDSEhkJNPABPQLbdTciSDUHYxJwzPu4/OeXM3F/m3mT+GSAmJia3tCH0e+JjT3LkMNaH3xpHvOVJHurjSDbx01JAKHqE0lfjiC9eIHzRzDUFhKIJog1h1BPXGgvMfrjmkAaFpYcOT7zqiffr40iu9RDS2IbXjed54hVgIvk2wxOvaS+8iSlnAJHyn4AAE4knWX71qo1HljPZWjExynHE99aH3BHfa0Cu7CFyqQCRwxwgBwoQ3shha61nDwEvmkPACxqQWXuIzChAhO0hIVWAjPTmsLV6MocApRZPXLWDcBUIrQqQpy/hW0PIjQriGcLnhpAzTcie4RnZVYTUe4kZZEkPApk3gyDMqUHakU5ZQdrBk2qQBDJoBUkQBtQgwHCnFQQY7vz1BcsR36kirAqW0yhUeRQsp1Go8ihYTqNQ5VGwnEahyqNgOY1C9R4SUn1IOmIA0S9YTqdQvU1o9SQVRUhFrVC9jSfZ0YPwNqzSjfEuT3KqADlR/zT5KAnSIQ+ebuYn5+fD0/V7ISYmJubf5BFCwZ3dhu9EdwAAAABJRU5ErkJggg==' }} /></Pressable>
                <Pressable onPress={() => {sid(item.id); showPage(8)}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nO2WsUoDQRCGZwrJzAUSLcVHEBsDaXRGEATfQx9A9AUsBcFeBAtre0FEsEkaGwvBwsZCxFJbkZWNCULQ3J0Xkh2YD7Y95rv5Z3YBHMdxJk8rI9QjQn0m1FdCPWnC2izYot0glC6jhqHzkIHMg3GJYEgmVyIYkGk3GKVTQCL0z32iM1NaJBDKMaRJORlCeYF02agz6k1Bmack/n4NZKtiZw4nXfXf2wlk/38y0omX5qQrz1mxclAuZtKJ34E074miMpKyRFEZsSDRPyNmBsxI5HbGlERyMu0KEt8nA9k2L0Got01YnXOJangngsdpfHicgsdpfHicQiJxas0Q6nm1G1u6U37F/lAHXWLUT9MSAxjl0bxEJObcvESEUa+MvGJHwyhn5jpBIDpcUB1WFhnllFAuYsGEescoH8lKRBjlukhhGchyuhKwvjBYtUUKZJTL5CQiBLpXLvebNUgR+mXNJhmdPBj1fUjkszczvQVgCAbZYdS32BkC3Y0zM+2aHMdxIPIF6EJXv5Hg8/cAAAAASUVORK5CYII=' }} /></Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default HomeMyStory;