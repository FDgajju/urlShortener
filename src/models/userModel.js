import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "firstName is mandatory"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 8,
    max: 15,
  },

  userName: {
    type: String,
    unique: [true, "user must be unique"],
    required: [true, "userName is required"],
  },

  userVerified: {
    type: Boolean,
    default: false
  },

  verificationCode: String
});

export default mongoose.model("user", userModel)
