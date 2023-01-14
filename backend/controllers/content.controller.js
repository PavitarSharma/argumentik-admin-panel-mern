import Content from "../models/content.model.js";

export const createContentData = async (req, res, next) => {
  try {
    if (!req.body.image || !req.body.content) {
      return res.status(403).json({ message: "Invalid Inputs" });
    }
    let data = new Content(req.body);
    data = await data.save();

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllContentData = async (req, res, next) => {
  try {
    const contents = await Content.find();

    return res.status(200).json({
      success: true,
      contents,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
