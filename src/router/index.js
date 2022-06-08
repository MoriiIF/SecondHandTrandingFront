import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import ProductDetails from '../views/ProductDetails.vue'
import PersonalCenter from '../views/PersonalCenter.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/',
        name: 'homepage',
        component: HomePage
    },
    {
        path: '/productDetails',
        name: 'prodectDetails',
        component: ProductDetails
    },
    {
        path: '/personalCenter',
        name: 'personalCenter',
        component: PersonalCenter,
        children: [
            {
                path: '/userInfo',
                name: 'userInfo',
                component: () => import('../views/user/UserInfo.vue')
            }
        ]
    },
    // {
    //     path: '/userInfo',
    //     name: 'userInfo',
    //     component: UserInfo
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    // scrollBehavior:() => ({
    //     y: 0
    // }),
    routes
})

export default router
