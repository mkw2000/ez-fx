import React from "react";
import { initialState } from "../constants";
import {
  ChorusOptions,
  DistortionOptions,
  PhaserOptions,
  PingPongDelayOptions,
  ReverbOptions,
} from "../types";

export function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState; // we never actually use this
  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<
      React.Reducer<StateType, ActionType>
    >(reducer, initialState);
    return (
      <ctx.Provider value={{ state, dispatch }}>{props.children}</ctx.Provider>
    );
  }
  return [ctx, Provider] as const;
}

// usage
type AppState = typeof initialState;
type Action =
  | { type: "update-reverb"; payload: ReverbOptions }
  | { type: "update-ping-pong-delay"; payload: PingPongDelayOptions }
  | { type: "update-distortion"; payload: DistortionOptions }
  | { type: "update-chorus"; payload: ChorusOptions }
  | { type: "update-phaser"; payload: PhaserOptions };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "update-reverb":
      return { ...state, reverb: action.payload };
    case "update-ping-pong-delay":
      return { ...state, pingPongDelay: action.payload };
    case "update-distortion":
      return { ...state, distortion: action.payload };
    case "update-chorus":
      return { ...state, chorus: action.payload };
    case "update-phaser":
      return { ...state, phaser: action.payload };
    default:
      throw new Error();
  }
}
const [ctx, OptionsProvider] = createCtx(reducer, initialState);

export const OptionsContext = ctx;
