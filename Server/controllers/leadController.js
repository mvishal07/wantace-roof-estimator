const Lead = require("../models/Lead");

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .sort({ captured_at: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load leads",
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(
      req.params.id
    ).lean();

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("Get lead error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load lead",
    });
  }
};

module.exports = {
  getLeads,
  getLeadById,
};