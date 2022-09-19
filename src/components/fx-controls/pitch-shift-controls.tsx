import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function PitchShiftControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { pitchShift } = state;
  const { pitch, windowSize, wet } = pitchShift;

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlePitchChange", e.target.value);
    dispatch({
      type: "update-pitch-shift",
      payload: {
        ...pitchShift,
        pitch: parseFloat(e.target.value),
      },
    });
  };

  const handleWindowSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWindowSizeChange", e.target.value);
    dispatch({
      type: "update-pitch-shift",
      payload: {
        ...pitchShift,
        windowSize: parseFloat(e.target.value),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWetChange", e.target.value);
    dispatch({
      type: "update-pitch-shift",
      payload: {
        ...pitchShift,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedPitchHandler = debounce(
    handlePitchChange,
    fxControlsDebounceTime
  );
  const debouncedWindowSizeHandler = debounce(
    handleWindowSizeChange,
    fxControlsDebounceTime
  );

  return (
    <div className="fx-controls">
      <div className="fx-controls-header">pitch shift</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="pitch-shift-wet">wet</label>
          <input
            type="range"
            id="pitch-shift-wet"
            min="0"
            max="1"
            step="0.01"
            value={wet}
            onChange={debouncedWetHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="pitch-shift-pitch">pitch</label>
          <input
            type="range"
            id="pitch-shift-pitch"
            min="-12"
            max="12"
            step="1"
            value={pitch}
            onChange={debouncedPitchHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="pitch-shift-window-size">window size</label>
          <input
            type="range"
            id="pitch-shift-window-size"
            min="0.001"
            max="0.1"
            step="0.001"
            value={windowSize}
            onChange={debouncedWindowSizeHandler}
          />
        </div>
      </div>
    </div>
  );
}
