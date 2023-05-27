<template>
    <div class="common-layout">
        <el-form :model="resetForm" status-icon :rules="rules" ref="resetForm" label-width="100px" class="demo-resetForm">
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model.number="resetForm.password"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="newPassword">
                <el-input type="password" v-model="resetForm.newPassword" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="resetForm.checkPassword" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="reSet('resetForm',resetForm)">重置密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { resetPswd } from '@/api';
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
            } else if (value !== this.resetForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            resetForm: {
                password: '',
                newPassword: '',
                checkPassword: '',
                id: 0
            },
            rules: {
                password: [
                    { required: true, message: "必填" },
                ],
                newPassword: [
                    { required: true, message: "必填" },
                    { validator: validPassword, trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, message: "请再次填写密码" },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    created: function () {
        this.resetForm.id = JSON.parse(localStorage.getItem("user-info")).id
    },
    methods: {
        reSet(formName,resetInfo) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(formName)
                    resetPswd(resetInfo).then(function (response) {
                        console.log(response);
                        if (response.data.code == 200) {
                            alert(response.data.msg)
                        } else if (response.data.code = 202) {
                            alert(response.data.msg)
                        } else {
                            alert(response.data.msg)
                        }
                    })
                } else {
                    console.log('格式错误');
                }
            });
        },
    }
}
</script>

<style></style>
