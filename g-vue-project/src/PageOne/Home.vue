<template>
    <div class="home">
        <el-container id="home-container">
            <el-header></el-header>
            <el-main id="home-main"><router-view></router-view></el-main>
            <el-footer></el-footer>
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
  
<style>
.home {
    background: url('../assets/background.jpg');
    height: 100vh;
}
#home-container{
    height: 100vh;
}
#home-main {
    height: 80vh;
    width: 60vh;
    position: relative;
    left: 50%;
    top: 50%
}
</style>
  