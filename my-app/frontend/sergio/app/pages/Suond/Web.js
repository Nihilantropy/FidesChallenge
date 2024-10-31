import { Howl } from 'howler';

let sound;
export const setupPlayer = async (url) => {
  const audioUrl = URL.createObjectURL(url);
  sound = new Howl({
    src: [audioUrl],
    html5: true,
  });
};
export const playAudio = async () => {if (sound) {sound.play();}};
export const pauseAudio = async () => {if (sound) {sound.pause();}};
export const setPlaybackRate = async (rate) => {if (sound) {sound.rate(rate);}};