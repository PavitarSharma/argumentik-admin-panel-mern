import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "This input is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
