// import instance of express 
const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController');

// call function of task controller depending on requested url
router.get("/signIn", userController.signIn);
router.get("/signUp", userController.signUp);
router.post("/create",userController.create);
router.post('/create-session',userController.createSession);
router.get("/profile",userController.profile);

// export router module
module.exports = router;