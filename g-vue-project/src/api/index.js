import request from "./request.js";

export function login(loginInfo) {
    return request({
        method: 'POST',
        url: '/login',
        data: loginInfo
    })
}

export function register(registerInfo) {
    return request({
        method: 'POST',
        url: '/register',
        data: registerInfo
    })
}

export function setBD(baseData) {
    return request({
        method: 'POST',
        url: '/basedata',
        data: baseData
    })
}

export function resetPswd(pswd) {
    return request({
        method: 'POST',
        url: '/resetPswd',
        data: pswd
    })
}


export function setEduExp(eduExp) {
    return request({
        method: 'POST',
        url: '/eduExp',
        data: eduExp
    })
}

export function dblpPaper(name) {
    return request({
        method: 'POST',
        url: '/dblppaper',
        data: name
    })
}

export function paperClassify(id){
    return request({
        method:'POST',
        url:'/paperClassify',
        data:id
    })
}