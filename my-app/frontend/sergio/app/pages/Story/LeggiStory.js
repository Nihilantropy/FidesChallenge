import React, {useState,useEffect} from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import styles from './../../assets/style/main.js';

const LeggiStory = ({ showPage,gJWTtoken,sid,gid }) => {
    const [storia, setStoria] = useState('');
    useEffect(() => {
      if (gJWTtoken() == ''){
        showPage(1);
        return;
      }

      fetch("http://localhost:8000/stories/"+gid(), {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(response => {
          const status = response.status;
          return response.json().then(data => ({ status, data }));
      })
      .then(({ status, data }) => {
          if (status !== 200) {
              showPage(1);
          } else {
              setStoria(data);
          }
      })
      .catch(error => {
          showPage(1);
      });
    }, [gJWTtoken, showPage]);

    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={[styles.box]}>
                    <Pressable><Text style={styles.titoli}>{storia.title}</Text></Pressable>
                    <Text>{"\n"}</Text>
                    <Text style={styles.testi}>{storia.content}</Text>
                    <Text>{"\n"}{"\n"}</Text>
                    <View style={[styles.rowpuro, {alignSelf: 'flex-start'}]}>
                        <Pressable onPress={() => showPage(7)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVR4nO2YsWsUURDGvxG5fXOJOVNooY2dIkiqBD13ZlEj5D8wlaRKbee/kNbS1ioQCEGwFEFFUAQrG7GxUVQsBLkiBjc8z7us62bvzmz2bWA++ODg7vbN7837ZvcOMI1WhOQckzzx9q9xFBVBrznSz0yaejvSb20kSzhCIge9yyQ7A4iMfzHJGoBjaLYWZhzJZgHAX3YkjzqIZ9FEtXF1jknej4LI+AND57PX4H0+WxuEg95m0t4EEAP3/HeHIJA7TLodAGQpciT3/gMgZ3kAXOb+piSxI/1YGwjj+lkmeXFwiOFUez0Y0dOITzHp40MHcYgTR/KpKojMEPgaQW/2V0mO+wnnJ13do7Uiy45fw6/V3zS5VTFD94Qj3Tg8gH+687CD5GSlCC0kF5j0bV0QvNedd1PQS5VAOMTLTPKjfggduBdBVg6AMAxbKIA0d9TuAxdbEyFM4crp7PhrkJ8zumfGgii6ITXJjvRLhPhGKUQbulr0iNA8y8/siM7mYZpJ18MXqJN2Z2sWi52940Ty6s+b30MXx+P7d62O9OUQxIfIkbxpoXu+AQWm49jX6p/PmORpYU5CF8hjeuTUCl0gG0hOoXearSM5hd5pto7kFHqnuQkdGXnxOtdiA1HrCNvRKpFlhCwjqWWkTJYRsoyklpEyWUbIMpJaRsrEJM+a/8NKiv9dNJlQuXYBEoQZ/yrwqFkAAAAASUVORK5CYII=' }} /></Pressable>
                        <Pressable onPress={() => {sid(storia.id); sShowPopupES(true) }}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwElEQVR4nO3ZvS4EURQH8P8JWfcaIR7AR7kFSo0555JQ0ck2PAFPwAv4yGoRhWhotDSEhkJNPABPQLbdTciSDUHYxJwzPu4/OeXM3F/m3mT+GSAmJia3tCH0e+JjT3LkMNaH3xpHvOVJHurjSDbx01JAKHqE0lfjiC9eIHzRzDUFhKIJog1h1BPXGgvMfrjmkAaFpYcOT7zqiffr40iu9RDS2IbXjed54hVgIvk2wxOvaS+8iSlnAJHyn4AAE4knWX71qo1HljPZWjExynHE99aH3BHfa0Cu7CFyqQCRwxwgBwoQ3shha61nDwEvmkPACxqQWXuIzChAhO0hIVWAjPTmsLV6MocApRZPXLWDcBUIrQqQpy/hW0PIjQriGcLnhpAzTcie4RnZVYTUe4kZZEkPApk3gyDMqUHakU5ZQdrBk2qQBDJoBUkQBtQgwHCnFQQY7vz1BcsR36kirAqW0yhUeRQsp1Go8ihYTqNQ5VGwnEahyqNgOY1C9R4SUn1IOmIA0S9YTqdQvU1o9SQVRUhFrVC9jSfZ0YPwNqzSjfEuT3KqADlR/zT5KAnSIQ+ebuYn5+fD0/V7ISYmJubf5BFCwZ3dhu9EdwAAAABJRU5ErkJggg==' }} /></Pressable>
                        <Pressable onPress={() => {sid(storia.id); showPage(8)}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nO2WsUoDQRCGZwrJzAUSLcVHEBsDaXRGEATfQx9A9AUsBcFeBAtre0FEsEkaGwvBwsZCxFJbkZWNCULQ3J0Xkh2YD7Y95rv5Z3YBHMdxJk8rI9QjQn0m1FdCPWnC2izYot0glC6jhqHzkIHMg3GJYEgmVyIYkGk3GKVTQCL0z32iM1NaJBDKMaRJORlCeYF02agz6k1Bmack/n4NZKtiZw4nXfXf2wlk/38y0omX5qQrz1mxclAuZtKJ34E074miMpKyRFEZsSDRPyNmBsxI5HbGlERyMu0KEt8nA9k2L0Got01YnXOJangngsdpfHicgsdpfHicQiJxas0Q6nm1G1u6U37F/lAHXWLUT9MSAxjl0bxEJObcvESEUa+MvGJHwyhn5jpBIDpcUB1WFhnllFAuYsGEescoH8lKRBjlukhhGchyuhKwvjBYtUUKZJTL5CQiBLpXLvebNUgR+mXNJhmdPBj1fUjkszczvQVgCAbZYdS32BkC3Y0zM+2aHMdxIPIF6EJXv5Hg8/cAAAAASUVORK5CYII=' }} /></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default LeggiStory;