import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function ReverbControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { reverb } = state;
  const { decay, preDelay, wet } = reverb;

  const handleDecayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleDecayChange", e.target.value);
    dispatch({
      type: "update-reverb",
      payload: {
        ...reverb,
        decay: parseFloat(e.target.value),
      },
    });
  };

  const handlePreDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlePreDelayChange", e.target.value);
    dispatch({
      type: "update-reverb",
      payload: {
        ...reverb,
        preDelay: parseFloat(e.target.value),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWetChange", e.target.value);
    dispatch({
      type: "update-reverb",
      payload: {
        ...reverb,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedPreDelayHandler = debounce(
    handlePreDelayChange,
    fxControlsDebounceTime
  );
  const debouncedDecayHandler = debounce(
    handleDecayChange,
    fxControlsDebounceTime
  );

  return (
    <div className="reverb-controls">
      <div className="fx-controls-header">reverb</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="reverb-decay">decay</label>
          <input
            type="range"
            id="reverb-decay"
            min="0"
            max="10"
            step="0.1"
            defaultValue={decay}
            onChange={debouncedDecayHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="reverb-pre-delay">pre-delay</label>
          <input
            type="range"
            id="reverb-pre-delay"
            min="0"
            max="10"
            step="0.1"
            defaultValue={preDelay}
            onChange={debouncedPreDelayHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="reverb-wet">wet</label>
          <input
            type="range"
            id="reverb-wet"
            min="0"
            max="1"
            step="0.01"
            defaultValue={wet}
            onChange={debouncedWetHandler}
          />
        </div>
      </div>
    </div>
  );
}
