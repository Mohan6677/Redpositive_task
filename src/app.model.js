const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trime: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Invalid Phone Number");
        }
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id ");
        }
      },
    },
    hobbies: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  let users = await this.find({ email: email });
  if (users.length !== 0) {
    return true;
  } else {
    return false;
  }
};

const users = mongoose.model("users", videoSchema);

module.exports = users;
