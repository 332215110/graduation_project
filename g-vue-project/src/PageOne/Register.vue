<template>
    <div class="common-layout">
        <el-container>
            <el-header></el-header>
            <el-main>
                <div>
                    用户名:<el-input v-model="username" clearable style="display: inline;"/>
                </div>
                <div>
                    密码:<el-input v-model="password" clearable style="display: inline;"/>
                </div>
                <div>
                    确认密码:<el-input v-model="password"  clearable style="display: inline;"/>
                </div>
                <div>
                    论文常用中文名:<el-input v-model="password" clearable style="display: inline;"/>
                </div>
                <div>
                    dblp用户绑定:<el-input v-model="password" clearable style="display: inline;"/>
                </div>
                <div>
                    <p>已有账户？点击<RouterLink to='/'>登陆</RouterLink>
                    </p>
                </div>
                <div><el-button type="primary">注册</el-button></div>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>
<script>
</script>