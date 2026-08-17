const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    rate_per_sqft: {
      type: Number,
    },

    multiplier: {
      type: Number,
    },

    tear_off_per_sqft: {
      type: Number,
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["number", "select"],
    },

    unit: {
      type: String,
    },

    required: {
      type: Boolean,
      default: false,
    },

    min: {
      type: Number,
    },

    max: {
      type: Number,
    },

    active: {
      type: Boolean,
      default: true,
    },

    options: {
      type: [optionSchema],
      default: [],
    },
  },
  { _id: false }
);

const configSchema = new mongoose.Schema(
  {
    config_version: {
      type: Number,
      required: true,
    },

    business: {
      name: String,
      region: String,
      currency: String,
    },

    questions: {
      type: [questionSchema],
      required: true,
    },

    modifiers: {
      waste_factor: Number,
      permit_flat_fee: Number,
      range_spread_pct: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Config", configSchema);