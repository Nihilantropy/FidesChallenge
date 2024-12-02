import React, {useState,useEffect} from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import styles from './../../assets/style/main.js';
import {notshow,show} from './zz_LibStory.js';

const HomeMyStory = ({ showPage,gJWTtoken,sid,sShowPopupES,sShowErr }) => {
  const [storie, setStorie] = useState([{}]);
  const [disponibili, setdisponibili] = useState(1);

  async function my_story(){
    const api_url = process.env.EXPO_PUBLIC_URL_STORIES + "user";
    fetch(api_url, {
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

  useEffect(() => {
    if (gJWTtoken() == ''){
      showPage(1);
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
          <View style={styles.box}><Text style={styles.testi}>Le storie che mi hai raccontato</Text></View>
          {storie.map((item, index) => (
            <View key={index} style={[styles.box]}>
              <Pressable onPress={() => {sid(item.id); showPage(10) }}><Text style={[styles.titoli,styles.link]}>{item.title}</Text></Pressable>
              <View style={[styles.rowpuro, {alignSelf: 'flex-start'}]}>
                <Pressable onPress={() => {sid(item.id); sShowPopupES(true) }}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwElEQVR4nO3ZvS4EURQH8P8JWfcaIR7AR7kFSo0555JQ0ck2PAFPwAv4yGoRhWhotDSEhkJNPABPQLbdTciSDUHYxJwzPu4/OeXM3F/m3mT+GSAmJia3tCH0e+JjT3LkMNaH3xpHvOVJHurjSDbx01JAKHqE0lfjiC9eIHzRzDUFhKIJog1h1BPXGgvMfrjmkAaFpYcOT7zqiffr40iu9RDS2IbXjed54hVgIvk2wxOvaS+8iSlnAJHyn4AAE4knWX71qo1HljPZWjExynHE99aH3BHfa0Cu7CFyqQCRwxwgBwoQ3shha61nDwEvmkPACxqQWXuIzChAhO0hIVWAjPTmsLV6MocApRZPXLWDcBUIrQqQpy/hW0PIjQriGcLnhpAzTcie4RnZVYTUe4kZZEkPApk3gyDMqUHakU5ZQdrBk2qQBDJoBUkQBtQgwHCnFQQY7vz1BcsR36kirAqW0yhUeRQsp1Go8ihYTqNQ5VGwnEahyqNgOY1C9R4SUn1IOmIA0S9YTqdQvU1o9SQVRUhFrVC9jSfZ0YPwNqzSjfEuT3KqADlR/zT5KAnSIQ+ebuYn5+fD0/V7ISYmJubf5BFCwZ3dhu9EdwAAAABJRU5ErkJggg==' }} /></Pressable>
                <Pressable onPress={() => {sid(item.id); showPage(8)}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nO2WsUoDQRCGZwrJzAUSLcVHEBsDaXRGEATfQx9A9AUsBcFeBAtre0FEsEkaGwvBwsZCxFJbkZWNCULQ3J0Xkh2YD7Y95rv5Z3YBHMdxJk8rI9QjQn0m1FdCPWnC2izYot0glC6jhqHzkIHMg3GJYEgmVyIYkGk3GKVTQCL0z32iM1NaJBDKMaRJORlCeYF02agz6k1Bmack/n4NZKtiZw4nXfXf2wlk/38y0omX5qQrz1mxclAuZtKJ34E074miMpKyRFEZsSDRPyNmBsxI5HbGlERyMu0KEt8nA9k2L0Got01YnXOJangngsdpfHicgsdpfHicQiJxas0Q6nm1G1u6U37F/lAHXWLUT9MSAxjl0bxEJObcvESEUa+MvGJHwyhn5jpBIDpcUB1WFhnllFAuYsGEescoH8lKRBjlukhhGchyuhKwvjBYtUUKZJTL5CQiBLpXLvebNUgR+mXNJhmdPBj1fUjkszczvQVgCAbZYdS32BkC3Y0zM+2aHMdxIPIF6EJXv5Hg8/cAAAAASUVORK5CYII=' }} /></Pressable>
                { item.author_visible == true && (<Pressable onPress={() => {notshow(item.id,gJWTtoken(),sShowErr),showPage(99)}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEoklEQVR4nO1YWYhcRRQ9N8bpqu7pjHE3cQF3RAURXNp373NGBTGKuERxiYqCoBER9E/8UUcl0Yh/6r+gcUFJNNEw7vFDBaPCDBGTD/1QmQhmFJLJJEbuq3rTb6brve6ednCEd6Dg0bXce+qu1UCJEiVKlChRokSJ/wEuWGIh11iSpw3xO5Z4zBCPW+K9Ovz3mCF5W9dUEV0NNOpYGGjUK+C7LMmIJZ6yJAe7G7qHtxjwnf8JKYPBkwzJOkuyO6uYIf7Okqy1kOtqiM8eQLQUOP9QHfpdg5xjIddbkqcs8WeWeH9m/25L/KwBnzDvBPoRHWWIX7Akk7Nu93GLxrLuz4uPdKRmWGmvIXle5+aFhIHcYUh+9wL/Tl3JkLze49FkSDZ4Evvd2Yl1dxnEq/5tN9qcubXPq+AV3ir7dD60z4KvtSQfW+K//PhIk0FobQXxqT5epvzZn2Tc9T2DS07skQTfbEkmmjekQQmqQu71N/hKkATxMwUBPpyz57VkHnK/kx2vcpku2TdhIDfNgUK82AdzKvyDGoaOmSZI/G5CDvEtOZYozFYu9c6+tOh2f2Gb0t9quPjojDeoy61V3TqiMID4sMQNvM8a8GMAFs0QSvyzzlcweEoLkcSd2qbdD2fv64Oc5ud/mjW1yEAezWS4EdWxkEQVfJxPoXoz4xXIYGidK3JyELiiFpj7s4MaMtF6atzvSe4JyawgvjR1NUOyrYr42CAJDShLstML2tmH6PQ8wmnchIrY3Ik06vlzDqpTRscdLTVH2VniH7wlvsll2ySyXdeGyDbdsnCMtCrZOMNbZKy918g2f872Gbpa4i+8yb6t47Ij0AaaEvODPem32gQ7r2g5E3yb12FjO/laLFVXf97WDBHZ6q3xfTY75cGCV/tDXg3OEw8XEHkiZ896l37j+9rJVx1V1xYiWdeyxKNqvmIi8fG+sk9WEJ0cWqMpVrOTi5kkbkZClmgWRC2wPGUxtLxYdmOZul/QtTLBviNdkKfg9Hril70rvIEeYYjf8me9WLRO033mwn/MbTB9ICW+p6nOQLj4ZnzVhzw8ZxLgR7y8P4qSjEEUa3fRaULyBVHfF4llJi3kQW1LwmSSwD7gCmf3ZByJpNAdyHM7AGTBDzU7bt6yFJcPdCgiXqxvg2bjJhu1hQ+T4QccmeSm3gxV+1BMpO6U7AWvDq2rJS2Ka4d8i7IGWHkIemwaf9FWPmQdF9jTjywN2vUGcmsf4jO1YuvQb02x2vZr19x0p6AlSBtUQ/xrWiQt4pXoBRoL/p2dttVfWkQXhnO7Pro6efLylCF+KZQdq5Dz9KmQkbcp76kwJ/i2elfqDvoHgwFLK/Gh5VoLnEvwaDP98qi6qM6FUqzrpWRDxk3HtSPGfMBX1HVp0+gFflWB3L0EFx3e7XnaRVTA9xiSrzPW2mOJn+ukw+gZmr99Msj++bDPEn9qiZ+04BtqiM51ypzVB1xZ0W/9zSK60VX+5M+HaTfUeLEka9oVxHlCo65BqQ+vNIC7HLrnfZdENCksCMT97r3Nwy61JjHxW/MPuuR71M8NVyFXLSDlS5QoUaJEiRIlSiAf/wDrSxvrJB1oWAAAAABJRU5ErkJggg==' }} /></Pressable>) }
                { item.author_visible == false && (<Pressable onPress={() => {show(item.id,gJWTtoken(),sShowErr),showPage(99)}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADU0lEQVR4nO2YPYxMURTH/8eyc87IZolE4itCVKvwsYnY3Tnn+WokGpKVSCg0FBqhEYUChYJCQUlBohGiEAkJCSK7QiRWULC+giAiQVifI3ffnawV8+a9ndl5Q94/OcXM3Ln3/5tz351zLpApU6ZMmTI1hNqaGdrJsG1MdpJJbwnZEyH9IKQDTPaCSfuE9LyQ7c7DVrYimIBG0Xh0zRXSfUz2WsiKyUK/C+kFQdANtI9LBYARFIT0WnLzZeNpDsFGoLupTgBLZzLpqRoCDAsm7ctBl40qhMBWM9nb0YKQofjJpAfdc1djhGAskx6uA0BxeHasJw+dUiOItmZ3CtUbQoaiP4fC7GozwUx6NkWIoo8nOQRzRowhpEcaAKJYykwLlk9KDMGw7Q1gvjg89Hyi45lRCMI/q7SN299g9sbEaGsW0nvpG7ZyIN/yCObH2VK70jdrkcFkvQDGlIVwZ7aQfk7bqMSBQbAuIhs6Q8i+pm1S4sRgoRkhIT2QukmqFHoNAEWCTMSKViZ9lr5ZKxdf87AFiKMcCsuF7EcDmC7+GQzbGQtiaIvZnn/+D9FrDJOdbiCIe1W0xq7y1XONUTTqLFQjhq1NHQS6qCqIHIIlQvbJTcak11PYTgN+7b7x6Jg8IghXzzDpOz/RIfeewNbUp9VVd7uyT7BsGpPeLj0jibvFZhTamPSNn/jY73WNv3w4M1oQTHqbYR2l9VwmwvuwhJlxDxWTPfdfPOP69fpcB+kjRrDhb8VgYhhB51QhfeAnvuha3ejxujWc3J4z2asRmP8oZA/966NRayWCYbKb3lgv0NlSuZ8PM5dHYZX7JfPQhQzdIWTHhexq6XO/+Es3b3iRoXtzsKXueHcXC76J+yIIpieAuV7+Fya94gbE6Y0FusVD34wq4EogkXORnfAZ2l9p3RDGbvjCsVq1jxPSx+EZb6srmKwIkkfXPHcpJ2TvW1GYiHopD9vks3EnslOLCRKOG7ylLyYuCqvLhvX7RddWGh0XxFfcRXdoAIulZnbLLxhs9Pv5bqVsJAFxYrKecLvq5pqYjTamd8NsFNbHGx8fRBB0+/H3qzZa2Zhecqdb3L4gCQjQ3RQe0XoLjaZkIIOK7sXTksuekF5O20emTJnwf+gXtUTMZe0MiPsAAAAASUVORK5CYII=' }} /></Pressable>) }
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default HomeMyStory;