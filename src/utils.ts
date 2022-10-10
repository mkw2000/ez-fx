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

export const formatEffectName = (effect: EffectsEnum | string) => {
  switch (effect) {
    case EffectsEnum.BitCrusher:
      return "Bit Crusher";
    case EffectsEnum.Reverb:
      return "Reverb";
    case EffectsEnum.PingPongDelay:
      return "PingPong Delay";
    case EffectsEnum.Tremolo:
      return "Tremelo";
    case EffectsEnum.Phaser:
      return "Phaser";
    case EffectsEnum.Chorus:
      return "Chorus";
    case EffectsEnum.Vibrato:
      return "Vibrato";
    case EffectsEnum.StereoWidener:
      return "Stereo Widener";
    case EffectsEnum.Chebyshev:
      return "Chebyshev Distortion";
    case EffectsEnum.Distortion:
      return "Distortion";
    case EffectsEnum.PitchShift:
      return "Pitch Shifter";
    case EffectsEnum.FeedbackDelay:
      return "Feedback Delay";
    case EffectsEnum.Compressor:
      return "Compressor";
    case EffectsEnum.AutoFilter:
      return "Auto Filter";
    case EffectsEnum.FrequencyShifter:
      return "Frequency Shifter";
    default:
      return "Effect";
  }
};

export const getMin = (option: string, effect: string) => {
  switch (option) {
    case "bits":
      return 1;
    case "decay":
      return effect === "reverb" ? 0.001 : 0;
    case "ratio":
      return 1;
    case "threshold":
      return -100;
    case "knee":
      return effect === "compressor" ? 0 : -100;
    case "pitch":
      return -24;
    default:
      return 0;
  }
};

export const getSteps = (option: string, effect: string) => {
  switch (option) {
    case "wet":
    case "depth":
    case "width":
    case "feedback":
    case "follower":
    case "attack":
    case "release":
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
    case "baseFrequency":
    case "stages":

    case "spread":
    case "maxDelay":
    case "distortion":
    case "pitch":
    case "octaves":
    case "knee":
      return 1;
    case "delayTime":
      return effect === "feedbackDelay" ? 0.01 : 1;
    default:
      throw new Error("getSteps: Invalid option");
  }
};

export const getMax = (option: string, effect: string) => {
  switch (option) {
    case "delayTime":
      return effect === "feedbackDelay" ? 0.1 : 1000;
    case "bits":
      return 16;
    case "threshold":
      return 0;
    case "knee":
      return effect === "compressor" ? 40 : 0;
    case "wet":
    case "depth":
    case "width":
    case "feedback":
    case "attack":
    case "release":
    case "follower":
      return 1;
    case "preDelay":
    case "decay":
    case "order":
    case "frequency":
    case "windowSize":
    case "gainFactor":
    case "sensitivity":
    case "baseFrequency":
    case "stages":
    case "delayTime":
    case "spread":
    case "maxDelay":
    case "distortion":
      return 100;
    case "ratio":
      return 20;
    case "pitch":
    case "octaves":
      return 24;
    default:
      throw new Error("getMax: Invalid option");
  }
};
