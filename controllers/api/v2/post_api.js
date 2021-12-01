const Post=require('../../../models/post');


module.exports.index=async function(req,res){
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).exec();

        return res.json(200,{
            message:'list of post',
            posts:posts
        });
}