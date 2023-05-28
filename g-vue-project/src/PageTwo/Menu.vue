<template>
    <el-menu :default-active="$route.path"  router>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>个人信息</template>
            <el-menu-item-group>
                <el-menu-item index="/basedata">个人基本信息</el-menu-item>
                <el-menu-item index="/resetpswd">重置密码</el-menu-item>
                <el-menu-item index="/eduexp">个人教育信息</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>论文信息</template>
            <el-menu-item-group>
                <el-menu-item index="/dblppaper">DBLP论文</el-menu-item>
                <el-menu-item index="/perpaper">个人论文</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<script>

export default {
    name: 'menu',
    components: {

    }
}
</script>


<style>

</style>