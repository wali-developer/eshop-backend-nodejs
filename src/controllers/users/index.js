import Joi from "joi";
import { User } from "../../models/User/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(300).required(),
  profile: Joi.string(),
  role: Joi.string(),
});

// Create a user
export const createUser = async (req, res) => {
  const message = userSchema.validate(req.body);
  if (message.error) {
    res.send(message.error.details[0].message);
  } else {
    try {
      const alreadyUser = await User.findOne({ email: req.body.email });
      if (alreadyUser === null) {
        // insert into DB !!
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const userReg = await User.create({
          ...req.body,
          password: hash,
        });
        res.status(200).json({
          success: true,
          message: `User ${req.body.name} is successfully Registered.`,
          user: userReg,
        });
      } else {
        res.status(422).json({
          success: false,
          error: "User is already registered...",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

// User login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        error: "Authentication failed",
      });
    }

    // Check password matches
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Authentication failed",
      });
    }

    const token = generateAccessToken(foundUser._id, email);

    res.status(200).json({
      success: true,
      token,
      user: foundUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message.toString(),
    });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Get user details
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Update user
export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {
      name: req.body?.name,
      email: req.body?.email,
      profile: req.body?.profile,
    });
    if (!user) {
      res.status(400).json({
        success: false,
        error: "The user can't be updated",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Generate Access Token
function generateAccessToken(id, email) {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "1d" });
}
