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
  clearSelected: () => void;
};

export function EffectController({ effect, clearSelected }: Props) {
  const { state, dispatch } = React.useContext(FxOptionsContext);

  const effectEnum = stringToEffectsEnum(effect);
  const effectState = state[effectEnum];
  const entries = Object.entries(effectState);
  const dispatchType = camelCaseToKebabCase(effect);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const payload = { ...effectState, [id]: value };
    dispatch({ type: `update-${dispatchType}`, payload });

    // console.log("e", e);
  };

  const debouncedHandleOptionChange = debounce(
    handleOptionChange,
    fxControlsDebounceTime
  );

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="fx-controls-header">{effect}</div>
      <button onClick={clearSelected}>X</button>
      <div className="flex flex-col">
        {entries.map(([option, value]) => {
          return (
            <div key={option} className="fx-control">
              <label htmlFor={`${effect}-${option}`}>{option}</label>
              <input
                id={option}
                type="range"
                min={getMin(option, effect)}
                max={getMax(option, effect)}
                step={getSteps(option, effect)}
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
