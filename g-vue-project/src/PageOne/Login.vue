<template>
    <div class="login-cont">
        <div id="login-title">
            登陆
        </div>
        <el-form :label-position="top" :model="login" status-icon :rules="rules" ref="login"  id="loginForm">
            <el-form-item label="用户名" prop="username" class="item">
                <el-input type="username" v-model="login.username" autocomplete="off"
                    placeholder="Please input your username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login.password" autocomplete="off"
                    placeholder="Please input your password"></el-input>
            </el-form-item>
            <div id="login-to-register">
                <p>没有账号？点击<router-link to="/register">注册</router-link></p>
            </div>
            <el-form-item style=" text-align:center">
                <el-button type="primary" @click="loginIn(login)">登陆</el-button>
                <el-button @click="resetForm('login')">重新输入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from '../api/index'
import router from '@/router';
export default {
    data() {
        return {
            login: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: 'blur' },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        loginIn(loginInfo) {
            login(loginInfo).then(function (response) {
                if (response.data.code == 200) {
                    console.log(response.data.data)
                    localStorage.setItem("user-info", JSON.stringify(response.data.data))
                    router.push('basedata')
                } else if (response.data.code == 202) {
                    alert(response.data.msg)
                } else {
                    alert(response.data.msg)
                }
            }).catch(function (error) {
                console.log(error)
            })
        }
    }

}
</script>

<style>
#login-cont {
    width: 400px;
    height: 500px;
    border-radius: 5px;
}

#login-title {
    text-align: center;
    color: #000;
    font-size: 30px;
    font-family: Arial, Helvetica, sans-serif;
}

#login-to-register {
    width: 400px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
}
</style>
