const router = require('koa-router')() //注册接口
const result = require('../../config/resformat')
var dboperations = require('../../dboperation/dboperation.js')
var autoCraw = require('../../xmlToJson/xmlToJson.js')

//用户注册路由
router.post('/register', async ctx => {
    console.log(ctx.request.body)
    let { username, password, dblp_url, name } = ctx.request.body
    console.log(username, password, dblp_url, name)
    try {
        let dbresult = await dboperations.userRegister(username, password, dblp_url, name)
        if (dbresult == true) {
            new result(ctx, '注册成功', 200).answer()
        } else {
            new result(ctx, '该用户名已经注册过', 202).answer()
        }
    } catch (e) {
        new result(ctx, '注册失败，服务器发生错误', 500).answer()
    }
    // userRegister(use)    
})


//用户登录路由
router.post('/login', async ctx => {
    // console.log(ctx.request.body)
    let { username, password } = ctx.request.body
    try {
        let loginResult = await dboperations.userLogin(username, password)
        if (loginResult[0] == true) {
            new result(ctx, '登陆成功', 200, loginResult[1]).answer()
            var xmlUrl = loginResult[1].dblp_url + ".xml"
            let paperArray = await autoCraw(xmlUrl)
            for (let i = 0; i < paperArray.length; i++) {
                let dbresult = dboperations.storePaper(paperArray[i].authors,
                    paperArray[i].title,
                    loginResult[1].name,
                    paperArray[i].pages,
                    paperArray[i].year,
                    paperArray[i].journal,
                    paperArray[i].ee,
                    paperArray[i].url)
            }
        } else {
            new result(ctx, '用户名或密码输入错误', 202).answer()
        }
    } catch (e) {
        new result(ctx, '验证失败，服务器发生错误', 500).answer()
    }
    // userRegister(use)    
})

//用户

module.exports = router.routes()