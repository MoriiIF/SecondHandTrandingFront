import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import ProductDetails from '../views/ProductDetails.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import Merchant from '../views/Merchant.vue'
import SearchResult from '../views/SearchResult.vue'

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
        path: '/searchResult',
        name: 'searchResult',
        component: SearchResult
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
            },
            {
                path: '/rechargeRecord',
                name: 'rechargeRecord',
                component: () => import('../views/user/RechargeRecord.vue')
            },
            {
                path: '/paymentRecord',
                name: 'paymentRecord',
                component: () => import('../views/user/PaymentRecord.vue')
            },
            {
                path: '/myCart',
                name: 'myCart',
                component: () => import('../views/user/MyCart.vue')
            },
            {
                path: '/shoppingRecord',
                name: 'shoppingRecord',
                component: () => import('../views/user/ShoppingRecord.vue')
            },
            {
                path: '/myComments',
                name: 'myComments',
                component: () => import('../views/user/MyComments.vue')
            },
            {
                path: '/receivedComments',
                name: 'receivedComments',
                component: () => import('../views/user/ReceivedComments.vue')
            }
        ]
    },
    {
        path: '/merchant',
        name: 'merchant',
        component: Merchant,
        children: [
            {
                path: '/goodsList',
                name: 'goodsList',
                component: () => import('../views/shop/GoodsList.vue'),
                // children: [
                //     {
                //         path: '/addProduct',
                //         name: 'addProduct',
                //         component: () => import('../views/shop/AddProduct.vue')
                //     }
                // ]
            },
            {
                path: '/addProduct',
                name: 'addProduct',
                component: () => import('../views/shop/AddProduct.vue')
            },
        ]
    },
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
