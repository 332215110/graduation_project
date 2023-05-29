<template>
    <div class="common-layout">
        <el-form :model="eduForm" status-icon :rules="rules" ref="eduForm" label-position="top" class="demo-eduForm">
            <el-form-item label="个人简介">
                <el-input v-model="eduForm.self_introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 10 }"
                    maxlength="1000" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="研究领域">
                <el-input v-model="eduForm.research_fields" type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
            </el-form-item>
            <el-form-item label="学术兼职">
                <el-input v-model="eduForm.academic_duties" type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
            </el-form-item>
            <el-form-item label="获奖信息">
                <el-input v-model="eduForm.award" type="textarea" :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
            </el-form-item>
            <el-form-item label="教育信息">
                <el-input v-model="eduForm.education_experience" type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitFrom(eduForm)">提交</el-button>
                <el-button @click="cancelMod">取消修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { setEduExp } from '@/api';
export default {
    data() {
        return {
            eduForm: {
                self_introduction: '',
                research_fields: '',
                academic_duties: '',
                award: '',
                education_experience: '',
                id: 0
            },
            rules: {

            }
        };
    },
    created: function () {
        this.eduForm = JSON.parse(localStorage.getItem("user-info"))
    },
    methods: {
        submitFrom(formName) {
            setEduExp(formName).then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    alert(response.data.msg)
                    localStorage.setItem("user-info", JSON.stringify(formName))
                } else if (response.data.code == 202) {
                    alert(response.data.msg)
                } else {
                    alert(response.data.msg)
                }
            })
        },
        cancelMod() {
            this.eduForm = JSON.parse(localStorage.getItem("user-info"))
        }
    }
}
</script>

<style></style>
