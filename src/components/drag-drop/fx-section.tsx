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
    <div className="mt-5 mb-5 min-h-24 flex flex-col">
      <div className="font-bold min-w-full flex flex-row justify-center items-center">
        {row}
      </div>

      <Droppable direction="horizontal" droppableId={row}>
        {(provided) => (
          <div
            className="flex flex-col items-stretch justify-between h-24
          "
            ref={provided.innerRef}
          >
            <div className="flex flex-row overflow-x-scroll max-w-full justify-start items-center">
              {effects.length > 0 ? (
                effects.map((effect, i) => {
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
              ) : (
                <div className="h-12 min-w-full flex flex-row items-center justify-center">
                  no effects
                </div>
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
