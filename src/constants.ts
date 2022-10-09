import { OptionsState, Row } from "./types";

export const fxControlsDebounceTime = 100;



//TODO: make better defaults
export const initialState: OptionsState = {
  reverb: {
    wet: 1,
    decay: 2,
    preDelay: 2,
  },
  distortion: {
    wet: 0.1,
    distortion: 0,
  },
  pingPongDelay: {
    wet: 0.1,
    delayTime: 0.1,
    maxDelay: 1,
    feedback: 0.1,
  },
  chorus: {
    wet: 0.1,
    frequency: 0.1,
    delayTime: 0.1,
    depth: 0.1,
    spread: 0.1,
    feedback: 0.1,
  },
  phaser: {
    wet: 0.1,
    frequency: 0.1,
    octaves: 0.1,
    baseFrequency: 0.1,
    stages: 0.1,
  },
  chebyshev: {
    wet: 0.1,
    order: 1,
  },
  stereoWidener: {
    wet: 0.1,
    width: 0.1,
  },
  vibrato: {
    wet: 0.1,
    frequency: 0.1,
    depth: 0.1,
  },
  tremolo: {
    wet: 0.1,
    frequency: 0.1,
    depth: 0.1,
    spread: 0.1,
  },
  pitchShift: {
    wet: 0.1,
    pitch: 0.1,
    windowSize: 0.1,
    delayTime: 0.1,
    feedback: 0.1,
  },
  frequencyShifter: {
    wet: 0.1,
    frequency: 0.1,
  },
  feedbackDelay: {
    wet: 0.1,
    delayTime: 0.1,
    feedback: 0.1,
    maxDelay: 0.1,
  },
  bitCrusher: {
    wet: 0.1,
    bits: 1,
  },
  autoFilter: {
    wet: 0.1,
    frequency: 0.1,
    octaves: 0,
    baseFrequency: 0.1,
    depth: 0.1,
  },
  compressor: {
    wet: 0.1,
    threshold: 0,
    ratio: 1,
    attack: 1,
    release: 1,
    knee: 1,
  },
};

export const initialFxRowsState: Row[] = [
  {
    groupName: "active-row",
    effects: [],
  },
  {
    groupName: "disabled-row",
    effects: [
      { id: "1", title: "reverb" },
      { id: "2", title: "pingPongDelay" },
      { id: "3", title: "chorus" },
      { id: "4", title: "distortion" },
      { id: "5", title: "phaser" },
      { id: "6", title: "chebyshev" },
      { id: "7", title: "stereoWidener" },
      { id: "8", title: "vibrato" },
      { id: "9", title: "tremolo" },
      { id: "10", title: "pitchShift" },
      { id: "11", title: "frequencyShifter" },
      { id: "12", title: "feedbackDelay" },
      { id: "13", title: "bitCrusher" },
      { id: "14", title: "autoFilter" },
      { id: "15", title: "compressor" },
    ],
  },
];
