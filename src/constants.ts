import { Row } from "./types";

export const initialFxState: Row[] = [
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
  