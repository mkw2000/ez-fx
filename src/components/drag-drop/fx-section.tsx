import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import { EffectsEnum, EffectType } from "../../types";
import { Effect } from "./effect";

type Props = {
  onSelect: (effect: string) => void;
  row: any;
  effects: EffectType[];
};

export function FxSection({ onSelect, row, effects }: Props) {
  return (
    <Droppable direction="horizontal" droppableId={row}>
      {(provided) => (
        <div
          className="flex flex-col items-stretch justify-between min-h-full bg-lime-200 h-24
          "
          ref={provided.innerRef}
        >
          <div>{row}</div>
          <div className="flex flex-row overflow-x-scroll max-w-full">
            {effects
              ? effects.map((effect, i) => {
                  return (
                    <div
                      key={effect.id}
                      onClick={() => {
                        onSelect(effect.title);
                      }}
                    >
                      <Effect index={i} effectId={effect.title} />
                    </div>
                  );
                })
              : null}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
