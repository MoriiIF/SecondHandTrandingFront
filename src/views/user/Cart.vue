<template>
    <div class="cart-layout">
        <div class="cart">
            <div class="cart-bar">
                <div class="title">
                    <span class="cart-title">购物车</span>
                </div>
                <div class="cart-sum">
                    <!-- <span class="selected-text">已选商品</span> -->
                    <strong class="totalPrice">
                        <span class="total">￥ {{sum}}</span>
                    </strong>
                    <el-button class="submit-btn">结 算</el-button>
                </div>
            </div>
            <div class="cart-main">
                <el-table ref="cartTable" :data="productInCart" tooltip-effect="dark" style="width: 100%" @select="selectionRow">
                    <el-table-column type="selection" width="70">
                    </el-table-column>
                    <el-table-column label="商品信息" width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.productImg" alt="" width="80px" height="80px">
                            
                        </template>
                    </el-table-column>
                    <el-table-column width="300">
                        <template slot-scope="scope">
                            <span>{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="店铺" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.shop}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" width="100">
                        <template slot-scope="scope">
                            <span style="color: black;">￥ {{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="170">
                        <template slot-scope="scope">
                            <el-input-number size="mini" v-model="scope.row.num" :min="1" :max="99"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" width="170">
                        <template slot-scope="scope">
                            <span style="color: red;">￥ {{getCost(scope.row.num, scope.row.price)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click.native.prevent="deleteOne(scope.$index, productInCart)">删 除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'cart',
    data(){
        return {
            productInCart: [],
            sum: 0.00,
        }
    },
    mounted(){
        this.getProduct();
        this.getCost(num, price);
        this.selectionRow(selection, row);
    },
    watch: {
        
    },
    methods: {
        getProduct(){
            this.dataLoading = true;
            import('@/mock/product.json').then((res) => {
                this.productInCart = res.data;
                this.dataLoading = false;
            });
        },
        deleteOne(index, rows){
            rows.splice(index, 1);
        },
        getCost(num, price){
            return (num * price).toFixed(2);
        },
        selectionRow(selection, row){
            let selected = selection.length && selection.indexOf(row) !== -1;
            if(selected){
                this.sum += parseFloat(this.getCost(row.num, row.price));
            }else {
                this.sum = 0.00;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cart-layout{
    display: block;
}
.cart{
    min-height: 400px;
    background-color: white;
    border-radius: 24px;
    overflow: hidden;
}
.cart-bar{
    overflow: hidden;
    font-size: 12px;
    position: relative;
    height: 72px;
    padding: 0 18px;
    border-bottom: 1px solid #e6e6e6;
}
.cart-title{
    position: absolute;
    overflow: hidden;
    color: black;
    font-size: 18px;
    height: 72px;
    font-weight: 600;
    line-height: 72px;
    left: 18px;
}
.cart-main{
    min-height: 210px;
}
.cart-sum{
    position: absolute;
    right: 18px;
    top: 0;
    height: 72px;
    line-height: 72px;
    font-size: 14px;
}
.selected-text{
    position: relative;
    top: -2px;
}
.totalPrice{
    font-weight: 400;
    margin-right: 12px;
    font-size: 22px;
    color: red;
}
.submit-btn{
    display: inline-block;
    // width: 74px;
    // height: 42px;
    // line-height: 42px;
    color: white;
    background-color: orangered;
    border-radius: 20px;
    // text-align: center;
    cursor: pointer;
    // position: relative;
    // top: -2px;
    font-size: 16px;
}
</style>