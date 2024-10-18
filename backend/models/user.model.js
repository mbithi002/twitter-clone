import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId], // Array of ObjectId
      ref: "user",
      default: [], // Default is an empty array
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId], // Array of ObjectId
      ref: "user",
      default: [], // Default is an empty array
    },
    profileImg: {
      type: String,
      default: "", // Removed extra comma
    },
    coverImg: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
