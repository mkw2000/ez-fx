import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as Tone from "tone";
import { FxControls } from "./components/fx-controls";
import { FxSection } from "./components/fx-section";
import { EffectType, Row } from "./types";
import {
  Analyser,
  Chorus,
  Delay,
  Distortion,
  Phaser,
  Player,
  Reverb,
  UserMedia,
} from "tone";
import { Visualizer } from "./components/visualizer";

const initialState: Row[] = [
  {
    groupName: "active-row",
    effects: [],
  },
  {
    groupName: "disabled-row",
    effects: [
      { id: "1", title: "Reverb" },
      { id: "2", title: "Delay" },
      { id: "3", title: "Chorus" },
      { id: "4", title: "Distortion" },
      { id: "5", title: "Phaser" },
    ],
  },
];

function App() {
  const analyser = useRef<Analyser | null>(null);
  const reverb = useRef<Reverb | null>(null);
  const delay = useRef<Delay | null>(null);
  const chorus = useRef<Chorus | null>(null);
  const distortion = useRef<Distortion | null>(null);
  const phaser = useRef<Phaser | null>(null);
  const mic = useRef<UserMedia | null>(null);
  const player = useRef<Player | null>(null);

  const [rows, setRows] = useState<Row[]>(initialState);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [audioContextStarted, setAudioContextStarted] =
    useState<boolean>(false);
  const [effectsChain, setEffectsChain] = useState<
    Array<Reverb | Chorus | Delay | Distortion | Phaser>
  >([]);

  useEffect(() => {
    player.current = new Tone.Player();

    const MP3 =
      "https://cdn.glitch.com/2929cbe3-bafa-4b5f-833f-7debb607569b%2F1-02%20Blue%20Jeans%20(Gesaffelstein%20Remix).mp3?v=1569254348843";

    player.current.loop = true;
    player.current.autostart = false;
    player.current.loopStart = 1.0;
    player.current.connect(Tone.Master);
    player.current.load(MP3);

    return function cleanup() {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    analyser.current = new Tone.Analyser("waveform", 128);
    return function cleanup() {
      if (analyser.current) {
        analyser.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    reverb.current = new Tone.Reverb();
    return function cleanup() {
      if (reverb.current) {
        reverb.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    chorus.current = new Tone.Chorus();
    return function cleanup() {
      if (chorus.current) {
        chorus.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    delay.current = new Tone.Delay();
    return function cleanup() {
      if (delay.current) {
        delay.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    distortion.current = new Tone.Distortion();
    return function cleanup() {
      if (distortion.current) {
        distortion.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    phaser.current = new Tone.Phaser();
    return function cleanup() {
      if (phaser.current) {
        phaser.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    mic.current = new Tone.UserMedia();
    return function cleanup() {
      if (mic.current) {
        mic.current.dispose();
      }
    };
  }, []);

  const startAudioContext = () => {
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
          });
      }
    });
  };

  useEffect(() => {
    if (player.current && analyser.current) {
      player.current.disconnect();

      player.current.chain(...effectsChain, analyser.current, Tone.Destination);
    } else {
      console.log("player or analyser not ready");
    }
  }, [effectsChain]);

  useEffect(() => {
    reverb.current?.dispose();
    delay.current?.dispose();
    chorus.current?.dispose();
    distortion.current?.dispose();
    phaser.current?.dispose();

    reverb.current = new Reverb();
    delay.current = new Delay();
    chorus.current = new Chorus();
    distortion.current = new Distortion();
    phaser.current = new Phaser();

    const activeFx = rows.filter((row) => row.groupName === "active-row")[0]
      .effects;
    const fxChain: Array<Reverb | Chorus | Delay | Distortion | Phaser> = [];
    activeFx.forEach((fx) => {
      switch (fx.title) {
        case "Reverb":
          if (reverb.current !== null) fxChain.push(reverb.current);
          break;
        case "Delay":
          if (delay.current !== null) fxChain.push(delay.current);
          break;
        case "Chorus":
          if (chorus.current !== null) fxChain.push(chorus.current);
          break;
        case "Distortion":
          if (distortion.current !== null) fxChain.push(distortion.current);
          break;
        case "Phaser":
          if (phaser.current !== null) fxChain.push(phaser.current);
          break;
        default:
          break;
      }
    });
    setEffectsChain(fxChain);
  }, [rows]);

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
          <FxControls selectedEffect={selectedEffect} />
        </div>
        <DragDropContext
          onDragEnd={(result: DropResult) => {
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

            destinationRow[0].effects.splice(
              destination.index,
              0,
              movingEffect
            );
            setRows(clonedRows);
          }}
        >
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
