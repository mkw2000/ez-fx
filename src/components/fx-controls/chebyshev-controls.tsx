import debounce from "lodash.debounce";
import React from "react";
import { fxControlsDebounceTime } from "../../constants";
import { FxOptionsContext } from "../../providers";

export function ChebyshevControls() {
  const { state, dispatch } = React.useContext(FxOptionsContext);
  const { chebyshev } = state;
  const { wet, order } = chebyshev;

  const handleWetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chebyshev",
      payload: {
        ...chebyshev,
        wet: parseFloat(e.target.value),
      },
    });
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update-chebyshev",
      payload: {
        ...chebyshev,
        order: parseFloat(e.target.value),
      },
    });
  };

  const debouncedWetHandler = debounce(handleWetChange, fxControlsDebounceTime);
  const debouncedOrderHandler = debounce(
    handleOrderChange,
    fxControlsDebounceTime
  );

  return (
    <div className="fx-controls">
      <div className="fx-control">
        <label htmlFor="wet">Wet</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={wet}
          onChange={debouncedWetHandler}
        />
      </div>
      <div className="fx-control">
        <label htmlFor="order">Order</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={order}
          onChange={debouncedOrderHandler}
        />
      </div>
    </div>
  );
}
