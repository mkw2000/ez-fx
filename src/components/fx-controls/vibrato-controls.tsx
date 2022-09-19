import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function VibratoControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { vibrato } = state;
  const { depth, frequency, wet } = vibrato;
  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleDepthChange", e.target.value);
    dispatch({
      type: "update-vibrato",
      payload: {
        ...vibrato,
        depth: parseFloat(e.target.value),
      },
    });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFrequencyChange", e.target.value);
    dispatch({
      type: "update-vibrato",
      payload: {
        ...vibrato,
        frequency: parseFloat(e.target.value),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWetChange", e.target.value);
    dispatch({
      type: "update-vibrato",
      payload: {
        ...vibrato,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedFrequencyHandler = debounce(
    handleFrequencyChange,
    fxControlsDebounceTime
  );
  const debouncedDepthHandler = debounce(
    handleDepthChange,
    fxControlsDebounceTime
  );

  return (
    <div className="vibrato-controls">
      <div className="fx-controls-header">vibrato</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="vibrato-wet">wet</label>
          <input
            type="range"
            id="vibrato-wet"
            min="0"
            max="1"
            step="0.01"
            defaultValue={wet}
            onChange={debouncedWetHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="vibrato-frequency">frequency</label>
          <input
            type="range"
            id="vibrato-frequency"
            min="0"
            max="1"
            step="0.01"
            defaultValue={frequency}
            onChange={debouncedFrequencyHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="vibrato-depth">depth</label>
          <input
            type="range"
            id="vibrato-depth"
            min="0"
            max="1"
            step="0.01"
            defaultValue={depth}
            onChange={debouncedDepthHandler}
          />
        </div>
      </div>
    </div>
  );
}
