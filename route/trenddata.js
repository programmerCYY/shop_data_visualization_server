const express = require('express');
const trenddata = express.Router();
const path = require('path')
const fileUtils = require('../utils/file_utils')
let filePath = '../public/data/trenddata.json'
filePath = path.join(__dirname,filePath)

trenddata.get('/',async(req,res)=>{
    try{
        const ret = await fileUtils.getFileJsonData(filePath)
        res.send(ret)

    }catch(error){
        const errorMsg = {
            message:'读取文件内容失败，文件资源不存在',
            status:404
        }
        res.send(errorMsg)
    }
})
module.exports=trenddata;