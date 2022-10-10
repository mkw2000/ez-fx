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
  formatEffectName,
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
    <div className="grow self-center">
      <div className="flex flex-col w-96">
        {entries.map(([option, value]) => {
          return (
            <div key={option} className="my-2">
              <label
                className="font-bold text-gray-600"
                htmlFor={`${effect}-${option}`}
              >
                {option}: {value}
              </label>
              <input
                className="w-full h-2 bg-blue-100 appearance-none"
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
