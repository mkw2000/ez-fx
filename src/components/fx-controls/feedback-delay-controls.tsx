import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function FeedbackDelayControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);

  const { feedbackDelay } = state;
  const { maxDelay, feedback, wet } = feedbackDelay;

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-feedback-delay",
      payload: {
        ...feedbackDelay,
        feedback: parseFloat(e.target.value),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-feedback-delay",
      payload: {
        ...feedbackDelay,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedFeedbackHandler = debounce(
    handleFeedbackChange,
    fxControlsDebounceTime
  );

  return (
    <div className="feedback-delay-controls">
      <div className="fx-controls-header">feedback delay</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="feedback-delay-feedback">feedback</label>
          <input
            id="feedback-delay-feedback"
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={feedback}
            onChange={debouncedFeedbackHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="feedback-delay-wet">wet</label>
          <input
            id="feedback-delay-wet"
            type="range"
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
