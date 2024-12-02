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
    const api_url = process.env.EXPO_PUBLIC_URL_STORIES+ "random";
    fetch(api_url, {
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
        sShowErr("Scusami sono stanco 🥱"+status);
        setPupup(true);
        setPage('');
      }
    })
    .catch(error => {
      sShowErr("Scusami sono stanco 🥱"+error);
      setPupup(true);
      setPage('');
    });
  }
  useEffect(() => {
    get_story();
  }, []);

  const [Preferiti, setPreferiti] = useState(false);

  // Funzioni per audio
  const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./../../libreri/Suond/Web') : require('./../../libreri/Suond/Mobile');
  const [statorip, setStato] = useState('unset');
  async function speakText(text,id,mod) {
    try {
      const api_url = process.env.EXPO_PUBLIC_URL_TTS + "speak";
      const response = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          modify: mod,
          language: 'it',
          id: id
        })
      });
      if (!response.ok){throw new Error(response.statusText);}
      await setupPlayer(await response.blob(), setStato);
      setStato('play');
      playAudio();
    } catch (error) {
      console.log(error);
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
          <Text style={styles.titoli}>{stori.title}</Text>
          <Text>{"\n"}</Text>
          <Text style={[styles.testi, styles.sinistra]}>{stori.content}</Text>
          { stori.author_visible == true && (<View style={{ alignSelf: 'flex-end' }}><Text style={styles.testi}>Storia by {stori.author_name}</Text></View>) }
          <Text>{"\n\n"}</Text>
          <Pressable style={styles.bottoni} onPress={() => {pauseAudio(),setStato('unset'),get_story(),setVelocita('x1')}}><Text style={styles.testi}>Raccontami un'altra storia</Text></Pressable>
          <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
            {statorip == 'unset' && (<Pressable style={styles.testi} onPress={() => speakText(stori.content,stori.id,stori.updated_at)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
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
  const [genera, setgenera] = useState(1);
  const [Storia, setStoria] = useState('');
  const [height, setHeight] = useState(50);
  const handleTextChange = (text) => {
    if (text.length <= 150) {
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
  async function inventa_func(prompt2) {
    if (prompt2 == ''){
      sShowErr("La richiesta non puo essere vuota");
      return;
    }
    if (prompt2.length > 150) {
      sShowErr("La richiesta non puo avere piu di 150 caratteri");
      return;
    }
    setgenera(2);
    const api_url = process.env.EXPO_PUBLIC_URL_AI + "generatestory";
    fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt2
      }),
    })
    .then(response => {
      const status = response.status;
      return response.json().then(data => ({ status, data }));
    })
    .then(({ status, data }) => {
      if (status !== 200){
        sShowErr("Scusa sono stanco 🥱");
        setgenera(1);
        console.log(data.error);
      }else{
        setStoria(data.story);
        setgenera(3);
      }
    })
    .catch(error => {
      setgenera(1);
      sShowErr("Scusa sono stanco 🥱");
    });
  }

  // Funzioni per audio
  const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./../../libreri/Suond/Web') : require('./../../libreri/Suond/Mobile');
  const [statorip, setStato] = useState('unset');
  async function speakText(text,id) {
    try {
      const api_url = process.env.EXPO_PUBLIC_URL_TTS + "speak";
      const response = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          language: 'it',
          id: id
        })
      });
      if (!response.ok){throw new Error(response.statusText);}
      await setupPlayer(await response.blob(), setStato);
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
      {Storia == '' && genera==1 && (
        <View style={[{width: '80%',justifyContent: 'center',alignItems: 'center',alignSelf: 'center'}]}>
          <Text style={[styles.titoli, {alignSelf: 'center'}]}>Dimmi come vorresti la storia</Text>
          <Text>{"\n"}</Text>
          <View style={[styles.rowpuro, {width: '100%'}]}>
            <View style={{width: '100%'}}>
              <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} value={prompt} style={[styles.textarea, { minHeight: 50, height: height, width: '100%' }]} placeholder="Scrivi qui la tua richiesta" onChangeText={handleTextChange} />
              <Text style={styles.testidestra}>{prompt.length}/150</Text>
            </View>
            <Text>    </Text>
            <Pressable onPress={() => inventa_func(prompt)}><Image style={styles.foto3} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABRUlEQVR4nO2Zz0oDMRDGv7nUzPZFRDzpQZBMFrxq8aGk4EvV+jT+OVZ7jwQU64q62bWdpMwH33Ez88uXycIuYDKZTKYSxZBrpnDPJGumEHdrWTPJkhFm4yBIbnfffPgJaj4miViSG/irAWmk46TfPH9N5W4AiLzqNx66fhmSSCzRMBDST4EtEdiMRDtaZDPyu7RvJ7ZbqyPtnWdLpCPtnecaE3GQ883aDq2vFKT1fetDG8SRPDWQk7T7fY4OlwiSICbwR2ndBv60ShBH4XmK9jitOUF76Cg8VAfivkHI41/PoEQQhj/LLrxPIA5BigLJnQ/uYRWQbcBACyT3+uWSQT5g0svwAHJRNQj/k7Enn0xXQ0CWBTQeO17kgyDMCmg8brqBXGaDvKcy126eP32DMUo/V9J/CZ2ZkVRzMTgJk8lkMmHLegMyNGo5jgUOwwAAAABJRU5ErkJggg==' }} /></Pressable>
          </View>
        </View>
      )}
      {Storia == '' && genera==2 && (
        <View style={[{width: '100%',justifyContent: 'center',alignItems: 'center',alignSelf: 'center'}]}>
          <Text style={[styles.titoli, {alignSelf: 'center'}]}>Un attimo, sto pensando alla tua storia 🤔</Text>
          <Text>{"\n"}{"\n"}</Text>
        </View>
      )}
      {Storia != '' && genera==3 && (
        <View style={[{width: '100%',justifyContent: 'center',alignItems: 'center',alignSelf: 'center'}]}>
          <Text style={[styles.titoli, {alignSelf: 'center'}]}>Ecco la tua storia...</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.testi}>{Storia}</Text>
          <Text>{"\n"}{"\n"}</Text>
          <Pressable style={styles.bottoni} onPress={() => {pauseAudio(),setStato('unset'),setStoria(''),setgenera(1);}}><Text style={styles.testi}>Voglio un'altra storia</Text></Pressable>
          <Text>{"\n"}</Text>
          <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
            {statorip == 'unset' && (<Pressable style={styles.testi} onPress={() => speakText(Storia,-1)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
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

const LastStory = ({ showPage,sid }) => {
  const [storie, setStorie] = useState([{}]);
  const [disponibili, setdisponibili] = useState(1);

  async function get_story(){
    const api_url = process.env.EXPO_PUBLIC_URL_STORIES+ "latest";
    fetch(api_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const status = response.status;
      if (status == 200) {
        return response.json().then(data => {
          setStorie(data);
        });
      } else if (status == 204) {
        setdisponibili(0);
      } else {
        setdisponibili(2);
      }
    })
    .catch(error => {
      setdisponibili(2);
    });
  }
  useEffect(() => {
    get_story();
  }, []);
  return (
    <View>
      { disponibili == 0 && (
        <View style={styles.box}>
          <Text style={styles.titoli}>Ecco le ultime storie che ho sentito</Text>
          <Text style={styles.testi}>Scusa non conosco nessuna storia</Text>
        </View>
      )}
      <Text>{"\n"}</Text>
      { disponibili == 1 && (
        <View style={styles.box}>
          <Text style={styles.titoli}>Ecco le ultime storie che ho sentito</Text>
          <Text>{"\n"}</Text>
          {storie.map((item, index) => (
            <View key={index}>
              <Pressable onPress={() => {sid(item.id); showPage(11) }}><Text style={[styles.testi,styles.link]}>{item.title}</Text></Pressable>
            </View>
          ))}
        </View>
      )}
      { disponibili == 2 && (
        <View style={styles.box}>
          <Text style={styles.titoli}>Ecco le ultime storie che ho sentito</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.testi}>Scusami sono stanco 🥱</Text>
        </View>
      )}
    </View>
  );
};

const HomeStory = ({ showPage, gJWTtoken,sShowPopupFB,sShowErr,sid }) => {
  const [Page, setPage] = useState('');
  const [Pupup, setPupup] = useState(true);

  return (
    <View style={styles.stacca}>
      <ScrollView>
        {Pupup == true && Page == '' && (
          <View style={styles.centro}>
            <View style={styles.box3}>
              <Text style={[styles.titoli, {alignSelf: 'center'}]}>Cosa vuoi che faccia?</Text>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Racconta'), setPupup(false)}}><Text style={styles.testi}>Raccontami una storia</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {setPage('Inventa'), setPupup(false)}}><Text style={styles.testi}>Creami una storia</Text></Pressable>
              <Pressable style={styles.bottoni} onPress={() => {showPage(3), setPupup(false)}}><Text style={styles.testi}>Ascolta una mia storia</Text></Pressable>
            </View>
          </View>
        )}

        {Pupup == true && Page == '' && <LastStory showPage={showPage} sid={sid} />}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.col1}>
            {Pupup == false && (<View style={{alignSelf: 'flex-start', marginLeft: 50, marginTop: 30}}><Pressable style={styles.bottoni} onPress={() => setPupup(true)}><Text style={styles.testi}> = </Text></Pressable></View>)}
            {Pupup == true && Page != '' && (
              <View style={styles.box3}>
                <View style={[styles.rowpuro,{alignSelf: 'flex-start'}]}>
                  <Pressable onPress={() => setPupup(false)}><Text style={styles.titoli}> X</Text></Pressable>
                  <Text style={styles.titoli}>      Cosa vuoi che faccia?</Text>
                </View>
                <Pressable style={styles.bottoni} onPress={() => {setPage('Racconta'), setPupup(false)}}><Text style={styles.testi}>Raccontami una storia</Text></Pressable>
                <Pressable style={styles.bottoni} onPress={() => {setPage('Inventa'), setPupup(false)}}><Text style={styles.testi}>Creami una storia</Text></Pressable>
                <Pressable style={styles.bottoni} onPress={() => {showPage(3), setPupup(false)}}><Text style={styles.testi}>Ascolta una mia storia</Text></Pressable>
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