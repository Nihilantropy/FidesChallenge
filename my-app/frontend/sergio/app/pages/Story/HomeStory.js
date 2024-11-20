import React, {useState,useEffect} from 'react';
import { View,Text,Pressable,ScrollView,Image,Platform,TextInput } from 'react-native';
import styles from './../../assets/style/main.js';

const RaccontaPreferito = ({ setPupup,azione,gJWTtoken,sShowPopupFB,setPage,sShowErr }) => {
  if (azione === 'preferito' && gJWTtoken() === '') {
    setPage('');
    setPupup(true);
    sShowPopupFB(true);
    return;
  }

  const [stori, setStori] = useState('');
  const [disponibili, setdisponibili] = useState(1);
  async function get_story(){
    fetch("http://localhost:8000/stories/random", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const status = response.status;
      if (status == 200) {
        return response.json().then(data => {
          setStori(data);
        });
      } else if (status == 204){
        setdisponibili(0);
      } else {
        sShowErr("Scusami sono stanco");
        setPupup(true);
        setPage('');
      }
    })
    .catch(error => {
      console.log(error);
      sShowErr("Scusami sono stanco");
      setPupup(true);
      setPage('');
    });
  }
  useEffect(() => {
    get_story();
  }, []);

  const [Preferiti, setPreferiti] = useState(false);

  // Funzioni per gestire i preferiti
  const addPref = () => setPreferiti(true);
  const remPref = () => setPreferiti(false);

  // Funzioni per audio
  const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./../Suond/Web') : require('./../Suond/Mobile');
  const [statorip, setStato] = useState('unset');
  async function speakText(text,id) {
    try {
      const response = await fetch("http://localhost:8000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          language: 'it',
          id: id
        })
      });
      if (!response.ok){throw new Error(response.statusText);}
      await setupPlayer(await response.blob());
      setStato('play');
      playAudio();
    } catch (error) {
      sShowErr("Errore nella lettura");
      setStato('unset');
    }
  }
  const [Velocita, setVelocita] = useState('x1');
  return (
    <View>
      { disponibili == 0 && (
        <View style={styles.box}><Text style={styles.titoli}>Scusa non conosco nessuna storia</Text></View>
      )}
      { disponibili == 1 && (
        <View style={styles.box}>
          <View style={{ alignSelf: 'flex-start' }}>
            {Preferiti == false && (<Pressable onPress={() => addPref()} style={styles.cleseimg}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD40lEQVR4nO2ZWYhcVRCG/8pg96nbkxmDS6K4oWggxgdNHMxMVx0mjhAXfNFRBNEIEnBBBIWACoovPovgKKJCMOLyIvoUEEFRUJ+CJhO3uL0Yl7iho4MmkepbN91KyNw73Z2+I/eDA5ee+9epOvcsdWqAioqKioqKiqKsOy5B3BRIZwLpzkCyj0nnmeQLJn0zQB+sQc9dyIq9w5CHmOQt186brdCyqTPWh/WFPkCMOM0knzDpoYVaIH2tjnjWf43Yb/a3PDaY9GNG89oexnAJM8n2dgcyG6D3M+L6BjautCAb2HByHToZSJ9g0l/9vd8C5OZ2ELKZSX93O7/Yu6YxbWpj40qGXhwgDzDJno6AngNi6EEQ+k46yvKTOQNMDx1dM77cAzInDjLkjlaz5/RrzQBx+Og2pofqiLcEkp/dztvmy2KjICZ9wUf3sxqa5xUR+1T8ywM42HqGXFPERg3jq5l0r/vwvPlUOIqAeIOP4I9Fg8hIILceniLQ2xdjo4bx1eZDyxfodQXla2rZSAToTegCJnnaWjc26un6sgHZa77lFiZoXuXr4kMAy7pxAhgbSVtXLGPS3eZTArkyt4pJnvGvsRUlIUDv86n+VH4RyQce/UUoCYy43gPZmVsUSH4w0XJcegJKwjDiiT7dv88tStMOPVRoYfWdNTVf8PO5JYH0OxMNo3kSSkLDTv70i+zLLWrvEHohSkKC5rqOnTQfWW6VQLegJDDibX7Cbysg0rtc9CJKQiB9Oc0Q5M7cIku3PUeasyQQA2YFpkaZ5A8mPRAgpxcSp5ceOxTlXgyYAN3qM+SNwmKGXu0H0LeD/SpjI9kumkCvWIwFCiTvezCPYUAEksfdh3e7TAtad4oDdcQpHGMS6OXWt/nQ9VHApI9kqcGR7uH9oo7m2YF0v5/mD/fA5PQQk+7wxfZlwOSZ6DOMeFr7ZqivL3y9zomlKq2qRmr4owRxFfpEAjmlXa2RPT1PXO1LMOnXHszugIkzetrB4T5k1vv4qvCZUbCjT7M1EyDaO9u6IZB840F8XsfkOegnjPFTs23ZTtuA5o3d2rT6F5P86dvseza9cGzYVGfSZzuKdtuAyxrF7cQQSB7tsLO9m/rVognQe5jkbx/JXQ3EtXm1DegF2XXBa153Y5AENCe8EG2jOmdVxQUKaWQZrCeBrfVg6wPlYGwkkDzZUa/dcaR5btv4v4vY8tIo4vEoGwFyfVa4sCtpZ5Jnz/5viNaOZyVVlJkEcVUgeTUrYlvCaa2jiP2KV/GXBgl0S2vNtKfbnNWCsRRpIK5NT2qZbWDifCxlVmBq1Nqg/aioqMD/g38ASTNHzd9wRuAAAAAASUVORK5CYII=' }} /></Pressable>)}
            {Preferiti == true && (<Pressable onPress={() => remPref()} style={styles.cleseimg}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACX0lEQVR4nO2YPWhUQRDH/yN6t/NeVCIqWAi2Rk2TJsY38xqFqGBnGnsRbEQEe22srVSwTBS0slMSEPxoBBONERQRLASVYGfkAuZkvROOy4dv37ewP/g3x7vZ+d/Mu90dwOPxeDwejysjWwLocUN6w5C+MiRfmLTFpJ+Y5AmTXgkRH/xXFPuMfZZJn3a+qy0by5DO2dgB4nG7FgqADHSCSd4zaTuBphvQ/f1BGoiGmHQmYYx3jPi0XTsnD6PMpHcSLt6rZYZc+BvFQC/++cw5jkzaHHIwIc9TmOiVbaGrGWM8y2KGmGQqYwK5yZDeS9VmBnKm6uS53wx0wtHGUINJP1adOK+SfLC5JbbB0FPVJ61rKoCcTG6E5HbVCfN67UVyK7ERQzJfXyM652JkscZGvjm0VpqNqzQtO1REv9e3IrLoUpGFGhuZdzFyt+qEeV3JVHIjkPPVJ6xrC3IusZEm4n1MulJ50rRKvwxkb2Ij3faarkHi7T49hCsB9EQNEm/3qnNzTEH3KtquiR4jLSH0UE02x1aIIweQBQO9XLURA7mEHKCUd/Z8TJDez3EAcSw0JLPlm5BZYCRAnoQ4vNuQvC7PiLwNIHtQBNsRDRqSF2VUYgDxThTJNozusH+FBRqZsT8YyiHebEiuF1CJm0WNSjfEHuCYdCkHE0sB9CyqxM54DcnL9FXQNyGiYdSD8SaTXLOnUwcTK51WyjzXzZ8m4qOG9HOCKnx1mk9VwQCiXYbkwQb7w6PC9ocCIPvyMumPHgM/7bkNwCb8b4SIhruDjIUavdBpGdvakcfj8SA7vwHNDRbVQ8VFFgAAAABJRU5ErkJggg==' }} /></Pressable>)}
          </View>
          <Text style={styles.titoli}>{stori.title}</Text>
          <Text>{"\n"}</Text>
          <Text style={[styles.testi, styles.sinistra]}>{stori.content}</Text>
          { stori.author_visible == true && (<View style={{ alignSelf: 'flex-end' }}><Text style={styles.testi}>Storia by {stori.author_name}</Text></View>) }
          <Text>{"\n\n"}</Text>
          <Pressable style={styles.bottoni} onPress={() => {pauseAudio(),setStato('unset'),get_story()}}><Text style={styles.testi}>Raccontami un'altra storia</Text></Pressable>
          <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
            {statorip == 'unset' && (<Pressable style={styles.testi} onPress={() => speakText(stori.content,stori.id)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
            {statorip == 'play' && (
              <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
                <Pressable style={styles.testi} onPress={() => {pauseAudio(),setStato('pause')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3SoRHAMAwEQRmmqfTflUO+AIN30O6MoIBGNwMAP3rWu0/m1n6NQ8JH2qQV0mqTVkirTVohrTZphbTapBXSapNWSKtNWiGtNmmFtNqkFdJqk1ZICwDmng90pWTGMlhjngAAAABJRU5ErkJggg==' }} /></Pressable>
                {Velocita == 'x1' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(1.5),setVelocita('x1.5')}}><Text style={styles.testi}>x1</Text></Pressable>)}
                {Velocita == 'x1.5' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(2),setVelocita('x2')}}><Text style={styles.testi}>x1.5</Text></Pressable>)}
                {Velocita == 'x2' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(0.5),setVelocita('x0.5')}}><Text style={styles.testi}>x2</Text></Pressable>)}
                {Velocita == 'x0.5' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(1),setVelocita('x1')}}><Text style={styles.testi}>x0.5</Text></Pressable>)}
              </View>
            )}
            {statorip == 'pause' && (<Pressable style={styles.testi} onPress={() => {playAudio(),setStato('play')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
          </View>
        </View>
      )}
    </View>
  );
};

