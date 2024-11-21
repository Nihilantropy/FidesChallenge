import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

let sound;
export const setupPlayer = async (blob, setStato) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    await new Promise((resolve) => (reader.onloadend = resolve));
    const base64Data = reader.result.split(",")[1];
    const filePath = `${FileSystem.cacheDirectory}audio.mp3`;
    await FileSystem.writeAsStringAsync(filePath, base64Data, {encoding: FileSystem.EncodingType.Base64,});
    sound = new Audio.Sound();
    await sound.loadAsync({ uri: filePath }, { shouldPlay: false });
    sound.setOnPlaybackStatusUpdate((status) => {if (status.didJustFinish && !status.isLooping) {setStato('play');}});
  } catch (error) {;}
};

export const playAudio = async () => {if (sound) {await sound.playAsync();}};
export const pauseAudio = async () => {if (sound) {await sound.pauseAsync();}};
export const setPlaybackRate = async (rate) => {if (sound) {await sound.setRateAsync(rate, true);/*false: ignora il pitch*/}};