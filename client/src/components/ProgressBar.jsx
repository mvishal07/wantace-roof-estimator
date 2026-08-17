const ProgressBar = ({
  currentStep,
  totalSteps,
}) => {
  const percentage =
    ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>
          Question {currentStep + 1} of{" "}
          {totalSteps}
        </span>

        <span>
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;