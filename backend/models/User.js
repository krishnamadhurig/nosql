const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: null,
    },

    profileImage: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// Function to insert user into MongoDB
userSchema.statics.createUser = async function (userData) {
  const user = await this.create(userData);
  return user;
};


// Function to find user by ID
userSchema.statics.findUserByID = async function (userId) {
  const user = await this.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;