const express=require('express');
const router=express.Router();
const post_api=require('../../../controllers/api/v1/post_api');
const passport=require('passport');
router.get('/',post_api.index);
router.delete('/:id', passport.authenticate('jwt',{session:true}) ,post_api.destroy);

module.exports= router;