//引用express框架
const express = require('express')
//处理路径
const path = require('path')
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 使用express-jwt来进行token的解密和验证
const {expressjwt:jwt} = require('express-jwt');
const config = require('./store/index')
//创建网站服务器
const app = express()
// 数据库连接
require('./model/connect');
// require('./model/user.js')
// 处理post请求参数
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))


// 校验token，获取headers⾥里里的Authorization的token，要写在路由加载之前，静态资源之后
app.use(jwt({
    secret: config.jwtSecretKey,
    algorithms: ["HS256"]
}).unless({
    path: ['/login'] //白名单,除了了这⾥里里写的地址，其他的URL都需要验证
}))

//引入路由
const login = require('./route/admin/login')
app.use('/login', login)

const channel = require('./route/channel')
app.use('/channel', channel)

const hotmapdata = require('./route/hotmapdata')
app.use('/hotmapdata', hotmapdata)

const hotmapjson = require('./route/hotmapjson')
app.use('/hotmapjson', hotmapjson)

const hotmapclothjson = require('./route/hotmapclothjson')
app.use('/hotmapclothjson', hotmapclothjson)

const stock = require('./route/stock')
app.use('/stock', stock)

const staff = require('./route/staff')
app.use('/staff', staff)

const trenddata = require('./route/trenddata')
app.use('/trenddata', trenddata)

const hotproduct = require('./route/hotproduct')
app.use('/hotproduct', hotproduct)

const userAge = require('./route/userage')
app.use('/user_age', userAge)

const menus = require('./route/menus')
app.use('/menus', menus)


// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      // 这个需要根据⾃自⼰己的业务逻辑来处理理
      res.status(401).send({code:-1,msg:'token验证失败'});
    // }else {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
    //   res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    //   // render the error page
    //   res.status(err.status || 500);
    //   res.render('error');
    }else{
        console.log("success")
    }
  });
app.listen(3000)
console.log('网站服务器启动成功，后端监听3000端口')

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听, 监听客户端的连接
// 当某一个客户端连接成功之后, 就会对这个客户端进行message事件的监听
webSocketService.listen()

