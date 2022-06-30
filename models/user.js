const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, {}, true);
    },
  },
});

userSchema.pre("save", async function () {
  if (this.isNew || this.isModified) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
