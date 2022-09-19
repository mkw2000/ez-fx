import { OptionsState, Row } from "./types";

export const fxControlsDebounceTime = 100;

export const initialState: OptionsState = {
  reverb: {
    wet: 1,
    decay: 2,
    preDelay:2,
  },
  distortion: {
    wet: .1,
    distortion: 0,
    oversample: "none",
  },
  pingPongDelay: {
    wet: .1,
    delayTime: .1,
    maxDelay: 1,
    feedback: .1,
  },
  chorus: {
    wet: .1,
    frequency: .1,
    delayTime:.1,
    depth: .1,
    spread: .1,
    feedback: .1,
  },
  phaser: {
    wet: .1,
    frequency: .1,
    octaves: .1,
    baseFrequency: .1,
    stages: .1,
  },
};

export const initialFxState: Row[] = [
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
      ],
    },
  ];
  