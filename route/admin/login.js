// 导入用户集合构造函数
const { User } = require('../../model/user')
const config = require('../../store/index')
const express = require('express');
const login = express.Router();
const jwt = require('jsonwebtoken')

login.post('/', async (req, res) => {
	try {
		const { username, password } = req.body;
		console.log(req.body)
		// 如果用户没有输入邮件地址
		if (username.trim().length == 0 || password.trim().length == 0) {
			return res.status(400).send({ meta: { msg: "邮箱密码不能为空", status: 400 } });
		}
		// 根据邮箱地址查询用户信息
		// 如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
		// 如果没有查询到用户 user变量为空
		let user = await User.findOne({ username });
		// 查询到了用户
		if (user) {
			// 将客户端传递过来的密码和用户信息中的密码进行比对
			// true 比对成功
			// false 对比失败
			// let isValid = await bcrypt.compare(password, user.password);
			let isValid = (password === user.password)
			// 如果密码比对成功
			if (isValid) {
				const tokenData = {
					username: user.username,
					email: user.email,
					role: user.role,
					state: user.state
				}
				const tokenStr = jwt.sign(tokenData, config.jwtSecretKey, {
					expiresIn: '10h' //token 有效期是10小时
				})
				console.log('222', tokenStr)
				res.send({
					data: { token: "Bearer " + tokenStr },
					meta: {
						msg: "查询该用户成功",
						status: 200
					}
				})
			} else {
				// 没有查询到用户
				res.status(400).send({ meta: { msg: "查询不到该用户", status: 400 } })
			}
		} else {
			// 没有查询到用户
			res.status(400).send({ meta: { msg: "查询不到该用户", status: 400 } })
		}
	} catch (e) {
		console.error('[error:login]', e)
	}
})
module.exports = login;