import { Reverb, Chorus, Delay, Distortion, Phaser } from "tone";

export type EffectType = {
    id: string;
    title: string;
    effect?: Reverb | Chorus | Delay | Distortion | Phaser;
  };

  
export type Row = {
    groupName: string;
    effects: EffectType[];
  };

  
