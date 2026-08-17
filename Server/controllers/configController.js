const Config = require("../models/Config");

const getPublicConfig = async (req, res) => {
  try {
    const config = await Config.findOne()
      .sort({ config_version: -1 })
      .lean();

    if (!config) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    const activeQuestions = config.questions.filter(
      (question) => question.active
    );

    res.status(200).json({
      success: true,
      data: {
        config_version: config.config_version,
        business: config.business,
        questions: activeQuestions,
      },
    });
  } catch (error) {
    console.error("Get config error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load configuration",
    });
  }
};

module.exports = {
  getPublicConfig,
};