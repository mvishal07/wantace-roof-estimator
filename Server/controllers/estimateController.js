const Config = require("../models/Config");
const Lead = require("../models/Lead");

const calculateEstimate = require("../services/calculator");

const createEstimate = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      answers,
    } = req.body;

    // Basic contact validation
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and email are required",
      });
    }

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({
        success: false,
        message: "Answers are required",
      });
    }

    // Get latest configuration
    const config = await Config.findOne()
      .sort({ config_version: -1 });

    if (!config) {
      return res.status(500).json({
        success: false,
        message: "Configuration not found",
      });
    }

    // Validate required active questions
    const activeQuestions = config.questions.filter(
      (question) => question.active
    );

    for (const question of activeQuestions) {
      if (
        question.required &&
        (answers[question.key] === undefined ||
          answers[question.key] === null ||
          answers[question.key] === "")
      ) {
        return res.status(400).json({
          success: false,
          message: `${question.label} is required`,
        });
      }
    }

    // Calculate estimate on server
    const result = calculateEstimate(
      config,
      answers
    );

    // Save lead
    const lead = await Lead.create({
      name,
      phone,
      email,
      answers,
      estimate_low: result.estimateLow,
      estimate_high: result.estimateHigh,
      config_version: config.config_version,
    });

    res.status(201).json({
      success: true,
      data: {
        leadId: lead._id,
        estimateLow: result.estimateLow,
        estimateHigh: result.estimateHigh,
        configVersion: config.config_version,
      },
    });
  } catch (error) {
    console.error("Create estimate error:", error);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to calculate estimate",
    });
  }
};

module.exports = {
  createEstimate,
};