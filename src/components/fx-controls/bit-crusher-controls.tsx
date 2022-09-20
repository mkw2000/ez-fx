import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function BitCrusherControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { bitCrusher } = state;
  const { bits, wet } = bitCrusher;

  const handleBitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-bit-crusher",
      payload: {
        ...bitCrusher,
        bits: parseFloat(e.target.defaultValue),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-bit-crusher",
      payload: {
        ...bitCrusher,
        wet: parseFloat(e.target.defaultValue),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedBitsHandler = debounce(
    handleBitsChange,
    fxControlsDebounceTime
  );

  return (
    <div className="bit-crusher-controls">
      <div className="fx-controls-header">bit crusher</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="bit-crusher-bits">bits</label>
          <input
            id="bit-crusher-bits"
            type="range"
            min="1"
            max="16"
            step="1"
            defaultValue={bits}
            onChange={debouncedBitsHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="bit-crusher-wet">wet</label>
          <input
            id="bit-crusher-wet"
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue={wet}
            onChange={debouncedWetHandler}
          />
        </div>
      </div>
    </div>
  );
}
