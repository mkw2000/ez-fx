import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function DistortionControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { distortion } = state;
  const { wet, distortion: dist } = distortion;

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWetChange", e.target.value);
    dispatch({
      type: "update-distortion",
      payload: {
        ...distortion,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const handleDistortionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handleDistortionAmountChange", e.target.value);
    dispatch({
      type: "update-distortion",
      payload: {
        ...distortion,
        distortion: parseFloat(e.target.value),
      },
    });
  };

  const debouncedDistortionHandler = debounce(
    handleDistortionAmountChange,
    fxControlsDebounceTime
  );

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);

  return (
    <div className="distortion-controls">
      <div className="fx-controls-header">distortion</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="distortion-wet">wet</label>
          <input
            type="range"
            id="distortion-wet"
            min="0"
            max="1"
            step="0.01"
            defaultValue={wet}
            onChange={debouncedWetHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="distortion-distortion-amount">
            distortion amount
          </label>
          <input
            type="range"
            id="distortion-distortion-amount"
            min="0"
            max="1"
            step="0.01"
            defaultValue={dist}
            onChange={debouncedDistortionHandler}
          />
        </div>
      </div>
    </div>
  );
}
