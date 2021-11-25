const User = require('../models/user');
const Post=require('../models/post');


module.exports.profile = function(req, res){
    if(! req.isAuthenticated()){
        return res.redirect('/user/signIn');
    }
    User.findById(req.params.id,function(err,user){
        return res.render('profile', {
            title: 'User Profile',
            profileuser:user
        });
    })
    
}
module.exports.update=function(req,res){
    if(req.params.id==req.user.id){
        User.findOneAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
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
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                return res.redirect('/user/signIn');
            });
        }else{
            return res.redirect('back');
        }

    });
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


module.exports.home=function(req,res){

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        User.find({},function(err,user){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users:user
            });
        });
        
    })
}