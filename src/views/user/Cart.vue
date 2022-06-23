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
                    <el-button class="submit-btn" :disabled="selectionProduct == 0 ? true: false" @click="submitCart">结 算</el-button>
                </div>
            </div>
            <div class="cart-main">
                <el-table ref="cartTable" :data="productInCart" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" empty-text="购物车空空如也~">
                    <el-table-column type="selection" width="70">
                    </el-table-column>
                    <el-table-column label="商品信息" width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.productImg" alt="" width="80px" height="80px">
                        </template>
                    </el-table-column>
                    <el-table-column width="300">
                        <template slot-scope="scope">
                            <span style="overflow: hidden;">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="店铺" width="120">
                        <template slot-scope="scope">
                            <span style="overflow: hidden;">{{scope.row.shop}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" width="100">
                        <template slot-scope="scope">
                            <span style="color: black;">￥ {{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="170">
                        <template slot-scope="scope">
                            <el-input-number size="mini" v-model="scope.row.count" :min="1" :max="99"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" width="170">
                        <template slot-scope="scope">
                            <span style="color: red;">￥ {{(scope.row.price * scope.row.count).toFixed(2)}}</span>
                            <!-- <span style="color: red;">￥{{getCost(scope.$row, scope.row.count, scope.row.price)}}</span> -->
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
            selectionProduct: [],
        }
    },
    mounted(){
        // this.getProduct();
        var url = 'http://49.232.81.174:8080/cart/getCartList'
        this.axios.get(url, {params: {
                userId: localStorage.getItem('userId')
            }}).then(res => {
            if(res.data['message'] == '操作成功'){
                this.productInCart = res.data['data']['cartProducts']
                console.log(this.productInCart)
            }
        })
    },
    computed: {
        sum(){
            var price_total = 0;
            for(var i = 0; i < this.selectionProduct.length; i++){
                price_total += parseFloat((this.selectionProduct[i].price * this.selectionProduct[i].count).toFixed(2));
            }
            return price_total;
        }
    },
    watch: {
        
    },
    methods: {
        // getProduct(){
        //     this.dataLoading = true;
        //     import('@/mock/product.json').then((res) => {
        //         this.productInCart = res.data;
        //         this.dataLoading = false;
        //     });
        // },
        getPro(){
            var url = 'http://49.232.81.174:8080/cart/getCartList'
            this.axios.get(url, {params: {
                userId: localStorage.getItem('userId')
            }}).then(res => {
                if(res.data['message'] == '操作成功'){

                    this.productInCart = res.data['data']['cartProducts']
                    this.reload()
                }
            })
        },
        deleteOne(index, rows){
            rows.splice(index, 1);
        },
        // getCost(row, count, price){
        //     row.cost = (count * price).toFixed(2);
        //     return (count * price).toFixed(2);
        // },
        // selectionRow(selection, row){
        //     let selected = selection.length && selection.indexOf(row) !== -1;
        //     if(selected){
        //         this.sum += parseFloat(this.getCost(row.num, row.price));
        //     }else {
        //         this.sum = 0.00;
        //     }
        // },
        handleSelectionChange(val){
            this.selectionProduct = val;
            // var ids = [];
            // this.selNum = val.length;
            // for(var index in val) {
            //     ids.push(val[index].id);
            // }
            // for(var i in this.productInCart){
            //     if(ids.indexOf(thsi.productInCart[i].id) != -1){
            //         this.productInCart[i].selected = 1;
            //     }else {
            //         this.productInCart[i].selected = 0;
            //     }
            // }
        },
        submitCart(){
            console.log(this.selectionProduct);
            this.$router.push({
                name: 'orderConfirm',
                params: {productPass: this.selectionProduct}
            })
            // this.$alert('结算成功，请到订单列表查看详情！', '支付成功', {
            //     confirmButtonText: '确定'
            // });
            // setTimeout(() => {
            //     for(var i = 0; i < this.selectionProduct.length; i++){
            //         this.$router.push({
            //             name: 'orderConfirm',
            //             params: {dataPass: this.selectionProduct[i].index}
            //         })
            //         this.productInCart.splice(this.selectionProduct[i].index, 1);
            //     }
                
            // }, 2000)
            
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