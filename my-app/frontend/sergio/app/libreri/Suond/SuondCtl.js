import React, {useState} from 'react';
import { View,Text,Pressable,Image,Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const SuondCtl = ({ sShowErr,get_story,setStoria,setgenera, storie,inventa, testo,id,modificato }) => {
  const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./Web') : require('./Mobile');
  const [statorip, setStato] = useState('unset');
  const [Velocita, setVelocita] = useState('x1');

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
      sShowErr("Scusami sono stanco 🥱");
      setStato('unset');
    }
  }

  return (
    <View style={{justifyContent: 'space-between',alignSelf: 'flex-start'}}>
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        { inventa==true && (<Pressable style={styles.bottoni} onPress={() => {pauseAudio(),setStato('unset'),setStoria(''),setgenera(1);}}><Text style={styles.testi}>Voglio un'altra storia</Text></Pressable>)}
        { storie==true && (<Pressable style={styles.bottoni} onPress={() => {pauseAudio(),setStato('unset'),get_story(),setVelocita('x1')}}><Text style={styles.testi}>Raccontami un'altra storia</Text></Pressable>)}
        <Text>{"\n"}</Text>
      </View>
      <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
        {statorip == 'unset' && (<Pressable style={styles.testi} onPress={() => {speakText(testo,id,modificato),setStato('inset')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
        {statorip == 'inset' && (<Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} />)}
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
  );
};
export default SuondCtl;