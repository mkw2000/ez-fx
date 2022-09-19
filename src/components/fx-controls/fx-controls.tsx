import React from "react";
import { FxOptionsContext } from "../../providers";
import { EffectsEnum, EffectType, ReverbOptions } from "../../types";
import { PingPongDelayControls } from "./ping-pong-delay-controls";
import { ReverbControls } from "./reverb-controls";
import { DistortionControls } from "./distortion-controls";
import { ChorusControls } from "./chorus-controls";
import { PhaserControls } from "./phaser-controls";
import { ChebyshevControls } from "./chebyshev-controls";
import { StereoWidenerControls } from "./stereo-widener-controls";
import { VibratoControls } from "./vibrato-controls";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

type Props = {
  selectedEffect: string;
};

export function FxControls({ selectedEffect }: Props) {
  function renderEffectControls() {
    switch (selectedEffect) {
      case EffectsEnum.Reverb:
        return <ReverbControls />;
      case EffectsEnum.PingPongDelay:
        return <PingPongDelayControls />;
      case EffectsEnum.Chorus:
        return <ChorusControls />;
      case EffectsEnum.Distortion:
        return <DistortionControls />;
      case EffectsEnum.Phaser:
        return <PhaserControls />;
      case EffectsEnum.Chebyshev:
        return <ChebyshevControls />;
      case EffectsEnum.StereoWidener:
        return <StereoWidenerControls />;
      case EffectsEnum.Vibrato:
        return <VibratoControls />;
      default:
        return null;
    }
  }

  return <div className="fx-controls">{renderEffectControls()}</div>;
}
