import React from "react";
import { FxOptionsContext } from "../../providers";
import { EffectsEnum, EffectType, ReverbOptions } from "../../types";
import { PingPongDelayControls } from "./ping-pong-delay-controls";
import { ReverbControls } from "./reverb-controls";
import { DistortionControls } from "./distortion-controls";
import { ChorusControls } from "./chorus-controls";
import { PhaserControls } from "./phaser-controls";

type Props = {
  selectedEffect: string;
};

export function FxControls({ selectedEffect }: Props) {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const effect = EffectsEnum[selectedEffect as keyof typeof EffectsEnum];
  const controls = state[effect];

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
      default:
        return null;
    }
  }

  return <div className="fx-controls">{renderEffectControls()}</div>;
}
