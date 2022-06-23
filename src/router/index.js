import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import ProductDetails from '../views/ProductDetails.vue'
import AdminCenter from '@/views/AdminCenter'
import PersonalCenter from '../views/PersonalCenter.vue'
import Merchant from '../views/Merchant.vue'
import SearchResult from '../views/SearchResult.vue'
import ProductShowcase from '../views/ProductShowcase.vue'
import SearchRes from '../views/SearchRes.vue'

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
        path: '/productDetails/:id',
        name: 'prodectDetails',
        component: ProductDetails
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        component: SearchResult
    },
    {
        path: '/searchRes',
        name: 'searchRes',
        component: SearchRes
    },
    {
        path: '/product/:id',
        component: ProductShowcase
    },
    {
        path: '/adminCenter',
        name: 'adminCenter',
        component: AdminCenter,
        children: [
            {
                path: '/userVerify',
                name: 'userVerify',
                component: () => import('../views/admin/userVerify.vue')
            }
        ]
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
                path: '/cart',
                name: 'cart',
                component: () => import('../views/user/Cart.vue')
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
            },
            {
                path: '/comment',
                name: 'comment',
                component: () => import('../views/user/CommentToProduct.vue')
            },
            {
                path: '/orderConfirm',
                name: 'orderConfirm',
                component: () => import('../views/user/OrderConfirm.vue')
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
            },
            {
                path: '/addProduct',
                name: 'addProduct',
                component: () => import('../views/shop/AddProduct.vue')
            },
            {
                path: '/returnRequest',
                name: 'returnRequest',
                component: () => import('../views/shop/ReturnRequest.vue')
            },
            {
                path: '/shipped',
                name: 'shipped',
                component: () => import('../views/shop/Shipped.vue')
            },
            {
                path: '/received',
                name: 'received',
                component: () => import('../views/shop/Received.vue')
            }
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
