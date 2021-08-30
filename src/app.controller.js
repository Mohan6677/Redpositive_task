const nodemailer = require("nodemailer");
const httpStatus = require("http-status");
const config = require("./utils/config");
const catchAsync = require("./utils/catchAsync");
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

const sendMail = catchAsync(async (req, res) => {
  let userIds = req.body.ids;
  let details = ``;
  for (let i = 0; i < userIds.length; i++) {
    let user = await appService.getUserById(userIds[i]);
    let singleLine = `name-${user.name} email-${user.email} mobile-${user.phonenumber} hobbies-${user.hobbies},\n`;
    details += singleLine;
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.mailid,
      pass: config.password,
    },
  });

  let mailOptions = {
    from: username,
    to: "info@redpositive.in",
    subject: "coding task testing",
    text: details,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "mail cant be sent",
      });
    } else {
      if (i == emails.length - 1) {
        return res.status(httpStatus.OK).send({
          message: "mail sent successfully",
        });
      }
    }
  });
});

module.exports = {
  getUsers,
  createUser,
  modifyUser,
  deleteUser,
  sendMail,
};
