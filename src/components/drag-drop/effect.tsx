import { Draggable } from "@hello-pangea/dnd";

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
          className="h-12 w-12 ml=5 mr-5 flex flex-col overflow-hidden border-solid border-2 rounded border-sky-500 items-center justify-center"
        >
          <div>{effectId.slice(0, 5).toUpperCase()}</div>
        </div>
      )}
    </Draggable>
  );
}
