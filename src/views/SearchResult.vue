<template>
    <div class="search">
        <top></top>
        <div class="list-control">
            <div class="list-order">
                <span>排序：</span>
                <span class="list-order-item"
                    :class="{on: order === ''}"
                    @click="handleOrderDefault">综合</span>
                <span class="list-order-item"
                    :class="{on: order === 'sales'}"
                    @click="handleOrderSales">
                    销量
                    <template v-if="order === 'sales'">↓</template>
                </span>
                <span class="list-order-item"
                    :class="{on: order.indexOF('price') > -1}"
                    @click="handleOrderPrice">
                    价格
                    <template v-if="order === 'price-desc'">↓</template>
                    <template v-if="order === 'price-asc'">↑</template>
                </span>
            </div>
        </div>
        <pruduct-details v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></pruduct-details>
        <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
    </div>
</template>

<script>
import Top from './page/top.vue'
import ProductDetails from './ProductDetails.vue'
export default {
    name: 'search',
    components: {Top, ProductDetails},
    data() {
        return {
            order: ''
        };
    },
    methods: {
        handleOrderDefault(){
            this.order = '';
        },
        handleOrderSales(){
            this.order = 'sales';
        },
        handleOrderPrice(){
            if(this.order === 'price-desc'){
                this.order = 'price-asc';
            }else {
                this.order = 'price-desc';
            }
        }
    },
    computed: {
        list(){
            //商品列表信息
        },
        filteredAndOrderedList(){
            let list = [...this.list];
            if(this.order !== ''){
                if(this.order === 'sales'){
                    list = list.sort((a, b) => b.sales - a.sales);
                }else if(this.order === 'price-desc'){
                    list = list.sort((a, b) => b.price - a.price);
                }else if(this.order === 'price-asc'){
                    list = list.sort((a, b) => a.price - b.price);
                }
            }
            return list;
        }
    }
}
</script>

<style lang="scss" scoped>
.list-control, .list-order{
    background: #F8F8FF;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0px 1.3px 1.3px blanchedalmond;
}
.list-order-item{
    cursor: pointer;
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
}
.list-order-item.on{
    background: orangered;
    border: 1px solid orangered;
    color: white;
}
.product-not-found{
    text-align: center;
    padding: 32px;
}
</style>