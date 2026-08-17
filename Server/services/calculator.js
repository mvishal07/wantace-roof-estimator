const calculateEstimate = (config, answers) => {
    const questions = config.questions;

    const roofAreaQuestion = questions.find(
        (question) => question.key === "roof_area"
    );

    const materialQuestion = questions.find(
        (question) => question.key === "material"
    );

    const pitchQuestion = questions.find(
        (question) => question.key === "pitch"
    );

    const layersQuestion = questions.find(
        (question) => question.key === "layers"
    );

    const storiesQuestion = questions.find(
        (question) => question.key === "stories"
    );

    const roofArea = Number(answers.roof_area);

    if (!roofAreaQuestion || !roofArea) {
        throw new Error("Roof area is required");
    }

    if (
        roofArea < roofAreaQuestion.min ||
        roofArea > roofAreaQuestion.max
    ) {
        throw new Error(
            `Roof area must be between ${roofAreaQuestion.min} and ${roofAreaQuestion.max} sq ft`
        );
    }

    const material = materialQuestion.options.find(
        (option) => option.value === answers.material
    );

    if (!material) {
        throw new Error("Invalid material selection");
    }

    const pitch = pitchQuestion.options.find(
        (option) => option.value === answers.pitch
    );

    if (!pitch) {
        throw new Error("Invalid roof pitch");
    }

    const layers = layersQuestion.options.find(
        (option) => option.value === answers.layers
    );

    if (!layers) {
        throw new Error("Invalid roofing layer selection");
    }

    const stories = storiesQuestion.options.find(
        (option) => option.value === answers.stories
    );

    if (!stories) {
        throw new Error("Invalid stories selection");
    }


    const materialCost =
        roofArea * material.rate_per_sqft;


    const materialWithWaste =
        materialCost * (1 + config.modifiers.waste_factor);


    const tearOffCost =
        roofArea * layers.tear_off_per_sqft;

    const subtotal =
        materialWithWaste + tearOffCost;


    const pitchAdjusted =
        subtotal * pitch.multiplier;


    const storiesAdjusted =
        pitchAdjusted * stories.multiplier;


    const baseEstimate =
        storiesAdjusted + config.modifiers.permit_flat_fee;


    const spread =
        config.modifiers.range_spread_pct / 100;

    const estimateLow =
        Math.round(baseEstimate * (1 - spread));

    const estimateHigh =
        Math.round(baseEstimate * (1 + spread));

    return {
        estimateLow,
        estimateHigh,
        baseEstimate: Math.round(baseEstimate),
    };
};

module.exports = calculateEstimate;