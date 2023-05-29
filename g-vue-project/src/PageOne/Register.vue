<template>
    <div id="register-cont">
        <div id="register-title">
            注册
        </div>
        <el-form :label-position="top" :model="register" status-icon :rules="rules" ref="register">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="register.username" autocomplete="off"
                    placeholder="Please input your username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="register.password" autocomplete="off"
                    placeholder="Please input your password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpassword">
                <el-input type="password" v-model="register.checkpassword" autocomplete="off"
                    placeholder="Please confirm your password"></el-input>
            </el-form-item>
            <el-form-item label="论文常用名" prop="name">
                <el-input v-model="register.name" autocomplete="off" placeholder="Please input your name"></el-input>
            </el-form-item>
            <el-form-item label="dblp用户绑定">
                <span>
                    <el-select v-model="register.dblp_url" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.url" :label="item.author" :value="item.url"
                            style="height:auto;">
                            <span style="float:left;position: relative;display: block;">
                                {{ item.author }}
                            </span>
                            <!-- <el-tooltip placement="bottom"> -->
                            <!-- <div slot="content">{{ item.author }}</div> -->
                            <div v-for="ite in item.note" :key="ite.text">
                                <span style="float: left; display: block;color: #8492a6;font-size: 13px;">
                                    {{ ite.text }}</span>
                            </div>
                            <!-- </el-tooltip> -->
                        </el-option>
                    </el-select>
                </span>
            </el-form-item>
            <div id="register-to-login">
                <p>没有账号？点击<router-link to="/login">登陆</router-link></p>
            </div>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('register', register)">注册</el-button>
                <el-button @click="resetForm('register')">重新输入</el-button>
                <el-button type="info" id='search-name' @click="getUrl(register.name)">检索dblp用户名</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import { register } from '../api/index';

export default {
    data() {
        let validPassword = (rule, value, callback) => {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
            if (value == '') {
                callback(new Error('请输入密码'))
            } else if (!reg.test(value)) {
                callback(new Error('密码必须是由8-20位字母+数字组合'))
            } else {
                callback()
            }
        };

        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.register.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            info: '',
            register: {
                username: '',
                password: '',
                checkpassword: '',
                name: '',
                dblp_url: ''
            },
            options: [],
            rules: {
                username: [
                    { required: true, message: "请输入用户名" },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: "必填" },
                    { validator: validPassword, trigger: 'blur' }
                ],
                checkpassword: [
                    { required: true, message: "请再次填写密码" },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                name: [
                    { required: true, message: "请填写论文中使用的名字（英文）" },
                    { min: 1, max: 1000, message: "必填", trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        getUrl(dbname) {
            this.options = []
            axios({
                url: 'https://dblp.org/search/author/api',
                params: {
                    q: dbname,
                    h: 1000,
                    format: 'json'
                }
            }).then(response => {
                console.log(dbname)
                console.log('/a', response.data.result.hits.hit)
                var authorArr = response.data.result.hits.hit
                if (authorArr != undefined) {
                    for (let i = 0; i < authorArr.length; i++) {
                        var personObj = {
                            "author": "",
                            "url": "",
                            "note": []
                        }
                        if ('notes' in authorArr[i].info) {
                            if (Object.prototype.toString.call(authorArr[i].info.notes.note) === '[object Object]') {
                                personObj.author = authorArr[i].info.author
                                personObj.url = authorArr[i].info.url
                                personObj.note.push(authorArr[i].info.notes.note)
                            } else {
                                for (let j = 0; j < authorArr[i].info.notes.note.length; j++) {
                                    personObj.author = authorArr[i].info.author
                                    personObj.url = authorArr[i].info.url
                                    personObj.note.push(authorArr[i].info.notes.note[j])
                                }
                            }
                        } else {
                            personObj.author = authorArr[i].info.author
                            personObj.url = authorArr[i].info.url
                            personObj.note.push({ "text": "无单位绑定" })
                        }
                        this.options.push(personObj)
                    }
                } else {
                    alert('无相关姓名作者')
                }
            }, error => {
                console.log(error)
            }
            )
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName, registerInfo) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(registerInfo)
                    register(registerInfo).then(function (response) {
                        console.log(response);
                        alert(response.data.msg)
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style>
#register-cont {
    width: 400px;
}

#register-title {
    text-align: center;
    color: #000;
    font-size: 30px;
    font-family: Arial, Helvetica, sans-serif;
}
#register-to-login{
    width: 400px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
}
</style>
