import { Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";

type Props = {
  effectId: string;
  index: number;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p``;

export function Effect({ effectId, index }: Props) {
  return (
    <Draggable draggableId={effectId} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="effect"
        >
          <Title>{effectId}</Title>
        </Container>
      )}
    </Draggable>
  );
}
