import { Draggable } from "@hello-pangea/dnd";
import { formatEffectName } from "../../utils";

type Props = {
  effectId: string;
  index: number;
};

export function Effect({ effectId, index }: Props) {
  const effectTitle = formatEffectName(effectId);

  return (
    <Draggable draggableId={effectId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="h-12 w-72 m-1 flex flex-col overflow-hidden border-solid border-2 rounded border-sky-500 items-center justify-center"
        >
          <div>{effectTitle}</div>
        </div>
      )}
    </Draggable>
  );
}
