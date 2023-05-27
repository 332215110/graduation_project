<template>
    <div class="common-layout">
        <el-form :model="login" status-icon :rules="rules" ref="login" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input type="username" v-model="login.username" autocomplete="off"
                    placeholder="Please input your username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login.password" autocomplete="off"
                    placeholder="Please input your password"></el-input>
            </el-form-item>
            <div>
                <p>没有账号？点击<router-link to="/register">注册</router-link></p>
            </div>
            <el-form-item>
                <el-button type="primary" @click="loginIn(login)">登陆</el-button>
                <el-button @click="resetForm('login')">重新输入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {login} from '../api/index'
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
        loginIn(loginInfo){
            login(loginInfo).then(function(response){
                if(response.data.code==200){
                    console.log(response.data.data)
                    localStorage.setItem("user-info",JSON.stringify(response.data.data))
                    router.push('basedata')
                }else if(response.data.code==202){
                    alert(response.data.msg)
                }else{
                    alert(response.data.msg)
                }
            }).catch(function(error){
                console.log(error)
            })
        }
    }

}
</script>

<style></style>
