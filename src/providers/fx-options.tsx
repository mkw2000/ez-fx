import React, { createContext, useReducer, Dispatch } from "react";

import { initialState } from "../constants";
import {
  ReverbOptions,
  ChorusOptions,
  DistortionOptions,
  PhaserOptions,
  PingPongDelayOptions,
  ChebyshevOptions,
  OptionsState,
  StereoWidenerOptions,
} from "../types";

type ProviderProps = {
  children: React.ReactNode;
};

type AppState = typeof initialState;

type Action =
  | { type: "update-reverb"; payload: ReverbOptions }
  | { type: "update-ping-pong-delay"; payload: PingPongDelayOptions }
  | { type: "update-distortion"; payload: DistortionOptions }
  | { type: "update-chorus"; payload: ChorusOptions }
  | { type: "update-phaser"; payload: PhaserOptions }
  | { type: "update-chebyshev"; payload: ChebyshevOptions }
  | { type: "update-stereo-widener"; payload: StereoWidenerOptions };

const FxOptionsContext = createContext<{
  state: OptionsState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: OptionsState, action: Action): AppState {
  switch (action.type) {
    case "update-reverb":
      console.log("updatttteeee", action.payload);
      return { ...state, reverb: action.payload };
    case "update-ping-pong-delay":
      return { ...state, pingPongDelay: action.payload };
    case "update-distortion":
      return { ...state, distortion: action.payload };
    case "update-chorus":
      return { ...state, chorus: action.payload };
    case "update-phaser":
      return { ...state, phaser: action.payload };
    case "update-chebyshev":
      return { ...state, chebyshev: action.payload };
    case "update-stereo-widener":
      return { ...state, stereoWidener: action.payload };
    default:
      throw new Error();
  }
}

const FxOptionsProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FxOptionsContext.Provider value={{ state, dispatch }}>
      {children}
    </FxOptionsContext.Provider>
  );
};

export { FxOptionsProvider, FxOptionsContext };
