import { HeaderType } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuestions } from "../../../slices/gameSlice";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TableHeader from "../../../components/table/TableHeader";
import { EmptyData } from "../../../components/EmptyData";
import SortableField from "./SortableField";

const SelectedQuestions = ({ withSelection = false, forWhat = "map" }) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const { selectedQuestions } = useSelector((state) => state.games);

  // console.log({ selectedQuestions })
  const dispatch = useDispatch();

  const handleRemove = (questionId) => {
    const filteredQuestions = selectedQuestions.filter(
      (q) => q.id !== questionId
    );
    dispatch(setSelectedQuestions(filteredQuestions));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = selectedQuestions.findIndex((f) => f.id === active.id);
      const newIndex = selectedQuestions.findIndex((f) => f.id === over.id);
      const newQuestions = arrayMove(selectedQuestions, oldIndex, newIndex);
      dispatch(setSelectedQuestions(newQuestions));
    }
  };
  const columns = [
    { value: "index", name: "Order" },
    {
      value: "name",
      name: "Question",
      _class: withSelection ? "col-span-2" : "col-span-4",
    },
    {
      value: "tags",
      name: "Tags",
      _class: "col-span-2",
      type: HeaderType.tooltip,
    },
    {
      value: "points",
      name: "Points",
      type: HeaderType.roleBudge,
      _class: "col-span-2",
    },
    {
      value: "radius",
      name: "Radius (m)",
      _class: "col-span-2",
    },
    // Conditionally add selectQuestion column
    ...(withSelection
      ? [
        {
          value: "",
          name: "Selected",
          _class: "col-span-1",
        },
        {
          value: "",
          name: "Placed",
          _class: "col-span-1",
        },
      ]
      : []),
    {
      name: "Clear",
      value: "actions",
      type: HeaderType.dynamicAction,
    },
  ];

  if (selectedQuestions.length === 0) return <EmptyData isCompressView />;

  return (
    <div className="w-full h-auto overflow-scroll">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <TableHeader data={columns} isCompressView />
        <SortableContext
          items={selectedQuestions.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {selectedQuestions.map((field) => (
              <SortableField
                key={field.id}
                id={field.id}
                name={field.name}
                points={field.points}
                index={field.index}
                tags={field.tags}
                locationRadius={field.locationRadius}
                isSelected={field.isSelected}
                isPlaced={forWhat === "canvas" ? field.isPlacedCanvas : field.isPlaced}
                handleRemove={handleRemove}
                withSelection={withSelection}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SelectedQuestions;
