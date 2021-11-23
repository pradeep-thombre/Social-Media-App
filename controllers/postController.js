const posts=require('../models/post');

module.exports.create=function(req,res){
    posts.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log("err");
        }

        return res.redirect('back');
    });
}
