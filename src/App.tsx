import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as Tone from "tone";
import { FxControls, FxSection, Visualizer } from "./components";
import { EffectsEnum, EffectType, Row } from "./types";
import {
  Analyser,
  Chebyshev,
  Chorus,
  Distortion,
  Mono,
  Phaser,
  PingPongDelay,
  Player,
  Reverb,
  UserMedia,
} from "tone";
import { initialFxRowsState } from "./constants";
import React from "react";
import { FxOptionsContext, FxOptionsProvider } from "./providers";

function App() {
  const analyser = useRef<Analyser | null>(null);
  const reverb = useRef<Reverb | null>(null);
  const pingPongDelay = useRef<PingPongDelay | null>(null);
  const chorus = useRef<Chorus | null>(null);
  const distortion = useRef<Distortion | null>(null);
  const chebyshev = useRef<Chebyshev | null>(null);
  const phaser = useRef<Phaser | null>(null);
  const mic = useRef<UserMedia | null>(null);
  const player = useRef<Player | null>(null);
  const mono = useRef<Mono | null>(null);
  const [rows, setRows] = useState<Row[]>(initialFxRowsState);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [audioContextStarted, setAudioContextStarted] =
    useState<boolean>(false);
  const [effectsChain, setEffectsChain] = useState<
    Array<Reverb | Chorus | PingPongDelay | Distortion | Phaser | Chebyshev>
  >([]);
  const { state: effectOptionsState, dispatch } =
    React.useContext(FxOptionsContext);

  useEffect(() => {
    reverb.current?.set(effectOptionsState.reverb);
    pingPongDelay.current?.set(effectOptionsState.pingPongDelay);
    distortion.current?.set(effectOptionsState.distortion);
    chorus.current?.set(effectOptionsState.chorus);
    phaser.current?.set(effectOptionsState.phaser);
    chebyshev.current?.set(effectOptionsState.chebyshev);
  }, [effectOptionsState]);

  useEffect(() => {
    //initialize Tone.js object references

    // player.current = new Tone.Player();
    // const MP3 =
    //   "https://cdn.glitch.com/2929cbe3-bafa-4b5f-833f-7debb607569b%2F1-02%20Blue%20Jeans%20(Gesaffelstein%20Remix).mp3?v=1569254348843";

    // player.current.loop = true;
    // player.current.autostart = false;
    // player.current.loopStart = 1.0;
    // player.current.connect(Tone.Master);
    // player.current.load(MP3);

    analyser.current = new Tone.Analyser("waveform", 128);
    reverb.current = new Tone.Reverb(effectOptionsState.reverb);
    chorus.current = new Tone.Chorus(effectOptionsState.chorus);
    pingPongDelay.current = new Tone.PingPongDelay(
      effectOptionsState.pingPongDelay
    );
    distortion.current = new Tone.Distortion(effectOptionsState.distortion);
    phaser.current = new Tone.Phaser(effectOptionsState.phaser);
    chebyshev.current = new Tone.Chebyshev(effectOptionsState.chebyshev);
    mic.current = new Tone.UserMedia();
    mono.current = new Tone.Mono();

    //dispose of all references on unmount
    return function cleanup() {
      analyser.current && analyser.current.dispose();
      reverb.current && reverb.current.dispose();
      chorus.current && chorus.current.dispose();
      pingPongDelay.current && pingPongDelay.current.dispose();
      distortion.current && distortion.current.dispose();
      phaser.current && phaser.current.dispose();
      chebyshev.current && chebyshev.current.dispose();
      mic.current && mic.current.dispose();
      player.current && player.current.dispose();
      mono.current && mono.current.dispose();
    };
  }, []);

  // reconnect input to new signal flow
  useEffect(() => {
    if (mic.current && analyser.current && mono.current) {
      console.log("reconnecting stuff", reverb.current?.get(), effectsChain);

      mic.current.disconnect();
      mic.current.chain(...effectsChain, analyser.current, Tone.Destination);
    } else {
      alert("Oops, something went wrong -_-");
    }
  }, [effectsChain]);

  // handle drag and drop of effects
  useEffect(() => {
    // refreshing effects before redoing signal flow prevents weird bugs
    reverb.current?.dispose();
    pingPongDelay.current?.dispose();
    chorus.current?.dispose();
    distortion.current?.dispose();
    phaser.current?.dispose();
    chebyshev.current?.dispose();
    mono.current?.dispose();

    reverb.current = new Reverb(effectOptionsState.reverb);
    pingPongDelay.current = new PingPongDelay(effectOptionsState.pingPongDelay);
    chorus.current = new Chorus(effectOptionsState.chorus);
    distortion.current = new Distortion(effectOptionsState.distortion);
    phaser.current = new Phaser(effectOptionsState.phaser);
    chebyshev.current = new Chebyshev(effectOptionsState.chebyshev);
    mono.current = new Mono();

    const activeFx = rows.filter((row) => row.groupName === "active-row")[0]
      .effects;
    const fxChain: Array<
      Reverb | Chorus | PingPongDelay | Distortion | Phaser | Chebyshev
    > = [];
    activeFx.forEach((fx) => {
      switch (fx.title) {
        case EffectsEnum.Reverb:
          if (reverb.current !== null) fxChain.push(reverb.current);
          break;
        case EffectsEnum.PingPongDelay:
          if (pingPongDelay.current !== null)
            fxChain.push(pingPongDelay.current);
          break;
        case EffectsEnum.Chorus:
          if (chorus.current !== null) fxChain.push(chorus.current);
          break;
        case EffectsEnum.Distortion:
          if (distortion.current !== null) fxChain.push(distortion.current);
          break;
        case EffectsEnum.Phaser:
          if (phaser.current !== null) fxChain.push(phaser.current);
          break;
        case EffectsEnum.Chebyshev:
          if (chebyshev.current !== null) fxChain.push(chebyshev.current);
          break;
        default:
          break;
      }
    });
    setEffectsChain(fxChain);
  }, [rows]);

  // audio context must only be started after some user interaction
  const startAudioContext = () => {
    console.log("starting audio context");
    Tone.start().then(() => {
      setAudioContextStarted(true);

      if (mic.current !== null) {
        mic.current
          .open()
          .then(() => {
            if (player.current !== null) {
              player.current.start();
            }
          })
          .catch((e) => {
            // promise is rejected when the user doesn't have or allow mic access
            alert(e.message);
          });
      }
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const clonedRows: Row[] = structuredClone(rows);

    const sourceRow = clonedRows.filter(
      (row: Row) => row.groupName === source.droppableId
    );

    const destinationRow = clonedRows.filter(
      (row: Row) => row.groupName === destination.droppableId
    );

    const [movingEffect] = sourceRow[0].effects.filter(
      (effect: EffectType) => effect.title === draggableId
    );

    sourceRow[0].effects.splice(source.index, 1);

    destinationRow[0].effects.splice(destination.index, 0, movingEffect);
    setRows(clonedRows);
  };

  return (
    <div className="app-container">
      <div className="app-header">EzFx</div>
      {!audioContextStarted ? (
        <button
          onClick={() => {
            startAudioContext();
          }}
        >
          start audio context
        </button>
      ) : null}
      <div className="app-main">
        <div className="fx-controls">
          {selectedEffect ? (
            <FxControls selectedEffect={selectedEffect} />
          ) : null}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          {rows
            ? rows.map((row: Row, i: number) => {
                return (
                  <FxSection
                    onSelect={setSelectedEffect}
                    key={row.groupName + i}
                    row={row.groupName}
                    effects={row.effects}
                  />
                );
              })
            : null}
        </DragDropContext>
      </div>
      <Visualizer analyser={analyser.current} />
    </div>
  );
}

export default App;
