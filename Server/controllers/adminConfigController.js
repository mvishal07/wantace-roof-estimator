const Config = require("../models/Config");
const validateConfig = require("../utils/configValidator");


// GET /api/admin/config
const getAdminConfig = async (req, res) => {
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

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    console.error("Get admin config error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load configuration",
    });
  }
};


// PUT /api/admin/config
const updateAdminConfig = async (req, res) => {
  try {
    const currentConfig = await Config.findOne()
      .sort({ config_version: -1 });

    if (!currentConfig) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    const {
      business,
      questions,
      modifiers,
    } = req.body;

    const validationErrors = validateConfig({
      questions,
      modifiers,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid configuration",
        errors: validationErrors,
      });
    }

    const newConfig = await Config.create({
      config_version:
        currentConfig.config_version + 1,

      business:
        business || currentConfig.business,

      questions,

      modifiers,
    });

    res.status(200).json({
      success: true,
      message: "Configuration updated successfully",
      data: newConfig,
    });

  } catch (error) {
    console.error(
      "Update admin config error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update configuration",
    });
  }
};


module.exports = {
  getAdminConfig,
  updateAdminConfig,
};