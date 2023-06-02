const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const router = require('koa-router')()
const cors = require('koa2-cors')
const abnormal = require('./config/abnormal')


app.use(cors())
app.use(json())
app.use(bodyParser())

//全局异常处理
app.use(abnormal)

//注册、登陆
const login = require('./router/login/login.js')
const setData =require('./router/personalData/setData.js')
const paperData = require('./router/paperData/paperData.js')
router.use('/api', login)
router.use('/api',setData)
router.use('/api',paperData)


app.use(router.routes()).use(router.allowedMethods())
app.listen(4000);
console.log('success')