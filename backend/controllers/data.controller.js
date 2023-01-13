import Data from "../models/data.model.js";

export const createData = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.contact) {
      return res.status(403).json({ message: "Invalid Inputs" });
    }
    let data = new Data(req.body);
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

export const getAllData = async (req, res, next) => {
  try {
    const data = await Data.find();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
