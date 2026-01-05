import { useState } from "react";
import Button from "../../../components/Button";
import { DynamicGridRow } from "../../../components/DynamicGrid";
import QuestionPlacerMap from "../../Map/components/QuestionPlacerTester";
import SelectedQuestions from "./SelectedQuestions";
import QuestionPlacerCanvas from "./Canvas";

const RuleConditionChildren1 = () => {
  const [tab, setTab] = useState('map');
  const MainComponent = tab === 'canvas' ? QuestionPlacerCanvas : QuestionPlacerMap;
  return (
    <div className="flex flex-1 overflow-hidden flex-col h-full w-full">
      <div className="flex items-center gap-4 pb-4">
        <Button variant={tab === 'map' ? "dark" : "light"} onClick={() => setTab('map')}>Map</Button>
        <Button variant={tab === 'canvas' ? "dark" : "light"} onClick={() => setTab('canvas')}>Canvas</Button>
      </div>
      <DynamicGridRow
        children1={<div><MainComponent /></div>}
        childrend2={<div><SelectedQuestions forWhat={tab} withSelection /></div>}
      />
    </div>

  );
};

export default RuleConditionChildren1;