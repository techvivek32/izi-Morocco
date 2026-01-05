import { useSortable } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedQuestionFromQuestions,
  setSelectedQuestions,
} from "../../../slices/gameSlice";
import TooltipWrapper from "../../../components/TooltipWrapper";
import CrossIcon from "../../../components/svgs/CrossIcon";
import TooltipForTags from "../../../components/TooltipForTags";
import CommonInput from "../../../components/form/CommonInput";
import CheckBox from "../../../components/form/Checkbox";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../../lib/utils";
import DisabledWrapper from "../../../components/DisabledWrapper";

// Sortable row for each field
export default function SortableField({
  id,
  name,
  points,
  tags,
  index,
  handleRemove,
  locationRadius,
  isSelected,
  isPlaced,
  withSelection,
}) {
  const { selectedQuestions } = useSelector((state) => state.games);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const dispatch = useDispatch();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCheckboxChange = (index = -1) => {
    const updatedQuestions = selectedQuestions.map((field) => {
      return {
        ...field,
        isSelected: field.index === index ? true : false,
      };
    });
    dispatch(setSelectedQuestions(updatedQuestions));
    dispatch(setSelectedQuestionFromQuestions());
  };

  const handleRadiusChange = (val) => {
    const updatedQuestions = selectedQuestions.map((field) => {
      if (field.index === index) {
        return {
          ...field,
          locationRadius: val,
        };
      }
      return field;
    });
    dispatch(setSelectedQuestions(updatedQuestions));
  };

  return (
    <DisabledWrapper where={isPlaced}>
      <div
        ref={setNodeRef}
        style={style}
        className="grid grid-cols-12 bg-white rounded-md border border-accent/50 text-xs lg:text-sm items-center justify-center"
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab flex items-center col-span-1 p-2"
        >
          <span className="bg-accent/20 rounded-full flex h-5 w-5 items-center justify-center">
            {index}
          </span>
        </div>

        <div className={cn(withSelection ? "col-span-2" : "col-span-4", "p-2")}>
          {name.length > 15 ? name.slice(0, 15) + "..." : name || "N/A"}
        </div>
        <TooltipForTags data={tags} _class="col-span-2 p-2" />
        <div className="col-span-2 p-2">{points ?? "N/A"}</div>
        <div className="col-span-2 p-2">
          <CommonInput
            type="number"
            isCompress
            value={locationRadius || 0}
            onChange={handleRadiusChange}
          />
        </div>
        {withSelection && (
          <div className="col-span-1 p-2">
            <CheckBox
              handleChecked={() => handleCheckboxChange(index)}
              name={`questions.${index}.isSelected`}
              checked={isSelected}
              disabled={isPlaced}
            />
          </div>
        )}
        {withSelection && (
          <div className="col-span-1 p-2">
            <CheckBox
              disabled
              name={`questions.${index}.isPlaced`}
              checked={isPlaced}
            />
          </div>
        )}

        <TooltipWrapper
          content={"Remove Task"}
          place="right"
          className="p-2 h-7 w-7 flex items-center justify-center rounded-full hover:bg-accent/10 cursor-pointer"
        >
          {" "}
          <span onClick={() => handleRemove(id)}>
            <CrossIcon variant="dark" className="cursor-pointer rotate-180" />
          </span>
        </TooltipWrapper>
      </div>
    </DisabledWrapper>
  );
}
