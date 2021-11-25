// import instance of express 
const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController');
const passport = require('passport');

// call function of task controller depending on requested url
router.get("/signIn", userController.signIn);
router.get("/signUp", userController.signUp);
router.post("/create",userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'},
), userController.createSession);
router.get('/home',userController.home);
router.get("/profile/:id",userController.profile);
router.get('/signOut', userController.destroySession);
router.post('/profileupdate/:id',passport.checkAuthentication, userController.update);

// export router module
module.exports = router;