const express=require("express");
const urlRoute=require("./routes/url");
const { connectToDB}=require("./connect")
const URL=require('./models/url')


const app=express();
const PORT=4000;

connectToDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB connected"));

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async(req,res)=>{

    const shortId=req.params.shortId;
    const entry=await URL.findByIdAndUpdate({shortId},{$push:{
        visitedHistory:{timestamp: Date.now()},
    }});
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));