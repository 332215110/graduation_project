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
    background: url('../assets/clouds-4215608_1280.jpg');
    min-height: 100vh;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size:cover;
    -moz-background-size:cover;
}


#home-main {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
  