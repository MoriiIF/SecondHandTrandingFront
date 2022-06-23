<template>
    <div class="myCart">
        <div class="cart-header">
            <div class="cart-header-title">购物车</div>
            <div class="cart-header-main">
                <div class="cart-info">商品</div>
                <div class="cart-price">单价</div>
                <div class="cart-count">数量</div>
                <div class="cart-cost">小计</div>
                <div class="cart-delete">删除</div>
            </div>
        </div>
        <div class="cart-content">
            <div class="cart-content-main" v-for="(item, index) in cartList" :key="item">
                <div class="cart-info">
                    <img :src="productDictList[item.id].image">
                    <span>{{productDictList[item.id].name}}</span>
                </div>
                <div class="cart-price">
                    ￥ {{productDictList[item.id].price}}
                </div>
                <div class="cart-count">
                    <span class="minus" @click="handeCount(index, -1)">-</span>
                    {{item.count}}
                    <span class="add" @click="handleCount(index, 1)">+</span>
                </div>
                <div class="cart-cost">
                    ￥ {{productDictList[item.id].price * item.count}}
                </div>
                <div class="cart-delete">
                    <span class="cart-del" @click="handleDelete(index)" style="color: red;">删除</span>
                </div>
            </div>
            <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
        </div>
        <div class="cart-footer" v-show="cartList.length">
            <div class="cart-footer-desc">
                共计 <span>{{countAll}}</span> 件
            </div>
            <div class="cart-footer-desc">
                应付总额 ￥ <span>{{costAll}}</span>
            </div>
            <div class="cart-footer-desc">
                <div class="cart-settle" @click="handleOrder">立即结算</div>
            </div>
        </div>
    </div>
</template>

<script>
import productData from '../ProductDetails.vue';
export default {
    name: 'myCart',
    data(){
        return{
            productList: productData
        };
    },
    computed: {
        //购物车数据
        cartList(){
            return this.$store.state.cartList;
        },
        //设置字典对象
        productDictList(){
            const dict = {};
            this.productList.forEach(item => {
                dict[item.id] = item;
            });
            return dict;
        },
        //购物车商品数量总数
        countAll(){
            let count = 0;
            this.cartList.forEach(item => {
                count += item.count;
            });
            return count;
        },
        //购物车商品总价
        costAll(){
            let cost = 0;
            this.cartList.forEach(item => {
                cost += this.productDictList[item.id].price * item.count;
            })
            return cost;
        }
    },
    methods: {
        //修改购物车数量
        handleCount(index, count){
            if(count < 0 && this.cartList[index].count === 1) return;
            this.$store.dispatch('editCart', {
                id: this.cartList[index].id,
                count: count
            }).then(text => {

            }),error => {
                window.alert(error)
            }
        },
        handleDelete(index){
            this.$store.commit('deleteCart', this.cartList[index].id);
        },
        handleOver(){
            this.$store.dispatch('buy').then(text => {
                window.alert(text);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.myCart{
    margin: 32px;
    background: white;
    border: 1px solid whitesmoke;
    border-radius: 10px;
}
.cart-header-title{
    padding: 16px 32px;
    border-bottom: 1px solid whitesmoke;
    border-radius: 10px 10px 0 0;
    background: #f8f8f9;
}
.cart-header-main{
    padding: 8px 32px;
    overflow: hidden;
    border-bottom: 1px solid whitesmoke;
    background: #eee;
    overflow: hidden;
}
.cart-empty{
    text-align: center;
    padding: 32px;
}
.cart-header-main div{
    text-align: center;
    float: left;
    font-size: 14px;
}
div.cart-info{
    width: 60%;
    text-align: left;
}
.cart-price{
    width: 10%;
}
.cart-count{
    width: 10%;
}
.cart-cost{
    width: 10%;
}
.cart-delete{
    width: 10%;
}
.cart-content-main{
    padding: 0 32px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px dashed #e9eaec;
    overflow: hidden;
}
.cart-content-main div{
    float: left;
}
.cart-content-main img{
    width: 40px;
    height: 40px;
    position: relative;
    top: 10px;
}
.minus,
.add{
    display: inline-block;
        margin: 0 4px;
        width: 24px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        background: #f8f8f9;
        border-radius: 50%;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        cursor: pointer;
}
.cart-delete{
    cursor: pointer;
    color: red;
}
.cart-settle{
    display: inline-block;
    padding: 8px 32px;
    border-radius: 6px;
    background: orangered;
    color: white;
    cursor: pointer;
}
.cart-footer{
    padding: 32px;
    text-align: right;
}
.cart-footer-desc{
    display: inline-block;
    padding: 0 16px;
}
.cart-footer-desc span{
    color: orangered;
    font-size: 20px;
}
</style>