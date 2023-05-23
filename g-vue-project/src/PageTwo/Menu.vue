<template>
    <el-menu default-active="2-1" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><User /></el-icon>
                <span>个人信息管理</span>
            </template>
            <el-menu-item index="1-1">个人基本信息</el-menu-item>
            <el-menu-item index="1-2">重置密码</el-menu-item>
            <el-menu-item index="1-3">教育信息管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><List /></el-icon>
                <span>论文信息管理</span>
            </template>
            <el-menu-item index="2-1">论文入库</el-menu-item>
            <el-menu-item index="2-2">个人论文信息</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
            <template #title>
                <el-icon><Document /></el-icon>
                <span>个人简历生成</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {Document,User,List} from '@element-plus/icons-vue'

</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>