import VueRouter from 'vue-router'
import Vue from 'vue'
// import HomeView from '../views/HomeView.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../PageOne/Home.vue'),
            redirect:'/login',
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('../PageOne/Login.vue')
                  },
                {
                path: '/register',
                name: 'register',
                component: () => import('../PageOne/Register.vue')
            },
        ]
        },
        {
            path: '/mainif',
            name: 'mainif',
            component: () => import('../PageTwo/MainInterface.vue'),
            children: [
                {
                    path: '/basedata',
                    name: 'basedata',
                    component: () => import('../PageTwo/Basedata.vue')
                },
                {
                    path: '/resetpswd',
                    name: 'resetpswd',
                    component: () => import('../PageTwo/Resetpswd.vue')
                },
                {
                    path: '/eduexp',
                    name: 'eduexp',
                    component: () => import('../PageTwo/Eduexperience.vue')
                },
                {
                    path: '/dblppaper',
                    name: 'dblppaper',
                    component: () => import('../PageThree/Dblppaper.vue')
                },
                {
                    path: '/perpaper',
                    name: 'perpaper',
                    component: () => import('../PageThree/Personalpaper.vue')
                },
                {
                    path: '/biography',
                    name: 'biography',
                    component: () => import('../PageThree/Biography.vue')
                },
            ]
        }
    ]
})

export default router
