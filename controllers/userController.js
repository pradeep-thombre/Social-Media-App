const User = require('../models/user');
const Post=require('../models/post');
const fs=require('fs');
const path=require('path');

module.exports.profile =async function(req, res){
    if(! req.isAuthenticated()){
        req.flash('success','User Not Logged-In Redirecting to login ...');
        return res.redirect('/user/signIn');
    }
    try{
        let user=await User.findById(req.params.id);
        req.flash('success','Redirecting to Profile ...');
        return res.render('profile', {
            title: 'User Profile',
            profileuser:user
        });
    }
    catch(err){
        return res.redirect('back');
    }
}
module.exports.update=async function(req,res){
    if(req.params.id==req.user.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*****Multer error:',err)}
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=user.avatarPath+'/'+req.file.filename
                }
                user.save();
            });
            req.flash('success','User Details Updated Successfully!');
        }catch(err){
            req.flash('error','Error'+err);
        }
        finally{
            return res.redirect('back');
        }
        
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('signUp', {
        title: "FunChat | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/home');
    }
    return res.render('signIn', {
        title: "FunChat | Sign In"
    });
}

// get the sign up data
module.exports.create =async function(req, res){
    if (req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if (!user){
            User.create(req.body);
            req.flash('User Created successfully!');
            return res.redirect('/user/signIn');
        }else{
            return res.redirect('back');
        }
    }
    catch{
        req.flash('error in finding user in signing up','Error'+err);
        return res.redirect('back');
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/user/home');
    
}

module.exports.destroySession = function(req, res){
    
    req.logout();
    req.flash('success','You are Logged out Successfully');
    return res.redirect('/user/signIn');
}


module.exports.home=async function(req,res){
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).exec();

        let user=await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users:user
        });
            
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}