const router = require('koa-router')() //注册接口
const { restart } = require('nodemon')
const result = require('../../config/resformat')
var dboperations = require('../../dboperation/dboperation.js')

//用户提交个人基本信息
router.post('/basedata', async ctx => {
    console.log(ctx.request.body)
    let { id, age, phone, email, professor, zip_code, avatur_url } = ctx.request.body
    console.log(id, age, phone, email, professor, zip_code, avatur_url)
    try {
        let dbresult = await dboperations.setPerdata(parseInt(id), age, phone, email, professor, zip_code, avatur_url)
        if (dbresult == true) {
            new result(ctx, '修改个人基本信息成功', 200).answer()
        } else {
            new result(ctx, '修改失败', 202).answer()
        }
    } catch (e) {
        new result(ctx, '数据库错误', 500).answer()
    }
})

//用户重置密码
router.post('/resetPswd',async ctx=>{
    console.log(ctx.request.body)
    let {id,password,newPassword} = ctx.request.body
    console.log(id,password,newPassword)
    try{
        let dbresult = await dboperations.resetPawd(parseInt(id),password,newPassword)
        if(dbresult==true){
            new result(ctx,'修改密码成功',200).answer()
        }else{
            new result(ctx,'原密码错误',202).answer()
        }
    }catch(e){
        new result(ctx,'服务器错误',500).answer()
    }
})

//用户提交个人教育信息
router.post('/eduExp',async ctx=>{
    console.log(ctx.request.body)
    let {selfIntro,researchFields,academicDuties,award,eduExp,id} =ctx.request.body
    console.log(selfIntro,researchFields,academicDuties,award,eduExp)
    try{
        let dbresult= await dboperations.setEduexp(selfIntro,researchFields,academicDuties,award,eduExp,id)
        if (dbresult==true){
            new result(ctx,'修改教育信息成功',200).answer()
        }else{
            new result(ctx,'修改失败',202).answer()
        }
    }catch(e){
        new result(ctx,'数据库错误',500).answer()
    }
})

module.exports = router.routes()