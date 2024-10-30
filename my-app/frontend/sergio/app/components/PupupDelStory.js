import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from './../assets/style/main.js';

const PupupDelStory = ({ sShowPopupES,sShowErr,gid }) => {
  function elimina() {
    fetch("http://localhost:3000/story/delete", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: gid()
        }),
    })
    .then(result => {
        if (!result) return;
        const { status, body } = result;
        if (status != 200) {
          sShowPopupES(false);
          sShowErr("Errore interno");
        }else {
          sShowPopupES(false);
        }
    })
    .catch(error => {
      sShowPopupES(false);
      sShowErr("Errore interno");
    });
  }
  return (
    <View style={styles.fondonero}>
      <View style={styles.popup}>
        <View style={styles.row}>
          <Pressable onPress={() => sShowPopupES(false)} style={styles.cleseimg}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFcUlEQVR4nO1aSYgdRRj+yozTVd0vM44m6k0FLyZxgUCYZN5fjTGj45ZEIYgbeIgYcUlcLiKJORs9KAZEPAQ8CB4VEQ1GBZVsRkXIzGQMitEcJApxGTPEGPm7ql7XMG/r5b03Sn5oaF5V11/Lv3z/Vw84J/9TGcDwhQrV9UroHVLQu0roCSn0r0roGX7MO43bth0KtG4Q1SHMD4mlRHy/EvSBEvqMEvpstof+VkK/L1G9DxgLerCAYSWhn5JCH/cmdUoJ2iNBW/lk+qGvMju+/Hx++J1/4zYJvU0J+sh8Y76XQv8koZ/kzenKEkLQrUroo+kE6EAI2jiENYNZxxpEfEGI+EEp9EFvQ74NoW9G5ySWUuhXvR38IgDdWNboIeIxKehLb4N2ln46IeJLeeJWyZ8K1ceADQtQumxYoKA3K6Gn3WlHWH1JKUMHoCv4uO2xj0eIl6HDEqF6jRJ60uqc4jkUGrCC6mI3oBS0v4J4Ebokg6gOKaE/tVZwlK2iiE9Yc6LPgdEIXZfRSAq915lZLp9JHZvGOdmhR7IQN1zkWcXOPCE2cexu+ESbPjPNc+Lo1uZnw6qWJ5LoND9EgbY452/LxCToaZcnOhNi80rcJ4X+ymwwbWnReSxgqMCdA+jRdlUwAPQy83dAXGnjm0c83LWrHT0h9C12k483PRUGb2mEyCZK6De9xbzYrG+A+HIl6Hfb/weGKm2qES6SSuh7mkyGdhuHoo1ZF8KTkYJ+tJM7I0GrGk2GEa/t908IuimLHgV6yG72e43riQRW06k8ANAo0Ws9rPQNsKS/zkQ2eX1ezpkoZ5Sg03XnqaDvsAo+zLOI2jhC76pNFPo5v03i+suU0L+5/MQRMqeOT4zT69vrNNILRjltLbAOZ2LH7GJmIowstU3CmS7vpgKtyKtDgbbb8Z+f02hLUF7lWhSUAPEatn8bYfYZVGts24bP7UXGV9Z6pKC35zYKOsKNXMWhBJGCXvNql1eU0Cft+0FTNeaXCCNL7dgTdRTrX7ixPFw1GqXwPy2Hy4A8FcSL7Kb8PKfRsh1n60WavMIlq78QRg3ljDwWuI3pykJcAPGe1zu+EFmyaUnolZbumUUBMcwoOnbFFHyNTKtMZ18epqUq1/gcZQz1w9m/KDEXNXd2F35pXREldqyX0lBrSgEJesY7mTeKjK+g72wWfm1C1NuKKJEg7bGOHwM4L4XhtN9b4PqOJERleFt2oD0FQ+6UHeePAPGVfmvCNAr6y9l3hJUXF4EoIaq3NQBjBjRmgNWzhGvqdMfjh+v2gX7WyytvZdUxkIBbAxqBFQN1Ozl4zTRmVgUBaLWDJRZ4ivo9Z5uYBN2VRY+y6Jl9umEnCbo3hRFZZNVCJeh7O7mTjHKb9Y6gr3Z5Swo6kYGzElLQIbMB8d2tuKyk1M1S8ASgBwyypd28Ge18o0CPum8Uqk9kYXekoGMtryGY2redD81D8uFri9Afb+cDWQN70JsxT0TaDeZE2/alkAf2ppkc6/gsW84nvs6F7cxXGV4onWTaEj2SSoKrTG7KU+Nbx6cDNort7Q2JHVe4wkwrzZz3jBZlTqTXCtXF6JIMmMT3mbuOK3zhYy96LOzQkyFGrkV3fGLKLuIIE3qlDMy74cwsYcUT7jXuQ+kS95noVMNj+/LisVY+U8NSTCiXePsqONlJlydqjt3Bu3e+n/BMLWHtmerJUyyZf0vQJgc7VM2UyrstbiGxZPPyuN6EjGN4zewiV4RcxZmwzRzAkn5+ZwaFi6Kkj4HiCd5ysEMlGbsn/4AYC5gVZ0K5Xn3e+qHTjGINAOzJAuYKE8rMxXLVJoV+x/6B5kT6pxp+p8NcnnIfw9s2qCfOCf778i+sCi0lW92KTwAAAABJRU5ErkJggg==' }} /></Pressable>
          <View><Text style={styles.testi}>Confermi di voler far dimenticare questa storia a Sergio?</Text></View>
        </View>
        <View style={[styles.rowpuro, {justifyContent: 'space-between'}]}>
          <Pressable onPress={() => { sShowPopupES(false); }}><Text style={styles.link}>Annulla</Text></Pressable>
          <Pressable onPress={() => { elimina(); }}><Text style={styles.link}>Dimentica</Text></Pressable>
        </View>
      </View>
    </View>
  );
};
export default PupupDelStory;