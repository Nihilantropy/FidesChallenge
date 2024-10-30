import React, {useState,useEffect} from 'react';
import { View,Text,Pressable,ScrollView,Image,Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const RaccontaPreferito = ({ setPupup, azione, gWVTtoken, sShowPopupFB, setPage, sShowErr }) => {
  useEffect(() => {
    if (azione === 'preferito' && gWVTtoken() === '') {
      setPage('');
      setPupup(true);
      sShowPopupFB(true);
    }
  }, [azione, gWVTtoken, setPage, sShowPopupFB]);

  // Dati temporanei per le storie
  const jsonData = [
    { id: 1, titolo: "Parasati in Love", storia: "Una storia d'amore tormentata tra due persone con passati difficili che cercano redenzione attraverso il loro legame." },
    { id: 2, titolo: "Voglio mangiare il tuo pancreas", storia: "La toccante amicizia tra un ragazzo introverso e una ragazza malata terminale, che vive intensamente i suoi ultimi giorni, trasformando la vita di entrambi." },
    { id: 3, titolo: "Darling in the FranxX", storia: "È ambientato in un futuro distopico, dove giovani piloti, tra cui Hiro e Zero Two, combattono contro mostri giganti chiamati Klaxosauri utilizzando mecha noti come FranXX." }
  ];

  const [stori, setStori] = useState(() => jsonData[Math.floor(Math.random() * jsonData.length)]);
  const [Preferiti, setPreferiti] = useState(false);

  // Funzioni per gestire i preferiti
  const addPref = () => setPreferiti(true);
  const remPref = () => setPreferiti(false);

  // Funzioni per audio
  const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./../Suond/Web') : require('./../Suond/Mobile');
  async function speakText(text) {
    try {
      const response = await fetch("http://192.168.1.20:5000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, language: 'it' })
      });
      if (!response.ok){throw new Error(response.statusText);}
      await setupPlayer(await response.blob());
      playAudio();
    } catch (error) {
      sShowErr("Errore nella lettura"+error);
    }
  }

  return (
    <View style={styles.box}>
      <View style={{ alignSelf: 'flex-start' }}>
        {Preferiti == false && (<Pressable onPress={() => addPref()} style={styles.cleseimg}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD40lEQVR4nO2ZWYhcVRCG/8pg96nbkxmDS6K4oWggxgdNHMxMVx0mjhAXfNFRBNEIEnBBBIWACoovPovgKKJCMOLyIvoUEEFRUJ+CJhO3uL0Yl7iho4MmkepbN91KyNw73Z2+I/eDA5ee+9epOvcsdWqAioqKioqKiqKsOy5B3BRIZwLpzkCyj0nnmeQLJn0zQB+sQc9dyIq9w5CHmOQt186brdCyqTPWh/WFPkCMOM0knzDpoYVaIH2tjnjWf43Yb/a3PDaY9GNG89oexnAJM8n2dgcyG6D3M+L6BjautCAb2HByHToZSJ9g0l/9vd8C5OZ2ELKZSX93O7/Yu6YxbWpj40qGXhwgDzDJno6AngNi6EEQ+k46yvKTOQNMDx1dM77cAzInDjLkjlaz5/RrzQBx+Og2pofqiLcEkp/dztvmy2KjICZ9wUf3sxqa5xUR+1T8ywM42HqGXFPERg3jq5l0r/vwvPlUOIqAeIOP4I9Fg8hIILceniLQ2xdjo4bx1eZDyxfodQXla2rZSAToTegCJnnaWjc26un6sgHZa77lFiZoXuXr4kMAy7pxAhgbSVtXLGPS3eZTArkyt4pJnvGvsRUlIUDv86n+VH4RyQce/UUoCYy43gPZmVsUSH4w0XJcegJKwjDiiT7dv88tStMOPVRoYfWdNTVf8PO5JYH0OxMNo3kSSkLDTv70i+zLLWrvEHohSkKC5rqOnTQfWW6VQLegJDDibX7Cbysg0rtc9CJKQiB9Oc0Q5M7cIku3PUeasyQQA2YFpkaZ5A8mPRAgpxcSp5ceOxTlXgyYAN3qM+SNwmKGXu0H0LeD/SpjI9kumkCvWIwFCiTvezCPYUAEksfdh3e7TAtad4oDdcQpHGMS6OXWt/nQ9VHApI9kqcGR7uH9oo7m2YF0v5/mD/fA5PQQk+7wxfZlwOSZ6DOMeFr7ZqivL3y9zomlKq2qRmr4owRxFfpEAjmlXa2RPT1PXO1LMOnXHszugIkzetrB4T5k1vv4qvCZUbCjT7M1EyDaO9u6IZB840F8XsfkOegnjPFTs23ZTtuA5o3d2rT6F5P86dvseza9cGzYVGfSZzuKdtuAyxrF7cQQSB7tsLO9m/rVognQe5jkbx/JXQ3EtXm1DegF2XXBa153Y5AENCe8EG2jOmdVxQUKaWQZrCeBrfVg6wPlYGwkkDzZUa/dcaR5btv4v4vY8tIo4vEoGwFyfVa4sCtpZ5Jnz/5viNaOZyVVlJkEcVUgeTUrYlvCaa2jiP2KV/GXBgl0S2vNtKfbnNWCsRRpIK5NT2qZbWDifCxlVmBq1Nqg/aioqMD/g38ASTNHzd9wRuAAAAAASUVORK5CYII=' }} /></Pressable>)}
        {Preferiti == true && (<Pressable onPress={() => remPref()} style={styles.cleseimg}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACX0lEQVR4nO2YPWhUQRDH/yN6t/NeVCIqWAi2Rk2TJsY38xqFqGBnGnsRbEQEe22srVSwTBS0slMSEPxoBBONERQRLASVYGfkAuZkvROOy4dv37ewP/g3x7vZ+d/Mu90dwOPxeDwejysjWwLocUN6w5C+MiRfmLTFpJ+Y5AmTXgkRH/xXFPuMfZZJn3a+qy0by5DO2dgB4nG7FgqADHSCSd4zaTuBphvQ/f1BGoiGmHQmYYx3jPi0XTsnD6PMpHcSLt6rZYZc+BvFQC/++cw5jkzaHHIwIc9TmOiVbaGrGWM8y2KGmGQqYwK5yZDeS9VmBnKm6uS53wx0wtHGUINJP1adOK+SfLC5JbbB0FPVJ61rKoCcTG6E5HbVCfN67UVyK7ERQzJfXyM652JkscZGvjm0VpqNqzQtO1REv9e3IrLoUpGFGhuZdzFyt+qEeV3JVHIjkPPVJ6xrC3IusZEm4n1MulJ50rRKvwxkb2Ij3faarkHi7T49hCsB9EQNEm/3qnNzTEH3KtquiR4jLSH0UE02x1aIIweQBQO9XLURA7mEHKCUd/Z8TJDez3EAcSw0JLPlm5BZYCRAnoQ4vNuQvC7PiLwNIHtQBNsRDRqSF2VUYgDxThTJNozusH+FBRqZsT8YyiHebEiuF1CJm0WNSjfEHuCYdCkHE0sB9CyqxM54DcnL9FXQNyGiYdSD8SaTXLOnUwcTK51WyjzXzZ8m4qOG9HOCKnx1mk9VwQCiXYbkwQb7w6PC9ocCIPvyMumPHgM/7bkNwCb8b4SIhruDjIUavdBpGdvakcfj8SA7vwHNDRbVQ8VFFgAAAABJRU5ErkJggg==' }} /></Pressable>)}
      </View>
      <Text style={styles.titoli}>{stori.titolo}</Text>
      <Text>{"\n"}</Text>
      <Text style={styles.testi}>{stori.storia}</Text>
      <Text>{"\n\n"}</Text>
      <Pressable style={styles.bottoni} onPress={() => setStori(jsonData[Math.floor(Math.random() * jsonData.length)])}><Text style={styles.testi}>Raccontami un'altra storia</Text></Pressable>
      <Pressable style={styles.testi} onPress={() => speakText(stori.storia)}><Text style={styles.testi}>Ascolta la storia</Text></Pressable>
      <Pressable style={styles.testi} onPress={() => pauseAudio()}><Text style={styles.testi}>Pausa</Text></Pressable>
      <Pressable style={styles.testi} onPress={() => playAudio()}><Text style={styles.testi}>avvia</Text></Pressable>
      <Pressable style={styles.testi} onPress={() => setPlaybackRate(2)}><Text style={styles.testi}>x2</Text></Pressable>
      <Pressable style={styles.testi} onPress={() => setPlaybackRate(0.5)}><Text style={styles.testi}>x0.5</Text></Pressable>
      <Pressable style={styles.testi} onPress={() => setPlaybackRate(1)}><Text style={styles.testi}>x1</Text></Pressable>
    </View>
  );
};

const Inventa = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.testidestra}>Inventa</Text>
    </View>
  );
};

const HomeStory = ({ showPage, gWVTtoken,sShowPopupFB,gShowPopupErr,sShowErr }) => {
  const [Page, setPage] = useState('Racconta');
  const [Pupup, setPupup] = useState(true);
  return (
    <View style={styles.stacca}>
      <ScrollView>
        {Pupup == false && (<View style={{alignSelf: 'flex-start', marginLeft: 50}}><Pressable style={styles.bottoni} onPress={() => setPupup(true)}><Text style={styles.testi}> = </Text></Pressable></View>)}
        {Pupup == true && Page == '' && (
          <View style={styles.box3}>
            <Text style={styles.titoli}>Cosa vuoi che faccia?</Text>
            <View style={{alignSelf: 'flex-start'}}>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Racconta'), setPupup(false)}}><Text style={styles.testi}>Raccontami una storia</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Preferiti'), setPupup(false)}}><Text style={styles.testi}>Raccontami una delle mie preferite</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Inventa'), setPupup(false)}}><Text style={styles.testi}>Inventane una nuova</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {showPage(3), setPupup(false)}}><Text style={styles.testi}>Ti racconti io una storia</Text></Pressable>
            </View>
          </View>
        )}
        {Pupup == true && Page != '' && (
          <View style={styles.box3}>
            <View style={[styles.rowpuro,{alignSelf: 'flex-start'}]}>
              <Pressable onPress={() => setPupup(false)}><Text style={styles.titoli}> X</Text></Pressable>
              <Text style={styles.titoli}>      Cosa vuoi che faccia?</Text>
            </View>
            <View style={{alignSelf: 'flex-start'}}>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Racconta'), setPupup(false)}}><Text style={styles.testi}>Raccontami una storia</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Preferiti'), setPupup(false)}}><Text style={styles.testi}>Raccontami una delle mie preferite</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Inventa'), setPupup(false)}}><Text style={styles.testi}>Inventane una nuova</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {showPage(3), setPupup(false)}}><Text style={styles.testi}>Ti racconti io una storia</Text></Pressable>
            </View>
          </View>
        )}
        {Page == 'Racconta' && <RaccontaPreferito azione='racconta' sShowErr={sShowErr} setPupup={setPupup} gWVTtoken={gWVTtoken} sShowPopupFB={sShowPopupFB} setPage={setPage} /> }
        {Page == 'Preferiti' && <RaccontaPreferito azione='preferito' sShowErr={sShowErr} setPupup={setPupup} gWVTtoken={gWVTtoken} sShowPopupFB={sShowPopupFB} setPage={setPage} /> }
        {Page == 'Inventa' && <Inventa /> }
      </ScrollView>
    </View>
  );
};
export default HomeStory;