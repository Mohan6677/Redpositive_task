const httpStatus = require("http-status");
const catchAsync = require("./catchAsync");
const { appService } = require("./app.service");

const getUsers = catchAsync(async (req, res) => {
  const users = await appService.getUsers();
  return res.send(users);
});

const createUser = catchAsync(async (req, res) => {
  let newUser = await appService.createUser(req.body);
  return res.status(httpStatus.CREATED).send({
    newUser,
  });
});

const modifyUser = catchAsync(async (req, res) => {
  let user = await appService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  let modifiedUser = await appService.modifyUser(user, req.body);
  return res.status(httpStatus[204]).send({
    modifiedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  let user = await appService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return res.status(httpStatus[204]).send({
    message: "success",
  });
});

module.exports = {
  getUsers,
  createUser,
  modifyUser,
  deleteUser,
};
