import User from "../models/user.model.js";
import createError from "http-errors";
import { generateToken } from "../utils/jwt.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email }).exec();

    if (user) {
      throw createError.Conflict("User already exists!");
    }

    user = new User({ name, email, password });
    user = await user.save();
    const token = await generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true, //accessible only by web server
      sameSite: "None", //cross-site cookie
      maxAge: 30 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    if (user) {
      res.status(201).json({
        message: "Registration successfully done.",
        user,
        token: token,
      });
    } else {
      throw createError.BadRequest("Invalid user data");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw createError.NotFound("User not found");

    const isMatchPassword = await user.isValidPassword(req.body.password);

    if (!isMatchPassword)
      throw createError.Unauthorized("Username/password not valid");

    const token = await generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    
    res.status(200).json({
      message: "Logged in successfully",
      user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "User logout successfully" });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      {
        new: true,
        runValidators: true,
        useFindAndMdify: false,
      }
    );

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateprofile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndMdify: false,
      }
    );

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
