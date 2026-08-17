const validateConfig = (config) => {
  const errors = [];

  if (!Array.isArray(config.questions)) {
    errors.push("questions must be an array");
    return errors;
  }

  if (!config.modifiers) {
    errors.push("modifiers are required");
    return errors;
  }

  if (config.modifiers.waste_factor < 0) {
    errors.push(
      "waste_factor cannot be negative"
    );
  }

  if (config.modifiers.permit_flat_fee < 0) {
    errors.push(
      "permit_flat_fee cannot be negative"
    );
  }

  if (config.modifiers.range_spread_pct < 0) {
    errors.push(
      "range_spread_pct cannot be negative"
    );
  }

  for (const question of config.questions) {
    if (!question.key) {
      errors.push(
        "Every question must have a key"
      );
    }

    if (!question.label) {
      errors.push(
        `Question ${question.key || "unknown"} must have a label`
      );
    }

    if (
      question.type !== "number" &&
      question.type !== "select"
    ) {
      errors.push(
        `Invalid type for question ${question.key}`
      );
    }

    if (question.type === "select") {
      if (!Array.isArray(question.options)) {
        errors.push(
          `${question.key} options must be an array`
        );
      }
    }
  }

  return errors;
};

module.exports = validateConfig;