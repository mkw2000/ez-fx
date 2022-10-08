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
    <div className="mt-5 mb-5 flex flex-col">
      <div className="font-bold flex flex-row justify-center items-center">
        {row === "disabled-row" ? "Disabled" : "Active"}
      </div>

      <Droppable direction="vertical" droppableId={row}>
        {(provided) => (
          <div
            className="flex flex-col justify-between"
            ref={provided.innerRef}
          >
            <div className="pt-5 pb-5 flex flex-col justify-center items-center">
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
                <div className="flex items-center justify-center">
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
