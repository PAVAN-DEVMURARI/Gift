declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string[];
      autoplay?: boolean;
      loop?: boolean;
      volume?: number;
      html5?: boolean;
      preload?: boolean;
      onload?: () => void;
      onloaderror?: (id: number, error: any) => void;
      onplay?: (id: number) => void;
      onend?: (id: number) => void;
      onpause?: (id: number) => void;
      onstop?: (id: number) => void;
    });

    play(spriteOrId?: string | number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    volume(volume?: number, id?: number): this | number;
    loop(loop?: boolean, id?: number): this | boolean;
    mute(mute?: boolean, id?: number): this | boolean;
    fade(from: number, to: number, duration: number, id?: number): this;
    state(): 'unloaded' | 'loading' | 'loaded';
    playing(id?: number): boolean;
    duration(id?: number): number;
    seek(seek?: number, id?: number): this | number;
    on(event: string, callback: Function, id?: number): this;
    once(event: string, callback: Function, id?: number): this;
    off(event: string, callback?: Function, id?: number): this;
    load(): this;
    unload(): void;
  }

  export class Howler {
    static volume(volume?: number): number | this;
    static mute(mute?: boolean): boolean | this;
    static stop(): void;
    static codecs(ext: string): boolean;
  }
}
