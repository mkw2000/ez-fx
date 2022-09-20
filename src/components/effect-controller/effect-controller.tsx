// component that takes an argument of the type of effect and renders the correct controls
import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";
import { EffectsEnum } from "../../types";
import { camelCaseToKebabCase } from "../../utils";

type Props = {
  effect: EffectsEnum;
};

export function EffectController({ effect }: Props) {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const effectState = state[effect];
  const entries = Object.entries(effectState);
  const dispatchType = camelCaseToKebabCase(effect);

  const getSteps = (option: string) => {
    switch (option) {
      case "wet":
      case "depth":
      case "width":
      case "feedback":
        return 0.01;
      case "preDelay":
      case "decay":
      case "order":
      case "frequency":
      case "windowSize":
      case "bits":
      case "gainFactor":
      case "sensitivity":
      case "threshold":
      case "ratio":
      case "attack":
      case "release":
      case "knee":
      case "baseFrequency":
      case "stages":
      case "delayTime":
      case "spread":
      case "maxDelay":
      case "distortion":
      case "octaves":
        return 1;
      default:
        throw new Error("Invalid option");
    }
  };

  const getMax = (option: string) => {
    switch (option) {
      case "wet":
      case "depth":
      case "width":
      case "feedback":
        return 1;
      case "preDelay":
      case "decay":
      case "order":
      case "frequency":
      case "windowSize":
      case "bits":
      case "gainFactor":
      case "sensitivity":
      case "threshold":
      case "ratio":
      case "attack":
      case "release":
      case "knee":
      case "baseFrequency":
      case "stages":
      case "delayTime":
      case "spread":
      case "maxDelay":
      case "distortion":
      case "octaves":
        return 100;
      default:
        throw new Error("Invalid option");
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const payload = { ...effectState, [id]: value };
    dispatch({ type: `update-${dispatchType}`, payload });
  };

  const debouncedHandleOptionChange = debounce(
    handleOptionChange,
    fxControlsDebounceTime
  );

  return (
    <div className="effect-controller">
      <div className="fx-controls-header">{effect}</div>
      <div className="fx-controls-body">
        {entries.map(([option, value]) => {
          return (
            <div key={option} className="fx-control">
              <label htmlFor={`${effect}-${option}`}>{option}</label>
              <input
                id={option}
                type="range"
                min="0"
                max={getMax(option)}
                step={getSteps(option)}
                defaultValue={value}
                onChange={debouncedHandleOptionChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
