import ArrowIcon from "../../../components/svgs/ArrowIcon";
import SpinnerIcon from "../../../components/svgs/SpinnerIcon";
import Button from "../../../components/Button";

const FormStepperButtons = ({
  curStep,
  resetFormHandler,
  previousStepHandler,
  currentStepHandler = () => { },
  nextStepHandler,
  isLoading = false,
  completedSteps,
  lastStep = 4,
  isHiddenSubmitButton = false,
  isDisabledNextButton = false,
  isDisabledSubmitButton = false,
}) => {
  // console.log({ completedSteps });

  return (
    <div className={`flex items-center justify-between gap-5 w-full mt-5`}>
      <div className="flex items-center gap-5">
        {curStep > 1 && (
          <Button variant="light" onClick={previousStepHandler}>
            <ArrowIcon variant="dark" className="rotate-180" />
            <span>Back</span>
          </Button>
        )}
        <Button variant="light" onClick={resetFormHandler} disabled={isLoading}>
          <span>Reset</span>
        </Button>
      </div>

      <div className="flex items-center gap-5">
        {!isHiddenSubmitButton && (
          <Button
            type="submit"
            disabled={
              isLoading ||
              isDisabledSubmitButton
              // ||
              // (completedSteps.includes(curStep) ? true : false)
            }
            onClick={() => currentStepHandler()}
          >
            <span>Submit</span>
            {isLoading && <SpinnerIcon />}
          </Button>
        )}

        {curStep < lastStep && (
          <Button onClick={nextStepHandler} disabled={isDisabledNextButton}>
            <span>Next Step</span>

            <ArrowIcon variant="light" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStepperButtons;
