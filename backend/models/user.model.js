import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minLength: 2,
      maxLength: 30,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      minLength: 2,
      maxLength: 30,
      validate: [validator.isEmail, "Please enter the valid email"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password should be greater than 8 characters"],
      trim: true,
    },

    role: {
      type: String,
      default: "user",
    },

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

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
const User = mongoose.model("User", userSchema);
export default User;
