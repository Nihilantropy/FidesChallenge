import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

let sound;
export const setupPlayer = async (blob) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    await new Promise((resolve) => (reader.onloadend = resolve));
    const base64Data = reader.result.split(",")[1];
    const filePath = `${FileSystem.cacheDirectory}audio.mp3`;
    await FileSystem.writeAsStringAsync(filePath, base64Data, {encoding: FileSystem.EncodingType.Base64,});
    sound = new Audio.Sound();
    await sound.loadAsync({ uri: filePath }, { shouldPlay: false });
  } catch (error) {;}
};

export const playAudio = async () => {if (sound) {await sound.playAsync();}};
export const pauseAudio = async () => {if (sound) {await sound.pauseAsync();}};