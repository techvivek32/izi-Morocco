const Steps = ({ steps, curStep, goToSpecificStep }) => {
  return (
    <div className="max-w-4xl relative steps flex justify-between  w-full gap-0 mx-auto h-full">
      {steps.map((step) => {
        return (
          <div
            key={step.id}
            className="z-10 relative flex items-center justify-center"
          >
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => goToSpecificStep(step.id)}
            >
              <div
                className={`flex items-center justify-center font-medium p-5 h-10 w-10 rounded-full border-8 ring-offset-0 duration-300 mb-6 ${
                  curStep >= step.id
                    ? `bg-accent border-accent text-white`
                    : `bg-white border-accent/50 text-accent/60`
                }`}
              >
                {curStep > step.id ? "✔" : step.id}
              </div>
              <p
                className={`absolute bottom-0 text-nowrap text-sm text-center ${
                  curStep >= step.id ? "text-accent" : "text-accent/60"
                }`}
              >
                {step.title}
              </p>
            </div>
            {step.id !== steps.length && (
              <div className={`flex-grow h-2 w-20 lg:w-40 bg-transparent`} />
            )}
          </div>
        );
      })}
      <div className="absolute top-1/3 w-full mx-auto h-2 bg-accent/50 rounded overflow-hidden">
        <div
          className="h-2 bg-accent transition-all duration-500 ease-in-out"
          style={{ width: `${((curStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Steps;
