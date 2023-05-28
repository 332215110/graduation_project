<template>
    <div class="common-layout">
        <el-container>
            <el-header> <el-button round @click="logout">圆角按钮</el-button></el-header>
            <el-container direction="horizontal">
                <el-aside width="200px">
                    <Menu />
                </el-aside>
                <el-main><router-view></router-view></el-main>
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
            this.$msgbox.confirm('该操作将注销该用户,是否继续', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.clear()
                this.$router.push('/')
            })
        }
    }
}
</script>

<style>

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
