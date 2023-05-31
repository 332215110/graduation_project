const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ charkey: "cauthor" });
const { resolve } = require('path');

function autoCraw(url) {
    return new Promise((resolve) => {
        let req = https.get(url, function (res) {
            let xml_data = '';
            let title = ''
            let pages = ''
            let year = ''
            let journal = ''
            let ee = ''
            let url = ''
            let authors = ''
            let paperArr = []
            res.on('data', (stream) => {
                xml_data = xml_data + stream;
            });
            res.on('end', () => {
                parser.parseString(xml_data, (error, result) => {
                    if (error === null) {
                        var info = JSON.stringify(result)
                        var paperInfo = JSON.parse(info).dblpperson;
                        for (let i = 0; i < paperInfo.r.length; i++) {
                            if (paperInfo.r[i].hasOwnProperty("article")) {
                                for (let j = 0; j < paperInfo.r[i].article[0].author.length; j++) {
                                    // console.log(paperInfo.r[i].article[0].author[j].cauthor)
                                    authors = authors + paperInfo.r[i].article[0].author[j].cauthor+ ";" 
                                }
                                title = paperInfo.r[i].article[0].title
                                pages = paperInfo.r[i].article[0].pages
                                year = paperInfo.r[i].article[0].year
                                journal = paperInfo.r[i].article[0].journal
                                ee = paperInfo.r[i].article[0].ee
                                url = paperInfo.r[i].article[0].url
                            } else if (paperInfo.r[i].hasOwnProperty("inproceedings")) {
                                for (let j = 0; j < paperInfo.r[i].inproceedings[0].author.length; j++) {
                                    // console.log(paperInfo.r[i].inproceedings[0].author[j].cauthor)
                                    authors = authors + ";" + paperInfo.r[i].inproceedings[0].author[j].cauthor
                                }
                                title = paperInfo.r[i].inproceedings[0].title
                                pages = paperInfo.r[i].inproceedings[0].pages
                                year = paperInfo.r[i].inproceedings[0].year
                                journal = paperInfo.r[i].inproceedings[0].booktitle
                                ee = paperInfo.r[i].inproceedings[0].ee
                                url = paperInfo.r[i].inproceedings[0].url
                            } else if (paperInfo.r[i].hasOwnProperty("data")) {
                                for (let j = 0; j < paperInfo.r[i].data[0].author.length; j++) {
                                    // console.log(paperInfo.r[i].data[0].author[j].cauthor)
                                    authors = authors + ";" + paperInfo.r[i].data[0].author[j].cauthor
                                }
                                title = paperInfo.r[i].data[0].title
                                pages = paperInfo.r[i].data[0].pages
                                year = paperInfo.r[i].data[0].year
                                journal = paperInfo.r[i].data[0].journal
                                ee = paperInfo.r[i].data[0].ee
                                url = paperInfo.r[i].data[0].url
                            } else if (paperInfo.r[i].hasOwnProperty("proceedings")) {
                                for (let j = 0; j < paperInfo.r[i].proceedings[0].editor.length; j++) {
                                    // console.log(paperInfo.r[i].proceedings[0].editor[j].cauthor)
                                    authors = authors + ";" + paperInfo.r[i].proceedings[0].editor[j].cauthor
                                }
                                title = paperInfo.r[i].proceedings[0].title
                                pages = paperInfo.r[i].proceedings[0].pages
                                year = paperInfo.r[i].proceedings[0].year
                                journal = paperInfo.r[i].proceedings[0].journal
                                ee = paperInfo.r[i].proceedings[0].ee
                                url = paperInfo.r[i].proceedings[0].url
                            } else if (paperInfo.r[i].hasOwnProperty("book")) {
                                for (let j = 0; j < paperInfo.r[i].book[0].author.length; j++) {
                                    // console.log(paperInfo.r[i].book[0].author[j].cauthor)
                                    authors = authors + ";" + paperInfo.r[i].book[0].author[j].cauthor
                                }
                                title = paperInfo.r[i].book[0].title
                                pages = paperInfo.r[i].book[0].pages
                                year = paperInfo.r[i].book[0].year
                                journal = paperInfo.r[i].book[0].journal
                                ee = paperInfo.r[i].book[0].ee
                                url = paperInfo.r[i].book[0].url
                            } else {
                                for (let j = 0; j < paperInfo.r[i].incollection[0].author.length; j++) {
                                    // console.log(paperInfo.r[i].incollection[0].author[j].cauthor)
                                    authors = authors + ";" + paperInfo.r[i].incollection[0].author[j].cauthor
                                }
                                title = paperInfo.r[i].incollection[0].title
                                pages = paperInfo.r[i].incollection[0].pages
                                year = paperInfo.r[i].incollection[0].year
                                journal = paperInfo.r[i].incollection[0].booktitle
                                ee = paperInfo.r[i].incollection[0].ee
                                url = paperInfo.r[i].incollection[0].url
                            }
                            let paperJson = stringToJson(arrToString(authors), arrToString(title), arrToString(pages),
                             arrToString(year), arrToString(journal), arrToString(ee), arrToString(url))
                            title = ''
                            pages = ''
                            year = ''
                            journal = ''
                            ee = ''
                            url = ''
                            authors = ''
                            paperArr.push(paperJson)
                        }
                        resolve(paperArr)
                    }
                    else {
                        resolve(error)
                    }
                }
                );
            });
        });
    })
}

function stringToJson(authors, title, pages, year, journal, ee, url) {
    let paperJson = {
        authors: authors,
        title: title,
        pages: pages,
        year: year,
        journal: journal,
        ee: ee,
        url: url
    }
    return paperJson
}
function arrToString(arr) {
    if (arr instanceof Array) {
        if(arr.length>1){
            return arr[1]
        }
        if(arr[0] instanceof Object){
            return arr[0].cauthor
        }
        return arr[0]
    }else{
        return arr
    }
}


module.exports = autoCraw