<template>
    <div class="main-interface">
        <el-container class="main-interface">
            <el-header id="container-header">
                <span>学术助理系统</span>
                <el-button id="logout-button" style="float:right;" round @click="logout">注销</el-button>
            </el-header>
            <el-container direction="horizontal">
                <el-aside id="aside-cont" width="200px">
                    <Menu />
                </el-aside>
                <el-main id="main-cont"><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

import Menu from './Menu.vue'
export default {
    name: 'app',
    components: {
        Menu
    },
    methods: {
        logout() {
            this.$msgbox.confirm('该操作将注销该用户,是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((action) => {
                if (action == 'confirm') {
                    localStorage.clear()
                    this.$router.push('/')
                }
            }).catch(err => {
                if (err = 'cancel') {
                    console.log('cancel')
                }
            })
        }
    }
}
</script>

<style>
#container-header{
    background-color: #B3C0D1;
    color: #333;
    font-size: 30px;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 8px;
}
#logout-button{
    text-align: right;
}
#aside-cont{
    background-color: #B3C0D1;
}
.main-interface{
    min-height: 100vh;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size:cover;
    -moz-background-size:cover;
}
/* .el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}


/* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
} */

/* body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}  */
</style>
