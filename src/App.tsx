import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as Tone from "tone";
import { FxSection, Visualizer, EffectController } from "./components";
import { EffectsEnum, EffectType, Row } from "./types";
import {
  Analyser,
  AutoFilter,
  BitCrusher,
  Chebyshev,
  Chorus,
  Compressor,
  Distortion,
  FeedbackDelay,
  FrequencyShifter,
  Mono,
  Phaser,
  PingPongDelay,
  PitchShift,
  Player,
  Reverb,
  StereoWidener,
  Tremolo,
  UserMedia,
  Vibrato,
} from "tone";
import { initialFxRowsState } from "./constants";
import React from "react";
import { FxOptionsContext } from "./providers";

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
  const stereoWidener = useRef<StereoWidener | null>(null);
  const bitCrusher = useRef<BitCrusher | null>(null);
  const vibrato = useRef<Vibrato | null>(null);
  const tremolo = useRef<Tremolo | null>(null);
  const compressor = useRef<Compressor | null>(null);
  const feedbackDelay = useRef<FeedbackDelay | null>(null);
  const pitchShift = useRef<PitchShift | null>(null);
  const frequencyShifter = useRef<FrequencyShifter | null>(null);
  const autoFilter = useRef<AutoFilter | null>(null);

  const [rows, setRows] = useState<Row[]>(initialFxRowsState);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [audioContextStarted, setAudioContextStarted] =
    useState<boolean>(false);
  const [effectsChain, setEffectsChain] = useState<
    Array<
      | Reverb
      | Chorus
      | PingPongDelay
      | Distortion
      | Phaser
      | Chebyshev
      | StereoWidener
      | Tremolo
      | Vibrato
      | FrequencyShifter
      | FeedbackDelay
      | PitchShift
      | BitCrusher
      | AutoFilter
      | Compressor
    >
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
    stereoWidener.current?.set(effectOptionsState.stereoWidener);
    bitCrusher.current?.set(effectOptionsState.bitCrusher);
    vibrato.current?.set(effectOptionsState.vibrato);
    tremolo.current?.set(effectOptionsState.tremolo);
    compressor.current?.set(effectOptionsState.compressor);
    feedbackDelay.current?.set(effectOptionsState.feedbackDelay);
    pitchShift.current?.set(effectOptionsState.pitchShift);
    frequencyShifter.current?.set(effectOptionsState.frequencyShifter);
    autoFilter.current?.set(effectOptionsState.autoFilter);
  }, [effectOptionsState]);

<<<<<<< HEAD
  useEffect(() => {
    //initialize Tone.js object references

    analyser.current = new Tone.Analyser("waveform", 128);
    reverb.current = new Tone.Reverb(effectOptionsState.reverb);
    chorus.current = new Tone.Chorus(effectOptionsState.chorus);
    pingPongDelay.current = new Tone.PingPongDelay(
      effectOptionsState.pingPongDelay
    );
    distortion.current = new Tone.Distortion(effectOptionsState.distortion);
    phaser.current = new Tone.Phaser(effectOptionsState.phaser);
    chebyshev.current = new Tone.Chebyshev(effectOptionsState.chebyshev);
    stereoWidener.current = new Tone.StereoWidener(
      effectOptionsState.stereoWidener
    );
    bitCrusher.current = new Tone.BitCrusher(effectOptionsState.bitCrusher);
    vibrato.current = new Tone.Vibrato(effectOptionsState.vibrato);
    tremolo.current = new Tone.Tremolo(effectOptionsState.tremolo);
    compressor.current = new Tone.Compressor(effectOptionsState.compressor);
    feedbackDelay.current = new Tone.FeedbackDelay(
      effectOptionsState.feedbackDelay
    );
    pitchShift.current = new Tone.PitchShift(effectOptionsState.pitchShift);
    frequencyShifter.current = new Tone.FrequencyShifter(
      effectOptionsState.frequencyShifter
    );
    autoFilter.current = new Tone.AutoFilter(effectOptionsState.autoFilter);
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
      stereoWidener.current && stereoWidener.current.dispose();
      bitCrusher.current && bitCrusher.current.dispose();
      pitchShift.current && pitchShift.current.dispose();
      frequencyShifter.current && frequencyShifter.current.dispose();
      autoFilter.current && autoFilter.current.dispose();
      tremolo.current && tremolo.current.dispose();
      vibrato.current && vibrato.current.dispose();
      compressor.current && compressor.current.dispose();
      feedbackDelay.current && feedbackDelay.current.dispose();
      mic.current && mic.current.dispose();
      player.current && player.current.dispose();
      mono.current && mono.current.dispose();
    };
  }, []);

