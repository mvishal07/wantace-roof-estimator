const calculateEstimate = (config, answers) => {
    if (!config || !Array.isArray(config.questions)) {
        throw new Error("Invalid estimator configuration");
    }

    if (!answers || typeof answers !== "object") {
        throw new Error("Answers are required");
    }

    const { questions, modifiers = {} } = config;


    const questionMap = Object.fromEntries(
        questions.map((question) => [question.key, question])
    );

   
    const isEnabled = (key) => {
        return questionMap[key]?.active !== false;
    };

    const getSelectedOption = (
        key,
        errorMessage
    ) => {
        const question = questionMap[key];

        if (!question) {
            throw new Error(
                `Configuration missing question: ${key}`
            );
        }

        if (!isEnabled(key)) {
            return null;
        }

        if (!Array.isArray(question.options)) {
            throw new Error(
                `Invalid options configuration for ${key}`
            );
        }

        const option = question.options.find(
            (item) => item.value === answers[key]
        );

        if (!option) {
            throw new Error(errorMessage);
        }

        return option;
    };

  
    let roofArea = 0;

    if (isEnabled("roof_area")) {
        const roofAreaQuestion =
            questionMap.roof_area;

        if (!roofAreaQuestion) {
            throw new Error(
                "Configuration missing question: roof_area"
            );
        }

        roofArea = Number(answers.roof_area);

        if (
            !Number.isFinite(roofArea) ||
            roofArea <= 0
        ) {
            throw new Error(
                "Roof area must be a valid positive number"
            );
        }

        if (
            roofArea <
                Number(roofAreaQuestion.min) ||
            roofArea >
                Number(roofAreaQuestion.max)
        ) {
            throw new Error(
                `Roof area must be between ${roofAreaQuestion.min} and ${roofAreaQuestion.max} sq ft`
            );
        }
    }

  

    const material = getSelectedOption(
        "material",
        "Invalid material selection"
    );

 
    const pitch = getSelectedOption(
        "pitch",
        "Invalid roof pitch"
    );


    const layers = getSelectedOption(
        "layers",
        "Invalid roofing layer selection"
    );

    

    const stories = getSelectedOption(
        "stories",
        "Invalid stories selection"
    );

   

    const ratePerSqft = material
        ? Number(material.rate_per_sqft)
        : 0;

    const wasteFactor = Number(
        modifiers.waste_factor ?? 0.10
    );

    const tearOffPerSqft = layers
        ? Number(layers.tear_off_per_sqft)
        : 0;

    const pitchMultiplier = pitch
        ? Number(pitch.multiplier)
        : 1;

    const storiesMultiplier = stories
        ? Number(stories.multiplier)
        : 1;

    const permitFee = Number(
        modifiers.permit_flat_fee ?? 350
    );

    const spread =
        Number(
            modifiers.range_spread_pct ?? 12
        ) / 100;

   

    const numericValues = {
        ratePerSqft,
        wasteFactor,
        tearOffPerSqft,
        pitchMultiplier,
        storiesMultiplier,
        permitFee,
        spread,
    };

    for (const [key, value] of Object.entries(
        numericValues
    )) {
        if (!Number.isFinite(value)) {
            throw new Error(
                `Invalid calculator configuration: ${key}`
            );
        }
    }

   

    const materialCost =
        roofArea * ratePerSqft;

    const materialWithWaste =
        materialCost * (1 + wasteFactor);

    const tearOffCost =
        roofArea * tearOffPerSqft;

    const subtotal =
        materialWithWaste + tearOffCost;

    const pitchAdjusted =
        isEnabled("pitch")
            ? subtotal * pitchMultiplier
            : subtotal;

    

    const storiesAdjusted =
        isEnabled("stories")
            ? pitchAdjusted * storiesMultiplier
            : pitchAdjusted;

    const baseEstimate =
        storiesAdjusted + permitFee;

    

    const estimateLow = Math.round(
        baseEstimate * (1 - spread)
    );

    const estimateHigh = Math.round(
        baseEstimate * (1 + spread)
    );

    return {
        estimateLow,
        estimateHigh,
        baseEstimate: Math.round(
            baseEstimate
        ),
    };
};

module.exports = calculateEstimate;