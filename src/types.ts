import {
  Reverb,
  Chorus,
  Delay,
  Distortion,
  Phaser,
  BaseContext,
  Chebyshev,
  StereoWidener,
  Vibrato,
  PitchShift,
  FrequencyShifter,
  FeedbackDelay,
  BitCrusher,
  AutoWah,
  AutoFilter,
  Tremolo,
} from "tone";
import {
  Decibels,
  Degrees,
  Frequency,
  GainFactor,
  Interval,
  Milliseconds,
  NormalRange,
  Positive,
  Seconds,
  Time,
} from "tone/build/esm/core/type/Units";

export interface ReverbOptions {
  wet: NormalRange;
  preDelay: Seconds;
  decay: Seconds;
  context?: BaseContext;
}

export interface ChorusOptions {
  wet: NormalRange;
  frequency: Frequency;
  delayTime: Milliseconds;
  depth: NormalRange;
  spread: Degrees;
  context?: BaseContext;
  feedback: NormalRange;
}

export interface PingPongDelayOptions {
  wet: NormalRange;
  delayTime: Milliseconds;
  feedback: NormalRange;
  maxDelay: Seconds;
  context?: BaseContext;
}

export interface DistortionOptions {
  wet: NormalRange;
  distortion: number;
  oversample: OverSampleType;
  context?: BaseContext;
}

export interface PhaserOptions {
  wet: NormalRange;
  frequency: Frequency;
  octaves: Positive;
  baseFrequency: Frequency;
  context?: BaseContext;
  stages: Positive;
}

export interface ChebyshevOptions {
  order: number;
  oversample?: OverSampleType;
  context?: BaseContext;
  wet: NormalRange;
}

export interface StereoWidenerOptions {
  width: NormalRange;
  context?: BaseContext;
  wet: NormalRange;
}

export interface VibratoOptions {
  frequency: Frequency;
  depth: NormalRange;
  context?: BaseContext;
  wet: NormalRange;
}

export interface TremoloOptions {
  frequency: Frequency;
  depth: NormalRange;
  context?: BaseContext;
  wet: NormalRange;
  spread: Degrees;
}

export interface PitchShiftOptions {
  pitch: Interval;
  windowSize: Seconds;
  delayTime: Time;
  feedback: NormalRange;
  wet: NormalRange;
}

export interface FrequencyShifterOptions {
  frequency: Frequency;
  wet: NormalRange;
}

export interface FeedbackDelayOptions {
  delayTime: Time;
  feedback: NormalRange;
  wet: NormalRange;
  maxDelay: Time;
}

export interface BitCrusherOptions {
  bits: number;
  wet: NormalRange;
}

export interface AutoWahOptions {
  baseFrequency: Frequency;
  octaves: Positive;
  follower?: Time;
  gain: GainFactor;
  sensitivity: Decibels;
  wet: NormalRange;
}

export interface AutoFilterOptions {
  frequency: Frequency;
  octaves: Positive;
  baseFrequency: Frequency;
  wet: NormalRange;
  depth: NormalRange;
}

export type OptionsState = {
  reverb: ReverbOptions;
  pingPongDelay: PingPongDelayOptions;
  distortion: DistortionOptions;
  chorus: ChorusOptions;
  phaser: PhaserOptions;
  chebyshev: ChebyshevOptions;
  stereoWidener: StereoWidenerOptions;
  vibrato: VibratoOptions;
  tremolo: TremoloOptions;
  pitchShift: PitchShiftOptions;
  frequencyShifter: FrequencyShifterOptions;
  feedbackDelay: FeedbackDelayOptions;
  bitCrusher: BitCrusherOptions;
  autoWah: AutoWahOptions;
  autoFilter: AutoFilterOptions;
};

export enum EffectsEnum {
  Reverb = "reverb",
  Chorus = "chorus",
  PingPongDelay = "pingPongDelay",
  Distortion = "distortion",
  Phaser = "phaser",
  Chebyshev = "chebyshev",
  StereoWidener = "stereoWidener",
  Vibrato = "vibrato",
  Tremelo = "tremelo",
  PitchShift = "pitchShift",
  FrequencyShifter = "frequencyShifter",
  FeedbackDelay = "feedbackDelay",
  BitCrusher = "bitCrusher",
  AutoWah = "autoWah",
  AutoFilter = "autoFilter",
}

export type EffectType = {
  id: string;
  title: string;
  effect?:
    | Reverb
    | Chorus
    | Delay
    | Distortion
    | Phaser
    | Chebyshev
    | StereoWidener
    | Vibrato
    | Tremolo
    | PitchShift
    | FrequencyShifter
    | FeedbackDelay
    | BitCrusher
    | AutoWah
    | AutoFilter;
};

export type Row = {
  groupName: string;
  effects: EffectType[];
};
