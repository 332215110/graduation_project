import request from "./request.js";

export function login(params={}){
    return request({
        method:'POST',
        url:'/login',
        params
    })
}

export function register(params={}){
    return request({
        method:'POST',
        url:'/register',
        params
    })
}