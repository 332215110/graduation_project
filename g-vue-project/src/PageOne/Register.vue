<template>
    <div class="common-layout">
        <el-form :model="register" status-icon :rules="rules" ref="register" label-width="100px" class="demo-ruleForm">
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
            <el-form-item label="论文常用名" prop="dblp_name">
                <el-input v-model="register.dblp_name" autocomplete="off" placeholder="Please input your name"></el-input>
            </el-form-item>
            <el-form-item label="dblp用户绑定">
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
                <el-button type="primary" @click="getUrl(register.dblp_name)">检索dblp用户名</el-button>
            </el-form-item>
            <div>
                <p>没有账号？点击<router-link to="/login">登陆</router-link></p>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('register')">注册</el-button>
                <el-button @click="resetForm('register')">重新输入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';


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
                dblp_name: '',
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
                dblp_name: [
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
            }, error => {
                console.log(error)
            }
            )
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style></style>
