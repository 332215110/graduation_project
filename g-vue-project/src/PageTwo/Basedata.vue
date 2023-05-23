<template>
    <el-form
      label-position="left"
      label-width="100px"
      :model="baseData"
      style="max-width: 460px"
    >
      <el-form-item label="用户名">
        <el-input v-model="baseData.Username" />
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="baseData.Cnname" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="baseData.Telephone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="baseData.Mail" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="baseData.Age" />
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="baseData.Jobtitle" />
      </el-form-item> 
       <el-form-item label="邮编">
        <el-input v-model="baseData.Zip" />
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  
  const baseData = reactive({
    Username: '',
    Cnname: '',
    Telephone: '',
    Mail:'',
    Age:'',
    Jobtitle:'',
    Zip:''
  })
  </script>
  