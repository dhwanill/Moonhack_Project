import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['admin', 'participant'],
      required: true,
    },
    contact_details: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
    // New fields to be added
    display_name: {
      type: String,
      required: true,
    },
    profile_url: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    skills: [{
      type: String,
    }],
    interests: [{
      type: String,
    }],
    memberships: [{
      type: Schema.Types.ObjectId,
      ref: 'Membership',
    }],
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }],
    registrations: [{
      type: Schema.Types.ObjectId,
      ref: 'Registration',
    }],
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    resource_bookings: [{
      type: Schema.Types.ObjectId,
      ref: 'ResourceBooking',
    }],
    credits: [{
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    }],
    announcements: [{
      type: Schema.Types.ObjectId,
      ref: 'Announcement',
    }],
    documentation: [{
      type: Schema.Types.ObjectId,
      ref: 'Documentation',
    }],
    feedbacks: [{
      type: Schema.Types.ObjectId,
      ref: 'Feedback',
    }],
    notifications: [{
      type: Schema.Types.ObjectId,
      ref: 'Notification',
    }],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);