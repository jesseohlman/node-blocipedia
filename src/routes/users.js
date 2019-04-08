const express = require("express");
const router = express.Router();

const validation = require("../routes/validation");
const userController = require("../controllers/userController");


router.get("/users/signup", userController.signup);
router.post("/users", validation.userValidation,  userController.create);
router.get("/users/signin", userController.signinForm);
router.post("/users/sign", userController.signin);
router.get("/users/signout", userController.signout);





module.exports = router;