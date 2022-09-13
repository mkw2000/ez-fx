import { Reverb, Chorus, Delay, Distortion, Phaser } from "tone";

export enum Effects {
  Reverb = "Reverb",
  Chorus = "Chorus",
  Delay = "Delay",
  Distortion = "Distortion",
  Phaser = "Phaser",
}

export type EffectType = {
    id: string;
    title: string;
    effect?: Reverb | Chorus | Delay | Distortion | Phaser;
  };

  
export type Row = {
    groupName: string;
    effects: EffectType[];
  };

  
