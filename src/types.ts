import {
  Reverb,
  Chorus,
  Delay,
  Distortion,
  Phaser,
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
  Compressor,
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
} from "tone/build/esm/core/type/Units";

export interface ReverbOptions {
  wet: NormalRange;
  preDelay: Seconds;
  decay: Seconds;
}

export interface ChorusOptions {
  wet: NormalRange;
  frequency: Frequency;
  delayTime: Milliseconds;
  depth: NormalRange;
  spread: Degrees;
  feedback: NormalRange;
}

export interface PingPongDelayOptions {
  wet: NormalRange;
  delayTime: Milliseconds;
  feedback: NormalRange;
  maxDelay: Seconds;
}

export interface DistortionOptions {
  wet: NormalRange;
  distortion: number;
  oversample: OverSampleType;
}

export interface PhaserOptions {
  wet: NormalRange;
  frequency: Frequency;
  octaves: Positive;
  baseFrequency: Frequency;
  stages: Positive;
}

export interface ChebyshevOptions {
  order: number;
  //TODO
  oversample?: OverSampleType;
  wet: NormalRange;
}

export interface StereoWidenerOptions {
  width: NormalRange;
  wet: NormalRange;
}

export interface VibratoOptions {
  frequency: Frequency;
  depth: NormalRange;
  wet: NormalRange;
}

export interface TremoloOptions {
  frequency: Frequency;
  depth: NormalRange;
  wet: NormalRange;
  spread: Degrees;
}

export interface PitchShiftOptions {
  pitch: Interval;
  windowSize: Seconds;
  delayTime: Seconds;
  feedback: NormalRange;
  wet: NormalRange;
}

export interface FrequencyShifterOptions {
  frequency: Frequency;
  wet: NormalRange;
}

export interface FeedbackDelayOptions {
  delayTime?: Seconds;
  feedback: NormalRange;
  wet: NormalRange;
  maxDelay?: Seconds;
}

export interface BitCrusherOptions {
  bits: number;
  wet: NormalRange;
}

export interface AutoWahOptions {
  baseFrequency: Frequency;
  octaves: Positive;
  follower?: Seconds;
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

export interface CompressorOptions {
  threshold: Decibels;
  ratio: Positive;
  attack: Seconds;
  release: Seconds;
  wet: NormalRange;
  knee: Decibels;
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
  compressor: CompressorOptions;
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
  Tremolo = "tremolo",
  PitchShift = "pitchShift",
  FrequencyShifter = "frequencyShifter",
  FeedbackDelay = "feedbackDelay",
  BitCrusher = "bitCrusher",
  AutoWah = "autoWah",
  AutoFilter = "autoFilter",
  Compressor = "compressor",
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
    | AutoFilter
    | Compressor;
};

export type Row = {
  groupName: string;
  effects: EffectType[];
};
