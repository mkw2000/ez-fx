import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";

export function CompressorControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);

  const { compressor } = state;
  const { threshold, knee, ratio, attack, release, wet } = compressor;

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-compressor",
      payload: {
        ...compressor,
        threshold: parseFloat(e.target.defaultValue),
      },
    });
  };

  const handleKneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-compressor",
      payload: {
        ...compressor,
        knee: parseFloat(e.target.defaultValue),
      },
    });
  };

  const handleRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-compressor",
      payload: {
        ...compressor,
        ratio: parseFloat(e.target.defaultValue),
      },
    });
  };

  const handleAttackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-compressor",
      payload: {
        ...compressor,
        attack: parseFloat(e.target.defaultValue),
      },
    });
  };

  const handleReleaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-compressor",
      payload: {
        ...compressor,
        release: parseFloat(e.target.defaultValue),
      },
    });
  };

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-compressor",
      payload: {
        ...compressor,
        wet: parseFloat(e.target.defaultValue),
      },
    });
  };

  const debouncedThresholdHandler = debounce(
    handleThresholdChange,
    fxControlsDebounceTime
  );

  const debouncedKneeHandler = debounce(
    handleKneeChange,
    fxControlsDebounceTime
  );

  const debouncedRatioHandler = debounce(
    handleRatioChange,
    fxControlsDebounceTime
  );

  const debouncedAttackHandler = debounce(
    handleAttackChange,
    fxControlsDebounceTime
  );

  const debouncedReleaseHandler = debounce(
    handleReleaseChange,
    fxControlsDebounceTime
  );

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);

  return (
    <div className="compressor-controls">
      <div className="fx-controls-header">compressor</div>
      <div className="fx-controls-body">
        <div className="fx-control">
          <label htmlFor="compressor-threshold">threshold</label>
          <input
            id="compressor-threshold"
            type="range"
            min="-100"
            max="0"
            step="1"
            defaultValue={threshold}
            onChange={debouncedThresholdHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="compressor-knee">knee</label>
          <input
            id="compressor-knee"
            type="range"
            min="0"
            max="40"
            step="1"
            defaultValue={knee}
            onChange={debouncedKneeHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="compressor-ratio">ratio</label>
          <input
            id="compressor-ratio"
            type="range"
            min="1"
            max="20"
            step="1"
            defaultValue={ratio}
            onChange={debouncedRatioHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="compressor-attack">attack</label>
          <input
            id="compressor-attack"
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={attack}
            onChange={debouncedAttackHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="compressor-release">release</label>
          <input
            id="compressor-release"
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={release}
            onChange={debouncedReleaseHandler}
          />
        </div>
        <div className="fx-control">
          <label htmlFor="compressor-wet">wet</label>
          <input
            id="compressor-wet"
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
