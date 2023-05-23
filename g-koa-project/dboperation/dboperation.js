var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gmysql',
})

connection.connect();

//用户注册
function userRegister(username, password, dblp_url, name) {
    return new Promise((resolve) => {
        var modSql = 'INSERT INTO user(username,password,dblp_url,name) VALUES(?,?,?,?)' //插入相同数据忽视插入
        var addSqlParams = [username, password, dblp_url, name]
        connection.query(modSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                resolve(false);
            }
        })
        resolve(true)
    })

}
//用户登陆验证 返回包含所有个人信息的对象并且告知登陆成功
function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        console.log(username, password)
        var sql = 'SELECT * FROM user WHERE username=?'
        connection.query(sql, [username], function (err, result) {
            console.log(result)
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                resolve('db error')
            } else {
                if (result[0] == undefined) {
                    resolve(false) //用户名输入错误
                }
                else if (password == result[0].password) {
                    resolve([true, result[0]])
                }
                else {
                    resolve(false)  //密码输入错误
                }
            }
        })
    })
}

//重置密码 密码验证：成功返回重置成功（true），失败返回原密码错误
function resetPawd(id, password, newPassword) {
    return new Promise((resolve) => {
        console.log(id, password, newPassword)
        var sql = 'SELECT password FROM user WHERE id=?'
        connection.query(sql, [id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                resolve('db error')
            } else {
                if (password == result[0].password) {
                    var updateSql = 'UPDATE user SET password=? WHERE id=?'
                    connection.query(updateSql, [newPassword, id], function (err, result) {
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            resolve('db error')
                        } else {
                            resolve(true)
                        }
                    })
                }
                else {
                    resolve(false)
                }
            }
        })
    })
}

//用户个人信息
function setPerdata(id, age, phone, email, professor, zip_code, avatur_url) {
    return new Promise((resolve) => {
        var insertSql = 'REPLACE INTO user(age,phone,email,professor,zip_code,avatur_url) VALUES(?,?,?,?,?,?) WHERE id=?'
        var insertParams = [age, phone, email, professor, zip_code, avatur_url, id]
        connection.query(insertSql, insertParams, function (err, result) {
            if (err) {
                console.log('[REPLACE PERSONAL DATA ERROR] - ', err.message);
                resolve('db error')
            } else {
                resolve(true)
            }
        })
    })
}

//填写用户教育信息
function setEduexp(self_intro, research_field, academic_duties, award, eduExp, id) {
    return new Promise((resolve) => {
        var insertSql = 'REPLACE INTO user(self_introduction,reserch_fields,academic_duties,award,education_experience) VALUES(?,?,?,?,?) WHERE id =?'
        var insertParams = [self_intro, research_field, academic_duties, award, eduExp, id]
        connection.query(insertSql, insertParams, function (err, result) {
            if (err) {
                console.log('[REPLACE EDUCATION EXPERIENCE ERROR] - ', err.message);
                resolve('db error')
            } else {
                resolve(true)
            }
        })
    })
}

//在登陆的同时查询并存入dblp记录的论文
function storePaper(authors, title, author, pages, year, volumn, journal, ee, url) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT author FROM PUBILC_DBLP where url=?'
        var selectParams = [url]
        connection.query(selectSql, selectParams, function (err, result) {
            if (err) {
                console.log('[SELECT URL ERROR] - ', err.message);
                resolve('db error')
            } else {
                if (result[0] == undefined) {
                    var insertSql = 'INSERT INTO PUBILC_DBLP(authors,title,author,pages,year,volumn,journal,ee,url) VALUES(?,?,?,?,?,?,?,?,?)'
                    var insertParams = [authors, title, author, pages, year, volumn, journal, ee, url]
                    connection.query(insertSql, insertParams, function (err, result) {
                        if (err) {
                            console.log('[INSERT PUBILC PAPER ERROR] -', err.message)
                        } else {
                            resolve(true)
                        }
                    })
                } else if (author == result[0].author) {
                    resolve(false)  //说明数据库中已有该用户该论文
                } else {
                    var insertSql = 'INSERT INTO PUBILC_DBLP(authors,title,author,pages,year,volumn,journal,ee,url) VALUES(?,?,?,?,?,?,?,?,?)'
                    var insertParams = [authors, title, author, pages, year, volumn, journal, ee, url]
                    connection.query(insertSql, insertParams, function (err, result) {
                        if (err) {
                            console.log('[INSERT PUBILC PAPER ERROR] -', err.message)
                        } else {
                            resolve(true)
                        }
                    })
                }
            }
        })
    })
}

