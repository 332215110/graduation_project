<template>
    <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model="value1"
          type="monthrange"
          range-separator="To"
          start-placeholder="Start month"
          end-placeholder="End month"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const value1 = ref('')
  
  </script>
  <style scoped>
  </style>
  