var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '192.168.6.129',
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
            resolve(true)
        })
    })

}
//用户登陆验证 返回包含所有个人信息的对象并且告知登陆成功
function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        console.log(username, password)
        var sql = 'SELECT * FROM user WHERE username=?'
        connection.query(sql, [username], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                resolve('db error')
            } else {
                if (result[0] == undefined) {
                    resolve(false) //用户名输入错误
                }
                else if (password == result[0].password) {
                    delete result[0]["username"]
                    delete result[0]["password"]
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
        var insertSql = 'UPDATE user SET age=?,phone=?,email=?,professor=?,zip_code=?,avatur_url=? WHERE id=?'
        var insertParams = [parseInt(age), phone, email, professor, zip_code, avatur_url, parseInt(id)]
        connection.query(insertSql, insertParams, function (err, result) {
            if (err) {
                console.log(err)
                console.log('[REPLACE PERSONAL DATA ERROR] - ', err.message);
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

//填写用户教育信息
function setEduexp(self_intro, research_field, academic_duties, award, eduExp, id) {
    return new Promise((resolve) => {
        var insertSql = 'UPDATE user SET self_introduction=?,research_fields=?,academic_duties=?,award=?,education_experience=? WHERE id=?'
        var insertParams = [self_intro, research_field, academic_duties, award, eduExp, parseInt(id)]
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
function storePaper(authors = null, title, author, pages = null, year = null, journal = null, ee = null, url = null) {
    return new Promise((resolve) => {
        let count = 0
        var selectSql = 'SELECT author FROM pubilcDblp where title=?'
        var selectParams = [title]
        connection.query(selectSql, selectParams, function (err, result) {
            if (err) {
                console.log('[SELECT URL ERROR] - ', err.message);
                resolve('db error')
            } else {
                if (result[0] == undefined) { //说明没有插入该作者且没有插入该论文标题
                    var insertSql = 'INSERT INTO pubilcDblp(authors,title,author,pages,year,journal,ee,url) VALUES(?,?,?,?,?,?,?,?)'
                    var insertParams = [authors, title, author, pages, year, journal, ee, url]
                    console.log(insertParams)
                    connection.query(insertSql, insertParams, function (err, result) {
                        if (err) {
                            console.log('[INSERT PUBILC PAPER ERROR1] -', err.message)
                        } else {
                            resolve(true)
                        }
                    })
                } else {
                    for (let i = 0; i < result.length; i++) {
                        if (author == result[i].author) {
                            //说明数据库中已有该用户该论文
                            count++
                        }
                    }
                    if (count == 0) {
                        var insertSql = 'INSERT INTO pubilcDblp(authors,title,author,pages,year, journal,ee,url) VALUES(?,?,?,?,?,?,?,?)'
                        var insertParams = [authors, title, author, pages, year, journal, ee, url]
                        console.log(insertParams)
                        connection.query(insertSql, insertParams, function (err, result) {
                            if (err) {
                                console.log('[INSERT PUBILC PAPER ERROR2] -', err.message)
                            } else {
                                resolve(true)
                            }
                        })
                    } else {
                        resolve(false)
                    }
                }
            }
        })
    })
}



//根据author查询该用户在数据库的可能相关论文 返回由包含所有同名作者的论文的数组
function selectDblp(author) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT * FROM pubilcDblp WHERE author=?'
        connection.query(selectSql, [author], function (err, result) {
            if (err) {
                console.log('[SELECT PERSONAL PAPER ERROR] -', err.message);
                resolve('db error')
            } else {
                if (result[0] == undefined) {
                    resolve(false) //没有这个姓名的用户
                } else {
                    resolve([true, result])
                }
            }
        })
    })
}

//筛选个人论文入库同时进行分类
function recordSel(userid, journalid = null, paperid) {
    return new Promise((resolve) => {
        console.log(userid)
        var selectSql = 'SELECT id FROM personalRecord  WHERE userid=? AND paperid=?'
        var selectParams = [userid, paperid]
        connection.query(selectSql, selectParams, function (err, result) {
            if (err) {
                console.log('[SELECT PERSONAL RECORD ERROR] -', err.message)
                resolve(false)
            } else {
                if (result[0] == undefined) {
                    var insertSql = 'INSERT INTO personalRecord(userid,journalid,paperid) VALUES(?,?,?)'
                    var insertParams = [userid, journalid, paperid]
                    connection.query(insertSql, insertParams, function (err, result) {
                        if (err) {
                            console.log['[INSERT PERSONAL RECORD ERROE] - ', err.message]
                            resolve(false)
                        } else {
                            resolve(true)
                        }
                    })
                } else {
                    resolve(false)
                }
            }
        })
    })
}
//查询某个期刊会议的id
function searchJournalid(journal) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT id FROM journals WHERE abb_name=? OR name=?'
        var selectParams = [journal, journal]
        connection.query(selectSql, selectParams, function (err, result) {
            if (err) {
                console.log('[SELECT JOURNAL ID ERROR] -', err.message)
            } else {
                if (result[0] == undefined) {
                    resolve({ id: null }) //没有记录相关期刊论文
                } else {
                    resolve(result[0]) //返回journalid
                }
            }
        })
    })
}


//根据userid查询个人论文
function selectPaper(userid) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT journalid,paperid FROM personalRecord WHERE userid=?'
        connection.query(selectSql, [userid], function (err, result) {
            if (err) {
                console.log('[SELECT PAPER ERROR] - ', err.message)
                resolve('db error')
            } else {
                if (result[0] == undefined) {
                    resolve(false)
                } else {
                    resolve(result)
                }
            }
        })
    })
}

function selectJournal(journalid) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT * FROM journals WHERE id=?'
        connection.query(selectSql, [journalid], function (err, result) {
            if (err) {
                console.log('[SELECT JOURNALS ERROR] - ', err.message)
                resolve('db error')
            } else {
                resolve(result[0])
            }
        })
    })
}

function selectPDblp(paperid) {
    return new Promise((resolve) => {
        var selectSql = 'SELECT * FROM pubilcDblp WHERE id=?'
        connection.query(selectSql, [paperid], function (err, result) {
            if (err) {
                console.log('[SELECT PUBILC DBLP ERROR] - ', err.message)
                resolve('db error')
            } else {
                resolve(result[0])
            }
        })
    })
}

//删除错误的个人论文记录
function delRecord(userid, paperid) {
    return new Promise((resolve) => {
        console.log(userid, paperid)
        var delSql = 'DELETE FROM personalRecord WHERE userid=? AND paperid=?'
        var delParams = [parseInt(userid), parseInt(paperid)]
        connection.query(delSql, delParams, function (err, result) {
            if (err) {
                console.log('[DEL PERSONAL RECORD ERROR] - ', err.message)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

module.exports = { userRegister, userLogin, delRecord, selectDblp, selectPaper, selectJournal, selectPDblp, searchJournalid, recordSel, storePaper, resetPawd, setPerdata, setEduexp }