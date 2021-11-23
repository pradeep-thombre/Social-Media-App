const User = require('../models/user');
const posts=require('../models/post');


module.exports.profile = function(req, res){
    if(! req.isAuthenticated()){
        return res.redirect('/user/signIn');
    }
    return res.render('profile', {
        title: 'User Profile'
    });
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
        return res.redirect('/user/profile');
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
    return res.redirect('/user/home');
    
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/user/signIn');
}


module.exports.home=function(req,res){
    // posts.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Home",
    //         posts:posts
    //     });
    // });

    posts.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Home",
            posts:posts
        });
    });
}