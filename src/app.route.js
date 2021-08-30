const express = require("express");
const appController = require("./app.controller");

const router = express.Router();

router.get("/read", appController.getUsers);

router.post("/create", appController.createUser);

router.put("/update", appController.modifyUser);

router.delete("/delete", appController.deleteUser);

router.post("/sendEmail", appController.sendMail);

module.exports = router;