//根据author查询该用户在数据库的可能相关论文 返回由包含所有同名作者的论文的数组
function selectDblp(author) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT * FROM PUBILC_DBLP WHERE author=?'
        connection.query(selectSql, [author], function (err, result) {
            if (err) {
                console.log('[SELECT PERSONAL PAPER ERROR] -', err.message);
                resolve('db error')
            } else {
                if (result[0] == undefined) {
                    resolve(false) //没有这个姓名的用户
                } else {
                    resolve(result)
                }
            }
        })
    })
}

//筛选个人论文入库同时进行分类
function recordSel(userid, journalid, paperid) {
    return new Promise((resolve)=>{
        var selectSql = 'SELECT id FROM PERSONAL_RECORD  WHERE userid=? AND paperid=?'
        var selectParams=[userid,paperid]
        connection.query(selectSql,selectParams,function(err,result){
            if(err){
                console.log('[SELECT PERSONAL RECORD ERROR] -',err.message)
                resolve('db error')
            }else{
                if(result[0]==undefined){
                    var insertSql = 'INSERT INTO PERSONAL_RECOR(userid,journalid,paperid) VALUES(?,?,?)'
                    var insertParams=[userid,journalid,paperid]
                    connection.query(insertSql,insertParams,function(err,result){
                        if(err){
                            console.log['[INSERT PERSONAL RECORD ERROE] - ',err.message]
                            resolve('db error')
                        }else{
                            resolve(true)
                        }
                    })
                }
            }
        })
    })
}
//查询某个期刊会议的id
function searchJournalid(journal){
    return new Promise((resolve)=>{
        var selectSql='SELECT id FROM JOURNALS WHERE add_name=? OR name=?'
        var selectParams=[journal,journal]
        connection.query(selectSql,selectParams,function(err,result){
            if(err){
                console.log('[SELECT JOURNAL ID ERROR] -',err.message)
            }else{
                if(result[0]==undefined){
                    resolve(false) //没有记录相关期刊论文
                }else{
                    resolve(result[0]) //返回journalid
                }
            }
        })
    })
}


//根据userid查询个人论文
function selectPaper(userid) {
        return new Promise((resolve)=>{
            var selectSql='SELECT journalid,paperid FROM PERSONAL_RECORD WHERE userid=?'
            connection.query(selectSql,[userid],function(err,result){
                if(err){
                    console.log('[SELECT PAPER ERROR] - ',err.message)
                    resolve('db error')
                }else{
                    if(result[0]==undefined){
                        resolve(false)
                    }else{
                    resolve(result)  
                    }  
                }
            })
        })
}

function selectJournal(journalid){
    return new Promise((resolve)=>{
        var selectSql='SELECT * FROM JOURNALS WHERE id=?'
        connection.query(selectSql,[journalid],function(err,result){
            if(err){
                console.log('[SELECT JOURNALS ERROR] - ',err.message)
                resolve('db error')
            }else{
                resolve(result[0])
            }
        })
    })
}

function selectPDblp(paperid){
    return new Promise((resolve)=>{
        var selectSql='SELECT * FROM PUBILC_DBLP WHERE id=?'
        connection.query(selectSql,[paperid],function(err,result){
            if(err){
                console.log('[SELECT PUBILC DBLP ERROR] - ',err.message)
                resolve('db error')
            }else{
                resolve(result[0])
            }
        })
    })
}

//删除错误的个人论文记录
function delRecord(userid,paperid){
    return new Promise((resolve)=>{
        var delSql = 'DELETE FROM PERSONAL_RECORD WHERE userid=? AND paperid=?'
        var delParams=[userid,paperid]
        connection.query(delSql,delParams,function(err,result){
            if(err){
                console.log('[DEL PERSONAL RECORD ERROR] - ',err.message)
                resolve('db error')
            }else{
                resolve(true)
            }
        })
    })
}

module.exports = { userRegister, userLogin }