=======
>>>>>>> 27987a2b6719bdf9935a65c20ed5808eafd3ece0
  // reconnect input to new signal flow
  useEffect(() => {
    if (mic.current && analyser.current && mono.current) {
      mic.current.disconnect();
      mic.current.chain(
        mono.current,
        ...effectsChain,
        analyser.current,
        Tone.Destination
      );
    }
  }, [effectsChain]);

  // handle drag and drop of effects
  useEffect(() => {
    // refreshing effects before redoing signal flow prevents weird bugs
<<<<<<< HEAD
    reverb.current?.dispose();
    pingPongDelay.current?.dispose();
    chorus.current?.dispose();
    distortion.current?.dispose();
    phaser.current?.dispose();
    chebyshev.current?.dispose();
    stereoWidener.current?.dispose();
    bitCrusher.current?.dispose();
    vibrato.current?.dispose();
    tremolo.current?.dispose();
    compressor.current?.dispose();
    feedbackDelay.current?.dispose();
    pitchShift.current?.dispose();
    frequencyShifter.current?.dispose();
    autoFilter.current?.dispose();
    mono.current?.dispose();

    isEffectActive(EffectsEnum.Reverb)
      ? (reverb.current = new Reverb(effectOptionsState.reverb))
      : null;

    pingPongDelay.current = new PingPongDelay(effectOptionsState.pingPongDelay);
    chorus.current = new Chorus(effectOptionsState.chorus);
    distortion.current = new Distortion(effectOptionsState.distortion);
    phaser.current = new Phaser(effectOptionsState.phaser);
    chebyshev.current = new Chebyshev(effectOptionsState.chebyshev);
    stereoWidener.current = new StereoWidener(effectOptionsState.stereoWidener);
    bitCrusher.current = new BitCrusher(effectOptionsState.bitCrusher);
    vibrato.current = new Vibrato(effectOptionsState.vibrato);
    tremolo.current = new Tremolo(effectOptionsState.tremolo);
    compressor.current = new Compressor(effectOptionsState.compressor);
    feedbackDelay.current = new FeedbackDelay(effectOptionsState.feedbackDelay);
    pitchShift.current = new PitchShift(effectOptionsState.pitchShift);
    frequencyShifter.current = new FrequencyShifter(
      effectOptionsState.frequencyShifter
    );
    autoFilter.current = new AutoFilter(effectOptionsState.autoFilter);

    mono.current = new Mono();
=======
    console.log("destroy and recreate effects");
    cleanupEffects();

    initializeEffects();
>>>>>>> 27987a2b6719bdf9935a65c20ed5808eafd3ece0

    const activeFx = rows.filter((row) => row.groupName === "active-row")[0]
      .effects;
    const fxChain: Array<
      | Reverb
      | Chorus
      | PingPongDelay
      | Distortion
      | Phaser
      | Chebyshev
      | StereoWidener
      | BitCrusher
      | Vibrato
      | Tremolo
      | Compressor
      | FeedbackDelay
      | PitchShift
      | FrequencyShifter
      | AutoFilter
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
        case EffectsEnum.StereoWidener:
          if (stereoWidener.current !== null)
            fxChain.push(stereoWidener.current);
          break;
        case EffectsEnum.BitCrusher:
          if (bitCrusher.current !== null) fxChain.push(bitCrusher.current);
          break;
        case EffectsEnum.Vibrato:
          if (vibrato.current !== null) fxChain.push(vibrato.current);
          break;
        case EffectsEnum.Tremolo:
          if (tremolo.current !== null) fxChain.push(tremolo.current);
          break;
        case EffectsEnum.Compressor:
          if (compressor.current !== null) fxChain.push(compressor.current);
          break;
        case EffectsEnum.FeedbackDelay:
          if (feedbackDelay.current !== null)
            fxChain.push(feedbackDelay.current);
          break;
        case EffectsEnum.PitchShift:
          if (pitchShift.current !== null) fxChain.push(pitchShift.current);
          break;
        case EffectsEnum.FrequencyShifter:
          if (frequencyShifter.current !== null)
            fxChain.push(frequencyShifter.current);
          break;
        case EffectsEnum.AutoFilter:
          if (autoFilter.current !== null) fxChain.push(autoFilter.current);
          break;
        default:
          break;
      }
    });
    setEffectsChain(fxChain);
  }, [rows]);

  // audio context must only be started after some user interaction
  const startAudioContext = () => {
    mic.current = new Tone.UserMedia();

    Tone.start().then(() => {
      setAudioContextStarted(true);

      if (mic.current !== null) {
        mic.current
          .open()
          .then(() => {
            console.log("Mic opened");
          })
          .catch((e) => {
            // promise is rejected when the user doesn't have or allow mic access
            alert(e.message);
          });
      }
    });
  };

  const isEffectActive = (effect: EffectsEnum) => {
    return rows
      .filter((row) => row.groupName === "active-row")[0]
      .effects.some((fx) => fx.title === effect);
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

  const initializeEffects = () => {
    console.log("initializeEffects function");
    analyser.current = new Tone.Analyser("waveform", 128);
    reverb.current = new Tone.Reverb(effectOptionsState.reverb);
    chorus.current = new Tone.Chorus(effectOptionsState.chorus);
    pingPongDelay.current = new Tone.PingPongDelay(
      effectOptionsState.pingPongDelay
    );
    distortion.current = new Tone.Distortion(effectOptionsState.distortion);
    phaser.current = new Tone.Phaser(effectOptionsState.phaser);
    chebyshev.current = new Tone.Chebyshev(effectOptionsState.chebyshev);
    stereoWidener.current = new Tone.StereoWidener(
      effectOptionsState.stereoWidener
    );
    bitCrusher.current = new Tone.BitCrusher(effectOptionsState.bitCrusher);
    vibrato.current = new Tone.Vibrato(effectOptionsState.vibrato);
    tremolo.current = new Tone.Tremolo(effectOptionsState.tremolo);
    compressor.current = new Tone.Compressor(effectOptionsState.compressor);
    feedbackDelay.current = new Tone.FeedbackDelay(
      effectOptionsState.feedbackDelay
    );
    pitchShift.current = new Tone.PitchShift(effectOptionsState.pitchShift);
    frequencyShifter.current = new Tone.FrequencyShifter(
      effectOptionsState.frequencyShifter
    );
    autoFilter.current = new Tone.AutoFilter(effectOptionsState.autoFilter);
    mic.current = new Tone.UserMedia();
    mono.current = new Tone.Mono();
  };

  const cleanupEffects = () => {
    analyser.current && analyser.current.dispose();
    reverb.current && reverb.current.dispose();
    chorus.current && chorus.current.dispose();
    pingPongDelay.current && pingPongDelay.current.dispose();
    distortion.current && distortion.current.dispose();
    phaser.current && phaser.current.dispose();
    chebyshev.current && chebyshev.current.dispose();
    stereoWidener.current && stereoWidener.current.dispose();
    bitCrusher.current && bitCrusher.current.dispose();
    pitchShift.current && pitchShift.current.dispose();
    frequencyShifter.current && frequencyShifter.current.dispose();
    autoFilter.current && autoFilter.current.dispose();
    tremolo.current && tremolo.current.dispose();
    vibrato.current && vibrato.current.dispose();
    compressor.current && compressor.current.dispose();
    feedbackDelay.current && feedbackDelay.current.dispose();
    mic.current && mic.current.dispose();
    mono.current && mono.current.dispose();
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
          {selectedEffect ? <EffectController effect={selectedEffect} /> : null}
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
