import { Reverb, Chorus, Delay, Distortion, Phaser, BaseContext } from "tone";
import { Degrees, Frequency, Milliseconds, NormalRange, Positive, Seconds } from "tone/build/esm/core/type/Units";

export interface ReverbOptions {
  wet: NormalRange; 
  preDelay:Seconds; 
  decay:Seconds; 
  context?:BaseContext;
}

export interface ChorusOptions {
  wet: NormalRange; 
  frequency:Frequency; 
  delayTime:Milliseconds; 
  depth:NormalRange; 
  spread:Degrees; 
  context?:BaseContext;
  feedback:NormalRange;
}

export interface PingPongDelayOptions {
  wet: NormalRange;
  delayTime:Milliseconds; 
  feedback:NormalRange; 
  maxDelay:Seconds;
  context?:BaseContext;
}

export interface DistortionOptions {
  wet: NormalRange;
  distortion: number;
  oversample: OverSampleType;
  context?:BaseContext;
}

export interface PhaserOptions {
  wet: NormalRange;
  frequency:Frequency;
  octaves:Positive;
  baseFrequency:Frequency;
  context?:BaseContext;
  stages:Positive;
}

export type OptionsState = {
  reverb: ReverbOptions;
  pingPongDelay: PingPongDelayOptions;
  distortion: DistortionOptions;
  chorus: ChorusOptions;
  phaser: PhaserOptions;
};

export enum EffectsEnum {
  Reverb = "reverb",
  Chorus = "chorus",
  PingPongDelay = "pingPongDelay",
  Distortion = "distortion",
  Phaser = "phaser",
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


export type EffectOptions = {
  reverb: ReverbOptions
}