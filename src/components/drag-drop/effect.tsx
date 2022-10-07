import { Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";

type Props = {
  effectId: string;
  index: number;
};

export function Effect({ effectId, index }: Props) {
  return (
    <Draggable draggableId={effectId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="h-12 w-12 ml=5 mr-5  flex flex-col overflow-hidden bg-indigo-500"
        >
          <div>{effectId}</div>
        </div>
      )}
    </Draggable>
  );
}
