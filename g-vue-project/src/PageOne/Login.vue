<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div>
            用户名<el-input v-model="username" placeholder="Please input username" clearable  style="display:inline"/>
      </div>
        <div>
            密码<el-input v-model="password" placeholder="Please input password" clearable style="display: inline;"/>
      </div>
      <div><p>没有账户？点击<RouterLink to='/register'>注册</RouterLink></p></div>
      <div><el-button type="primary" @click="signin">登陆</el-button></div>
    </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>

import { reactive,toRefs } from 'vue';
export default{
    setup(){
        const user=reactive({
            username:'',
            password:''
        })
        const signin=()=>{
            console.log('1')
        }
        return {...toRefs(user),signin}
    }
}

</script>

<style>
span{display: inline}
input{display: inline}
</style>