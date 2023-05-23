import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path:'/',
        name:'login',
        component:()=> import('../PageOne/Login.vue')
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('../PageOne/Register.vue')
    },
    {
        path:'/timer',
        name:'timer',
        component:()=>import('../components/Dtpicker.vue')
    },
    {
        path:'/mainif',
        name:'mainif',
        component:()=>import('../PageTwo/MainInterface.vue'),
        redirect:'/basedata',
        children:[
            {
                path:'/basedata',
                name:'basedata',
                component:()=>import('../PageTwo/Basedata.vue')
            },
            {
                path:'/resetpswd',
                name:'resetpswd',
                component:()=>import('../PageTwo/Resetpswd.vue')
            },
            {
                path:'/eduexp',
                name:'eduexp',
                component:()=>import('../PageTwo/Eduexperience.vue')
            }
        ]
    }
  ]
})

export default router
