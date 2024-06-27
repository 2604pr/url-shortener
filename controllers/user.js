const {v4:uuidv4}=require("uuid")
const User=require('../models/user');
const {setUser}=require("../service/auth");
const { use } = require("../routes/user");

async function handleUserSignUp(req,res){

    const { name, email, password}=req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("/");
}

async function handleUserLogin(req,res){

    const { email, password}=req.body;
    const User=await User.findOne({
        email,
        password
    });

    if(!User){
        return res.render("login",{error:"Invalid username or password"})
    }
    
    const token=setUser(User);
    res.cookie('uid', token);
    return res.redirect("/");
}


module.exports={handleUserSignUp, handleUserLogin};