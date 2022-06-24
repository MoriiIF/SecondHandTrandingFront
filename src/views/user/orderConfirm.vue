<template>
    <div class="order-confirm">
        <div class="order-address">
            <div class="order-header">
                <h4 class="header-title">确认收货地址</h4>
            </div>
            <div class="address-list">
                <el-radio-group v-model="radio">
                    <el-radio  v-for="address in addressList" :label="address" :key="address">{{address}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="order-info">
            <div class="order-header">
                <h4 class="header-title">确认订单信息</h4>
            </div>
            <div class="order-content">
                <el-table ref="orderTable" :data="productInOrder" tooltip-effect="dark" style="width: 100%" >
                    <el-table-column label="商品" width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.productImg" alt="" width="80px" height="80px">
                        </template>
                    </el-table-column>
                    <el-table-column v-model="productInOrder.name" width="300">
                        <template slot-scope="scope">  
                            <span  style="overflow: hidden;">{{scope.row.name}}</span>
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
                    <el-table-column label="数量" width="150">
                        <template slot-scope="scope">
                            <!-- <el-input-number size="mini" v-model="scope.row.count" :min="1" :max="99" :disabled="true"></el-input-number> -->
                            <span>{{scope.row.count}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="小计" width="170">
                        <template slot-scope="scope">
                            <span style="color: red;">￥ {{(scope.row.cost).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- <div class="total-box">
                <div class="total-info">
                    <span class="pay-title">实付款：</span>
                    <span class="pay-price">￥ {{}}</span>
                </div>
            </div> -->
            <div class="submit-order">
                <div class="wrapper">
                    <!-- <el-button class="go-back" type="text">返回购物车</el-button> -->
                    <el-button class="go-submit" @click="dialogVisible = true">提 交 订 单</el-button>
                </div>
            </div>
            <el-dialog title="支付成功" :visible.sync="dialogVisible" width="30%">
                <span>请到订单列表查看详情吧！</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitOrder">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderConfirm',
    data(){
        return {
            radio: 1,
            addressList: ['地址一', '地址二', '地址三'],
            productInOrder:[],
            dialogVisible: false,
        }
    },
    computed: {
    },
    created(){
        this.getOrder();
    },
    methods: {
        getOrder(){
            let _this = this;
            _this.productInOrder = this.$route.params.productPass;
        },
        submitOrder(){
            this.dialogVisible = false
            for(var i = 0; i < this.productInOrder.length; i++){
                this.axios.post("http://49.232.81.174:8080/users/insertHistory", {
                    id: localStorage.getItem('userId'),
                    sku: this.productInOrder[i].id,
                    price: this.productInOrder[i].price,
                    count: this.productInOrder[i].count,
                    payment: this.productInOrder[i].cost,
                    status: 1,
                    shop: this.productInOrder[i].shop,
                    picture: this.productInOrder[i].productImg,
                }).then(function(response) {
                    console.log(response)
                }).catch(function(error) {
                    console.log(error)
                })
            }
            

            this.$router.push({
                name: 'shoppingRecord',
                params: {products: this.productInOrder}
            })
            
            // this.$alert('请到订单列表查看详情吧！', '支付成功',{
            //     confirmButtonText: '确定'
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
.order-confirm{
    border: 0px solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
}
.order-address{
    margin-bottom: 30px;
    margin-top: 30px;
}
.order-header{
    position: relative;
    margin-bottom: 15px;
    border-bottom: 2px solid #dcdbdb;
}
.header-title{
    position: relative;
    left: -550px;
    line-height: 25px;
    color: black;
    font-weight: 600;
    font-size: 14px;
}
.el-radio-group{
    //float: left;
    position: relative;
    left: -500px;
}
.el-radio{
    display: block;
    margin: 10px 0;
}
.el-radio:hover{
    background-color: rgb(164, 144, 144, 0.5);
}
.total-box{
    text-align: right;
    margin-top: 15px;
    border-top: 1px dotted orangered;
}
.total-info{
    display: inline-block;
    border: 1px solid orangered;
}
.pay-title{
    font-weight: 700;
    font-size: 14px;
    color: black;
}
.pay-price{
    color: orangered;
    font: 700 26px;
}
.submit-order{
    text-align: right;
    margin-top: -1px;
}
.wrapper{
    display: inline-block;
    padding: 0 0 5px 5px;
}
.go-back{
    color: #36c;
    text-decoration: none;
    margin-right: 50px;
    line-height: 34px;
}
.go-submit{
    display: inline-block;
    width: 130px;
    height: 39px;
    position: relative;
    vertical-align: middle;
    line-height: 17px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    background: orangered;
    color: white;
}
</style>