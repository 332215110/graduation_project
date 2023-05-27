const router = require('koa-router')() //注册接口
const { restart } = require('nodemon')
const result = require('../../config/resformat')
var dboperations = require('../../dboperation/dboperation.js')

router.post('/dblppaper', async ctx => {
    console.log(ctx.request.body)
    let { name } = ctx.request.body
    try {
        let dbresult = await dboperations.selectDblp(name)
        if (dbresult[0] == true) {
            new result(ctx, '论文查询成功', 200, dbresult[1]).answer()
        } else {
            new result(ctx, '论文查询失败', 202).answer()
        }
    } catch (e) {
        new result(ctx, '服务器发生错误', 500).answer()
    }
})


router.post('/paperClassify', async ctx => {
    console.log(ctx.request.body)
    for (let i = 0; i < ctx.request.body.length; i++) {
        let { userid, paperid, journal } =  await ctx.request.body[i]
        try {
            let { id } = await dboperations.searchJournalid(journal)
            console.log(id)
            let dbresult = await dboperations.recordSel(parseInt(userid), id, parseInt(paperid))
            if (dbresult == true) {
                new result(ctx, '论文分类成功', 200).answer()
            } else {
                new result(ctx, '论文已经入库', 202).answer()
            }
        } catch (e) {
            new result(ctx, '服务器发生错误', 500).answer()
        }
    }
})

router.post('/showRecord', async ctx => {
    let recordArr = []
    let dbresult = {
        journalData: '',
        paperData: ''
    }
    console.log(ctx.request.body)
    let { userid } = ctx.request.body
    console.log(userid)
    try {
        let selectResult = await dboperations.selectPaper(parseInt(userid))
        if (selectResult == false) {
            new result(ctx, '不存在相关论文记录', 202).answer()
        } else {
            for (let i = 0; i < selectResult.length; i++) {
                dbresult.journalData = await dboperations.selectJournal(selectResult[i].journalid)
                dbresult.paperData = await dboperations.selectPDblp(selectResult[i].paperid)
                recordArr.push(dbresult)
                dbresult = {
                    journalData: '',
                    paperData: ''
                }
            }
            new result(ctx, '搜索成功', 200, recordArr).answer()
        }
    } catch {
        new result(ctx, '服务器错误', 500).answer()
    }
})

router.post('/delRecord', async ctx => {
    console.log(ctx.request.body)
    let { userid, paperid } = ctx.request.body
    console.log(userid, paperid)
    try {
        let dbresult = await dboperations.delRecord(userid, paperid)
        console.log(dbresult)
        if (dbresult == true) {
            new result(ctx, '删除成功', 200).answer()
        } else {
            new result(ctx, '删除失败', 202).answer()
        }
    } catch (e) {
        new result(ctx, '服务器错误', 500).answer()
    }
})
module.exports = router.routes()