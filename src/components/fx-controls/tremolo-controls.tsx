import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function TremoloControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { tremolo } = state;
  const { depth, frequency, wet, spread } = tremolo;

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleDepthChange", e.target.value);
    dispatch({
      type: "update-tremolo",
      payload: {
        ...tremolo,
        depth: parseFloat(e.target.value),
      },
    });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFrequencyChange", e.target.value);
    dispatch({
      type: "update-tremolo",
      payload: {
        ...tremolo,
        frequency: parseFloat(e.target.value),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWetChange", e.target.value);
    dispatch({
      type: "update-tremolo",
      payload: {
        ...tremolo,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const handleSpreadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleSpreadChange", e.target.value);
    dispatch({
      type: "update-tremolo",
      payload: {
        ...tremolo,
        spread: parseFloat(e.target.value),
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
  const debouncedSpreadHandler = debounce(
    handleSpreadChange,
    fxControlsDebounceTime
  );

  return (
    <div className="tremolo-controls">
      <div className="fx-controls-header">tremolo</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="tremolo-wet">wet</label>
          <input
            type="range"
            id="tremolo-wet"
            min="0"
            max="1"
            step="0.01"
            value={wet}
            onChange={debouncedWetHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="tremolo-frequency">frequency</label>
          <input
            type="range"
            id="tremolo-frequency"
            min="0"
            max="20"
            step="0.01"
            value={frequency}
            onChange={debouncedFrequencyHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="tremolo-depth">depth</label>
          <input
            type="range"
            id="tremolo-depth"
            min="0"
            max="1"
            step="0.01"
            value={depth}
            onChange={debouncedDepthHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="tremolo-spread">spread</label>
          <input
            type="range"
            id="tremolo-spread"
            min="0"
            max="180"
            step="1"
            value={spread}
            onChange={debouncedSpreadHandler}
          />
        </div>
      </div>
    </div>
  );
}
