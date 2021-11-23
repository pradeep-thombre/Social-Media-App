const express=require('express');
const router=express.Router();

//for tasks related functionality-add,delete
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments', require('./comments'));

module.exports= router;
