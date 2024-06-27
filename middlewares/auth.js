const {getUser}=require("../service/auth")

function checkForAuthentication(req,res,next){
    const authorizationHeaderValue=req.headers["authentication"];
    req.user=null;
    if(!authorizationHeaderValue|| !authorizationHeaderValue.startsWith('Bearer')){
        return next();
    }
}

async function restrictToLoggedInUserOnly(req,res,next){
    const userUid=req.cookies?.uid;

    if(!userUid){
        return res.redirect("/login");
    }
    const user=getUser(userUid);
    if(!user){
        return res.redirect("/login");
    }
    req.user=user;
    next();

    const token=
3}

module.exports={restrictToLoggedInUserOnly};