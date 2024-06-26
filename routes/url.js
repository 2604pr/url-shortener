const express=require("express");
const { handleshortUrlGenerator , handleAnalytics}=require("../controllers/url")

const router=express.Router();

router.post('/', handleshortUrlGenerator)
router.get('/analytics/:shortId', handleAnalytics)

module.exports=router;