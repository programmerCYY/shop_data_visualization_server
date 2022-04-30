//引入mongoose第三方模块
const mongoose = require('mongoose')
//连接数据库
// root:123456@localhost:27017/
mongoose.connect('mongodb://cyy:690301@localhost:27017/shop_visualization')
.then(()=>{console.log('数据库连接成功')})
.catch((error)=>{console.log('数据库连接失败',error)})