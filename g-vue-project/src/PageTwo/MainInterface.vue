<template>
    <div class="common-layout">
      <el-container>
        <el-header></el-header>
        <el-container>
          <el-aside width="200px"><Menu/></el-aside>
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
 
 <script setup>
import Menu from './Menu.vue';
</script>