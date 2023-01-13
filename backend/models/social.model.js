import mongoose from "mongoose";
import validator from "validator";

const socialSchema = new mongoose.Schema(
  {
    facebookLink: {
      type: String,
      validate: [validator.isURL, "Please enter the valid url"],
      trim: true,
    },

    instagramLink: {
      type: String,
      validate: [validator.isURL, "Please enter the valid url"],
      trim: true,
    },

    linkedinLink: {
      type: String,
      validate: [validator.isURL, "Please enter the valid url"],
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Social = mongoose.model("Social", socialSchema);
export default Social;
