import { Howl } from 'howler';

let sound;
export const setupPlayer = async (url, setStato) => {
  const audioUrl = URL.createObjectURL(url);
  sound = new Howl({
    src: [audioUrl],
    html5: true,
    onend: () => {setStato('unset');},
  });
};
export const playAudio = async () => {if (sound) {sound.play();}};
export const pauseAudio = async () => {if (sound) {sound.pause();}};
export const setPlaybackRate = async (rate) => {if (sound) {sound.rate(rate);}};