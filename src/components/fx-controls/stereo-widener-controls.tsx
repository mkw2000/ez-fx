import debounce from "lodash.debounce";
import React from "react";
import { fxControlsDebounceTime } from "../../constants";
import { FxOptionsContext } from "../../providers";

export function StereoWidenerControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { stereoWidener } = state;
  const { wet, width } = stereoWidener;

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-stereo-widener",
      payload: {
        ...stereoWidener,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-stereo-widener",
      payload: {
        ...stereoWidener,
        width: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);

  const debouncedWidthHandler = debounce(
    handleWidthChange,
    fxControlsDebounceTime
  );

  return (
    <div className="fx-controls">
      <div className="fx-control">
        <div className="fx-controls-header">stereo widener</div>

        <label htmlFor="wet">Wet</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={wet}
          onChange={debouncedWetHandler}
        />
      </div>
      <div className="fx-control">
        <label htmlFor="width">Width</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={width}
          onChange={debouncedWidthHandler}
        />
      </div>
    </div>
  );
}
