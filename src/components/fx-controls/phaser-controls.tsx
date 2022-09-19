import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function PhaserControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { phaser } = state;
  const { wet, frequency, octaves, baseFrequency } = phaser;

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-phaser",
      payload: {
        ...phaser,
        wet: parseFloat(e.target.value),
      },
    });
  };
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-phaser",
      payload: {
        ...phaser,
        frequency: parseFloat(e.target.value),
      },
    });
  };
  const handleOctavesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-phaser",
      payload: {
        ...phaser,
        octaves: parseFloat(e.target.value),
      },
    });
  };
  const handleBaseFrequencyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "update-phaser",
      payload: {
        ...phaser,
        baseFrequency: parseFloat(e.target.value),
      },
    });
  };

  const debouncedOctaveHandler = debounce(
    handleOctavesChange,
    fxControlsDebounceTime
  );
  const debouncedFrequencyHandler = debounce(
    handleFrequencyChange,
    fxControlsDebounceTime
  );
  const debouncedBaseFrequencyHandler = debounce(
    handleBaseFrequencyChange,
    fxControlsDebounceTime
  );

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);

  return (
    <div className="phaser-controls">
      <div className="fx-controls-header">phaser</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="phaser-wet">wet</label>
          <input
            type="range"
            id="phaser-wet"
            min="0"
            max="1"
            step="0.01"
            defaultValue={wet}
            onChange={handleWetChange}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="phaser-frequency">frequency</label>
          <input
            type="range"
            id="phaser-frequency"
            min="0"
            max="1"
            step="0.01"
            defaultValue={frequency}
            onChange={handleFrequencyChange}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="phaser-octaves">octaves</label>
          <input
            type="range"
            id="phaser-octaves"
            min="0"
            max="1"
            step="0.01"
            defaultValue={octaves}
            onChange={handleOctavesChange}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="phaser-base-frequency">base frequency</label>
          <input
            type="range"
            id="phaser-base-frequency"
            min="0"
            max="1"
            step="0.01"
            defaultValue={baseFrequency}
            onChange={handleBaseFrequencyChange}
          />
        </div>
      </div>
    </div>
  );
}
