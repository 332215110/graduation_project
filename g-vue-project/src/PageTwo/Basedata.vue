<template>
    <div id="basedata-cont">
        <el-form :model="baseData" status-icon :rules="rules" ref="baseData" label-position="top" class="demo-baseData">
            <el-form-item label="论文常用名">
                <el-input v-model="baseData.name" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="baseData.phone" type="text" maxlength="11" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="baseData.email"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="baseData.age"></el-input>
            </el-form-item>
            <el-form-item label="职称">
                <el-select v-model="baseData.professor" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮编">
                <el-input v-model="baseData.zip_code"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitFrom(baseData)">提交</el-button>
                <el-button @click="cancelMod">取消修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { setBD } from '@/api';
export default {
    data() {
        return {
            baseData: {
                name: '',
                phone: '',
                email: '',
                professor: '',
                age: '',
                zip_code: '',
                avatur_url: '',
                id: 0
            },
            options: [{
                value: '教授',
                label: '教授'
            }, {
                value: '副教授',
                label: '副教授'
            }, {
                value: '讲师',
                label: '讲师'
            }],
            rules: {
            }
        };
    },
    created: function () {
        this.baseData = JSON.parse(localStorage.getItem("user-info"))
    },
    methods: {
        submitFrom(formName) {
            setBD(formName).then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    alert(response.data.msg)
                    localStorage.setItem("user-info",JSON.stringify(formName))
                }else if(response.data.code==202){
                    alert(response.data.msg)
                }else{
                    alert(response.data.msg)
                }
            }).catch(function (error) {
                alert(error)
            })
        },
        cancelMod(){
            this.baseData=JSON.parse(localStorage.getItem("user-info"))
        }
    }
}

</script>

<style>
#basedata-cont{
    background-color: white;
    margin: 0;
}
</style>
