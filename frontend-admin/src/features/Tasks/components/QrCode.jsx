import React from "react";
import FormStepperButtons from "./FormStepperButtons";

const QrCode = ({
  curStep,
  previousStepHandler,
  nextStepHandler,
  completedSteps,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-xl">QR Code Section</h3>
      <FormStepperButtons
        curStep={curStep}
        previousStepHandler={previousStepHandler}
        nextStepHandler={nextStepHandler}
        isLoading={false}
        completedSteps={completedSteps}
      />
    </div>
  );
};

export default QrCode;
