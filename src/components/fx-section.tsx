import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import { EffectType } from "../types";
import { Effect } from "./effect";

type Props = {
  onSelect: (effect: string) => void;
  row: any;
  effects: EffectType[];
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  min-height: 100%;
  min-width: 100%;
`;
const Title = styled.h3``;
const Effects = styled.div`
  display: flex;
  flex-direction: row;
`;

export function FxSection({ onSelect, row, effects }: Props) {
  return (
    <Droppable direction="horizontal" droppableId={row}>
      {(provided) => (
        <Container ref={provided.innerRef}>
          <Title>{row}</Title>
          <Effects className="effects">
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
          </Effects>
        </Container>
      )}
    </Droppable>
  );
}
