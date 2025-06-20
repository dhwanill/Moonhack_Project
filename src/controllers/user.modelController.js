import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Function to generate both access and refresh tokens
const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating the JWT tokens");
  }
};

// Get all users
const getallUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -refreshToken");
  return new res.status(201).json(
    new ApiResponse(200, users, "All Users")
  );
});

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, phone, role, display_name, profile_url, department, year, contact_number } = req.body;

  // Check if required fields are provided
  if ([fullName, email, username, password, phone, display_name, profile_url, department, year, contact_number].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure the role is either "admin" or "participant"
  if (role !== "admin" && role !== "participant") {
    throw new ApiError(400, "Role must be either admin or participant");
  }

  // Check if the user already exists by email or username
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new ApiError(409, "User Email or Username already exists!");
  }

  // Create new user
  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
    contact_details: phone,
    role,
    display_name,
    profile_url,
    department,
    year,
    contact_number
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

// Log in user and generate access and refresh tokens
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Username or Email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "User not found, you may not be registered properly");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate tokens.");
  }

  const loggedInUser = await User.findById(user._id).select("-refreshToken -password");

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")
    );
});

// Log out user by clearing the tokens
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Refresh access token using the refresh token
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingAccessToken = res.cookies.accessToken || res.body.accessToken;

    if (!incomingAccessToken) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const decodedToken = Jwt.verify(incomingAccessToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingAccessToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { accessToken, refreshToken }, "Access and refresh tokens updated"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken, getallUsers };