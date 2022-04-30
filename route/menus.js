const express = require('express');
const menus = express.Router();
const path = require('path')
const fileUtils = require('../utils/file_utils')
let filePath = '../public/data/menus.json'
filePath = path.join(__dirname, filePath)

menus.get('/', async (req, res) => {
    try {
        const { role, state } = req.auth
        if (role === "admin" && !state) {
            const ret = await fileUtils.getFileJsonData(filePath)
            res.send(ret)
        } else {
            res.send({
                message: '读取文件内容失败，文件资源不存在',
                status: 404
            })
        }


    } catch (error) {
        const errorMsg = {
            message: '读取文件内容失败，文件资源不存在',
            status: 404
        }
        res.send(errorMsg)
    }
})
module.exports = menus;