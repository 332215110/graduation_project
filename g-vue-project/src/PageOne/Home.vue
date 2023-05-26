<template>
    <div class="common-layout">
        <el-container>
            <el-header>header</el-header>
            <!-- <el-main><login /></el-main> -->
            <!-- <el-main><register /></el-main> -->

            <el-main><router-view></router-view></el-main>
            <el-footer>footer</el-footer>
        </el-container>
    </div>
</template>
  
<script>

export default {
  name: 'app',
  components: {

}
}
</script>
  
<style></style>
  