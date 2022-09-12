import { EffectType } from "../types";

type Props = {
  selectedEffect: string | null;
};

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
