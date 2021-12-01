const passport=require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/user');


let opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'Codeial'
}

passport.use(new jwtStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("error in finding user in jwt",err);
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    })
}))

module.exports=passport;