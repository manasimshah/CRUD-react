const express = require("express");
const {handleUserDetailsController, handleUsersController, handleDeleteUserController, handleUpdateUserController} = require("../controller/user.controller");

const router = express.Router();

router.post("/addUser", handleUserDetailsController);
router.get("/userList", handleUsersController);
router.post("/deleteUser", handleDeleteUserController);
router.put("/updateUser", handleUpdateUserController);

module.exports = router;