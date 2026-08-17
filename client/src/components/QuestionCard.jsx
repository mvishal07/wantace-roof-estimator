const QuestionCard = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="question-card">
      <label>
        {question.label}
      </label>

      {question.type === "number" && (
        <div>
          <input
            type="number"
            value={value || ""}
            min={question.min}
            max={question.max}
            onChange={(event) =>
              onChange(event.target.value)
            }
          />

          {question.unit && (
            <span>{question.unit}</span>
          )}

          <p>
            Enter between {question.min} and{" "}
            {question.max} {question.unit}
          </p>
        </div>
      )}

      {question.type === "select" && (
        <div className="options">
          {question.options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={
                value === option.value
                  ? "option selected"
                  : "option"
              }
              onClick={() =>
                onChange(option.value)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;