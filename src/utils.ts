import { EffectsEnum } from "./types";

export function camelCaseToKebabCase(str: string) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

export const stringToEffectsEnum = (effect: string) => {
  switch (effect) {
    case "bitCrusher":
      return EffectsEnum.BitCrusher;
    case "reverb":
      return EffectsEnum.Reverb;
    case "pingPongDelay":
      return EffectsEnum.PingPongDelay;
    case "tremolo":
      return EffectsEnum.Tremolo;
    case "phaser":
      return EffectsEnum.Phaser;
    case "chorus":
      return EffectsEnum.Chorus;
    case "vibrato":
      return EffectsEnum.Vibrato;
    case "stereoWidener":
      return EffectsEnum.StereoWidener;
    case "chebyshev":
      return EffectsEnum.Chebyshev;
    case "distortion":
      return EffectsEnum.Distortion;
    case "pitchShift":
      return EffectsEnum.PitchShift;
    case "feedbackDelay":
      return EffectsEnum.FeedbackDelay;
    case "compressor":
      return EffectsEnum.Compressor;
    case "autoFilter":
      return EffectsEnum.AutoFilter;
    case "frequencyShifter":
      return EffectsEnum.FrequencyShifter;
    default:
      throw new Error("Effect not found");
  }
};

export const getMin = (option: string) => {
  switch (option) {
    case "pitch":
      return -24;
    default:
      return 0;
  }
};

export const getSteps = (option: string) => {
  switch (option) {
    case "wet":
    case "depth":
    case "width":
    case "feedback":
    case "follower":
      return 0.01;
    case "preDelay":
    case "decay":
    case "order":
    case "frequency":
    case "windowSize":
    case "bits":
    case "gainFactor":
    case "sensitivity":
    case "threshold":
    case "ratio":
    case "attack":
    case "release":
    case "knee":
    case "baseFrequency":
    case "stages":
    case "delayTime":
    case "spread":
    case "maxDelay":
    case "distortion":
    case "pitch":
    case "octaves":
      return 1;
    default:
      throw new Error("Invalid option");
  }
};

export const getMax = (option: string) => {
  switch (option) {
    case "wet":
    case "depth":
    case "width":
    case "feedback":
    case "follower":
      return 1;
    case "preDelay":
    case "decay":
    case "order":
    case "frequency":
    case "windowSize":
    case "bits":
    case "gainFactor":
    case "sensitivity":
    case "threshold":
    case "ratio":
    case "attack":
    case "release":
    case "knee":
    case "baseFrequency":
    case "stages":
    case "delayTime":
    case "spread":
    case "maxDelay":
    case "distortion":
      return 100;
    case "pitch":
    case "octaves":
      return 24;
    default:
      throw new Error("Invalid option");
  }
};
