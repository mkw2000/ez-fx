import { EffectsEnum, EffectType } from "../types";

type Props = {
  selectedEffect: EffectsEnum;
};

const getOptionsFromEffectName = (effectName: EffectsEnum) => {
  switch (effectName) {
    case EffectsEnum.Reverb:
    default:
      break;

export function FxControls({ selectedEffect }: Props) {
  return (
    <div className="fx-controls">
      <div className="fx-controls-header">
        fx controls
        {selectedEffect ? selectedEffect : null}
      </div>
    </div>
  );
}
