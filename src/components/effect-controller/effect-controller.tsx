// component that takes an argument of the type of effect and renders the correct controls
import React from "react";
import { FxOptionsContext } from "../../providers";
import debounce from "lodash.debounce";
import { fxControlsDebounceTime } from "../../constants";
import {
  camelCaseToKebabCase,
  getMax,
  getMin,
  getSteps,
  stringToEffectsEnum,
} from "../../utils";

type Props = {
  effect: string;
};

export function EffectController({ effect }: Props) {
  const { state, dispatch } = React.useContext(FxOptionsContext);

  const effectEnum = stringToEffectsEnum(effect);
  const effectState = state[effectEnum];
  const entries = Object.entries(effectState);
  const dispatchType = camelCaseToKebabCase(effect);

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
                min={getMin(option)}
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
