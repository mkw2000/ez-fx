import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function ChorusControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { chorus } = state;
  const { wet, frequency, delayTime, depth, spread, feedback } = chorus;

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chorus",
      payload: {
        ...chorus,
        wet: parseFloat(e.target.value),
      },
    });
  };
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chorus",
      payload: {
        ...chorus,
        frequency: parseFloat(e.target.value),
      },
    });
  };
  const handleDelayTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chorus",
      payload: {
        ...chorus,
        delayTime: parseFloat(e.target.value),
      },
    });
  };
  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chorus",
      payload: {
        ...chorus,
        depth: parseFloat(e.target.value),
      },
    });
  };
  const handleSpreadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chorus",
      payload: {
        ...chorus,
        spread: parseFloat(e.target.value),
      },
    });
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chorus",
      payload: {
        ...chorus,
        feedback: parseFloat(e.target.value),
      },
    });
  };

  const debouncedFeedbackHandler = debounce(
    handleFeedbackChange,
    fxControlsDebounceTime
  );
  const debouncedSpreadHandler = debounce(
    handleSpreadChange,
    fxControlsDebounceTime
  );
  const debouncedDepthHandler = debounce(
    handleDepthChange,
    fxControlsDebounceTime
  );
  const debouncedDelayTimeHandler = debounce(
    handleDelayTimeChange,
    fxControlsDebounceTime
  );
  const debouncedFrequencyHandler = debounce(
    handleFrequencyChange,
    fxControlsDebounceTime
  );
  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);

  return (
    <div className="chorus-controls">
      <div className="fx-controls-header">chorus</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="chorus-wet">wet</label>
          <input
            type="range"
            id="chorus-wet"
            min="0"
            max="1"
            step="0.01"
            defaultValue={wet}
            onChange={debouncedWetHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="chorus-frequency">frequency</label>
          <input
            type="range"
            id="chorus-frequency"
            min="0"
            max="10"
            step="0.01"
            defaultValue={frequency}
            onChange={debouncedFrequencyHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="chorus-delay-time">delay time</label>
          <input
            type="range"
            id="chorus-delay-time"
            min="0"
            max="1"
            step="0.01"
            defaultValue={delayTime}
            onChange={debouncedDelayTimeHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="chorus-depth">depth</label>
          <input
            type="range"
            id="chorus-depth"
            min="0"
            max="1"
            step="0.01"
            defaultValue={depth}
            onChange={debouncedDepthHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="chorus-spread">spread</label>
          <input
            type="range"
            id="chorus-spread"
            min="0"
            max="180"
            step="1"
            defaultValue={spread}
            onChange={debouncedSpreadHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="chorus-feedback">feedback</label>
          <input
            type="range"
            id="chorus-feedback"
            min="0"
            max="1"
            step="0.01"
            defaultValue={feedback}
            onChange={debouncedFeedbackHandler}
          />
        </div>
      </div>
    </div>
  );
}
function debouncedFeedbackHandler(
  handleFeedbackChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  arg1: number
) {
  throw new Error("Function not implemented.");
}
