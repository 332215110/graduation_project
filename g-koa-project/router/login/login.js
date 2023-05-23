const router = require('koa-router')() //注册接口
const result = require('../../config/resformat')
var dboperations = require('../../dboperation/dboperation.js')

//用户注册路由
router.post('/register', async ctx => {
    console.log('890')
    console.log(ctx.request.body)
    ctx.body = 'success'
    let { username, password, dblp_url, name } = await ctx.request.body
    console.log(username, password, dblp_url, name)
    let dbresult= dboperations.userRegister(username, password, dblp_url, name)
    console.log(result)
    // userRegister(use)    
})


//用户登录路由
router.post('/login', async ctx => {
    // console.log(ctx.request.body)
    let { username, password } = await ctx.request.body
    console.log(username, password)
    let loginResult=await dboperations.userLogin(username,password) 
    if (loginResult == true) {
        ctx.body = '密码正确'
    } else if(loginResult==false){
        ctx.body = '用户名或密码错误'
    }else{
        ctx.body= loginResult
    }
    // userRegister(use)    
})

//用户填写个人信息路由


//用户

module.exports = router.routes()