const Inventa = ({ sShowErr }) => {
  const [prompt, setprompt] = useState('');
  const [Storia, setStoria] = useState('');
  const [height, setHeight] = useState(50);
  const handleTextChange = (text) => {
    if (text.length <= 1000) {
      setprompt(text);
    }
  };
  const handleContentSizeChange = (e) => {
    const newHeight = e.nativeEvent.contentSize.height;
    if (prompt.length > 0 && newHeight > 50) {
      setHeight(newHeight);
    } else if (prompt.length === 0) {
      setHeight(50);
    }
  };
  async function inventa_func() {
    if (prompt == ''){
      sShowErr("La richiesta non puo essere vuota");
      return;
    }
    if (prompt.length > 1000) {
      sShowErr("La richiesta non puo avere piu di 1000 caratteri");
      return;
    }
    fetch("http://localhost:8000/generatestory", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt
      }),
    })
    .then(response => {
      const status = response.status;
      return response.json().then(data => ({ status, data }));
    })
    .then(({ status, data }) => {
      if (status !== 200) setErrorText(data.message);
      else setStoria(data.story);
    })
    .catch(error => {
      console.log(error);
      sShowErr("Scusa ma sono stanco");
    });
  }

  // Funzioni per audio
  const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./../Suond/Web') : require('./../Suond/Mobile');
  const [statorip, setStato] = useState('unset');
  async function speakText(text) {
    try {
      const response = await fetch("http://localhost:8000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, language: 'it' })
      });
      if (!response.ok){throw new Error(response.statusText);}
      await setupPlayer(await response.blob());
      setStato('play');
      playAudio();
    } catch (error) {
      sShowErr("Errore nella lettura");
      setStato('unset');
    }
  }
  const [Velocita, setVelocita] = useState('x1');
  return (
    <View style={styles.box}>
      {Storia == '' && (
        <View style={[{width: '80%'}]}>
          <Text style={[styles.titoli, {alignSelf: 'center'}]}>Dimmi come vorresti la storia</Text>
          <Text>{"\n"}{"\n"}</Text>
          <View style={styles.rowpuro}>
            <View style={[{width: '80%'}]}>
              <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} value={prompt} style={[styles.textarea, { minHeight: 50, height: height, width: '100%' }]} placeholder="Scrivi qui la tua richiesta" onChangeText={handleTextChange} />
              <Text style={styles.testidestra}>{prompt.length}/1000</Text>
            </View>
            <Text>    </Text>
            <Pressable onPress={inventa_func}><Image style={styles.foto3} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABRUlEQVR4nO2Zz0oDMRDGv7nUzPZFRDzpQZBMFrxq8aGk4EvV+jT+OVZ7jwQU64q62bWdpMwH33Ez88uXycIuYDKZTKYSxZBrpnDPJGumEHdrWTPJkhFm4yBIbnfffPgJaj4miViSG/irAWmk46TfPH9N5W4AiLzqNx66fhmSSCzRMBDST4EtEdiMRDtaZDPyu7RvJ7ZbqyPtnWdLpCPtnecaE3GQ883aDq2vFKT1fetDG8SRPDWQk7T7fY4OlwiSICbwR2ndBv60ShBH4XmK9jitOUF76Cg8VAfivkHI41/PoEQQhj/LLrxPIA5BigLJnQ/uYRWQbcBACyT3+uWSQT5g0svwAHJRNQj/k7Enn0xXQ0CWBTQeO17kgyDMCmg8brqBXGaDvKcy126eP32DMUo/V9J/CZ2ZkVRzMTgJk8lkMmHLegMyNGo5jgUOwwAAAABJRU5ErkJggg==' }} /></Pressable>
          </View>
        </View>
      )}
      {Storia != '' && (
        <View style={[{width: '80%'}]}>
          <Text style={[styles.titoli, {alignSelf: 'center'}]}>Ecco la tua storia...</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.testi}>{Storia}</Text>
          <Text>{"\n"}{"\n"}</Text>
          <Pressable style={styles.bottoni} onPress={() => {pauseAudio(),setStato('unset'),setStoria('')}}><Text style={styles.testi}>Voglio un'altra storia</Text></Pressable>
          <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
            {statorip == 'unset' && (<Pressable style={styles.testi} onPress={() => speakText(stori.content)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
            {statorip == 'play' && (<Pressable style={styles.testi} onPress={() => {pauseAudio(),setStato('pause')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3SoRHAMAwEQRmmqfTflUO+AIN30O6MoIBGNwMAP3rWu0/m1n6NQ8JH2qQV0mqTVkirTVohrTZphbTapBXSapNWSKtNWiGtNmmFtNqkFdJqk1ZICwDmng90pWTGMlhjngAAAABJRU5ErkJggg==' }} /></Pressable>)}
            {statorip == 'pause' && (<Pressable style={styles.testi} onPress={() => {playAudio(),setStato('play')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
            <Text>        </Text>
            {Velocita == 'x1' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(1.5),setVelocita('x1.5')}}><Text style={styles.testi}>x1</Text></Pressable>)}
            {Velocita == 'x1.5' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(2),setVelocita('x2')}}><Text style={styles.testi}>x1.5</Text></Pressable>)}
            {Velocita == 'x2' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(0.5),setVelocita('x0.5')}}><Text style={styles.testi}>x2</Text></Pressable>)}
            {Velocita == 'x0.5' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(1),setVelocita('x1')}}><Text style={styles.testi}>x0.5</Text></Pressable>)}
          </View>
        </View>
      )}
    </View>
  );
};

const HomeStory = ({ showPage, gJWTtoken,sShowPopupFB,gShowPopupErr,sShowErr }) => {
  const [Page, setPage] = useState('');
  const [Pupup, setPupup] = useState(true);

  return (
    <View style={styles.stacca}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.col1}>
            {Pupup == false && (<View style={{alignSelf: 'flex-start', marginLeft: 50, marginTop: 30}}><Pressable style={styles.bottoni} onPress={() => setPupup(true)}><Text style={styles.testi}> = </Text></Pressable></View>)}
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
          </View>
          <View style={styles.col2}>
            {Page == 'Racconta' && <RaccontaPreferito azione='racconta' sShowErr={sShowErr} setPupup={setPupup} gJWTtoken={gJWTtoken} sShowPopupFB={sShowPopupFB} setPage={setPage} /> }
            {Page == 'Preferiti' && <RaccontaPreferito azione='preferito' sShowErr={sShowErr} setPupup={setPupup} gJWTtoken={gJWTtoken} sShowPopupFB={sShowPopupFB} setPage={setPage} /> }
            {Page == 'Inventa' && <Inventa sShowErr={sShowErr} /> }
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeStory;