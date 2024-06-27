const shortid=require("shortid");
const URL=require("../models/url");

async function handleshortUrlGenerator(req,res){

    const body=req.body;
    if(!body.url){
        return res.status(400).json({error:"URL is reqd"})
    }
    const shortID=shortid();

    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitedHistory:[],
        createdBy:req.user._id
    })

    return res.render('home', {id:shortID})
}

async function handleAnalytics(req,res){

    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitedHistory.length, 
                    analytics:result.visitedHistory,
                })
}

module.exports={
    handleshortUrlGenerator,handleAnalytics,
}