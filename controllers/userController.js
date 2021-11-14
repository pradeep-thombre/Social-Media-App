const User = require('../models/user');


module.exports.profile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/user/signIn');

            }
        });
    }else{
        return res.redirect('/users/signIn');

    }


    
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('signUp', {
        title: "FunChat | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('signIn', {
        title: "FunChat | Sign In"
    })
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

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        if (user){

            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');

        }else{
            // handle user not found

            return res.redirect('back');
        }


    });
}