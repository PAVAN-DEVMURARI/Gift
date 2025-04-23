import { Howl } from "howler";

let bgMusic: Howl | null = null;

export const initBackgroundMusic = (audioSrc: string) => {
  if (bgMusic) return bgMusic;
  
  bgMusic = new Howl({
    src: [audioSrc],
    loop: true,
    volume: 0.5,
    preload: true,
    html5: true,
  });
  
  return bgMusic;
};

export const playMusic = () => {
  if (bgMusic && !bgMusic.playing()) {
    bgMusic.play();
  }
};

export const pauseMusic = () => {
  if (bgMusic && bgMusic.playing()) {
    bgMusic.pause();
  }
};

export const setVolume = (volume: number) => {
  if (bgMusic) {
    bgMusic.volume(volume);
  }
};

export const cleanupAudio = () => {
  if (bgMusic) {
    bgMusic.stop();
    bgMusic.unload();
    bgMusic = null;
  }
};