import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function PingPongDelayControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { pingPongDelay } = state;
  const { wet, delayTime, feedback, maxDelay } = pingPongDelay;

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleWetChange", e.target.value);
    dispatch({
      type: "update-ping-pong-delay",
      payload: {
        ...pingPongDelay,
        wet: parseFloat(e.target.value),
      },
    });
  };

  const handleDelayTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleDelayTimeChange", e.target.value);
    dispatch({
      type: "update-ping-pong-delay",
      payload: {
        ...pingPongDelay,
        delayTime: parseFloat(e.target.value),
      },
    });
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFeedbackChange", e.target.value);
    dispatch({
      type: "update-ping-pong-delay",
      payload: {
        ...pingPongDelay,
        feedback: parseFloat(e.target.value),
      },
    });
  };

  const handleMaxDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleMaxDelayChange", e.target.value);
    dispatch({
      type: "update-ping-pong-delay",
      payload: {
        ...pingPongDelay,
        maxDelay: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedDelayTimeHandler = debounce(
    handleDelayTimeChange,
    fxControlsDebounceTime
  );
  const debouncedFeedbackHandler = debounce(
    handleFeedbackChange,
    fxControlsDebounceTime
  );
  const debouncedMaxDelayHandler = debounce(
    handleMaxDelayChange,
    fxControlsDebounceTime
  );

  return (
    <div className="ping-pong-delay-controls">
      <div className="fx-controls-header">ping-pong-delay</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="ping-pong-delay-wet">wet</label>
          <input
            type="range"
            id="ping-pong-delay-wet"
            min="0"
            max="1"
            step="0.01"
            defaultValue={wet}
            onChange={debouncedWetHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="ping-pong-delay-delay-time">delay-time</label>
          <input
            type="range"
            id="ping-pong-delay-delay-time"
            min="0"
            max="1"
            step="0.01"
            defaultValue={delayTime}
            onChange={debouncedDelayTimeHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="ping-pong-delay-feedback">feedback</label>
          <input
            type="range"
            id="ping-pong-delay-feedback"
            min="0"
            max="1"
            step="0.01"
            defaultValue={feedback}
            onChange={debouncedFeedbackHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="ping-pong-delay-max-delay">max-delay</label>
          <input
            type="range"
            id="ping-pong-delay-max-delay"
            min="0"
            max="1"
            step="0.01"
            defaultValue={maxDelay}
            onChange={debouncedMaxDelayHandler}
          />
        </div>
      </div>
    </div>
  );
}
