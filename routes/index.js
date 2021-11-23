const express=require('express');
const router=express.Router();

//for tasks related functionality-add,delete
router.use('/user',require('./user'));
router.use('/posts',require('./post'));

module.exports= router;
