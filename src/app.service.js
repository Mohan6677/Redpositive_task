const User = require("./app.model");
const httpStatus = require("http-status");
const ApiError = require("./ApiError");

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getUsers = async () => {
  return users.find({});
};

const createUser = async (userBody) => {
  let isEmailTaken = await User.isEmailTaken(userBody.email);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.OK, "Email already taken");
  }
  let user = await User.create(userBody);
  return user;
};

const modifyUser = async (userBody) => {
  user.name = userBody.name;
  user.phonenumber = userBody.phonenumber;
  let isEmailTaken = await User.isEmailTaken(userBody.email);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.OK, "Email already taken");
  }
  user.email = userBody.email;
  user.hobbies = userBody.hobbies;
  await user.save();
  return user;
};

const deleteUser = async (user) => {
  await User.findOneAndDelete(user, (err) => {
    if (err) {
      throw new ApiError(httpStatus[404], "User not found");
    }
  });
};

module.exports.appService = {
  getUserById,
  getUsers,
  createUser,
  modifyUser,
  deleteUser,
};
