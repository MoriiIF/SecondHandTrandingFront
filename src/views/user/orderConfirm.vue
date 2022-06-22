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
                <el-table ref="orderTable" :v-model="productInOrder" :data="productInOrder" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="商品" width="100">
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
                    <el-table-column label="小计" width="170">
                        <template slot-scope="scope">
                            <span style="color: red;">￥ {{(scope.row.price * scope.row.count).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderConfirm',
    data(){
        return {
            addressList: ['地址一', '地址二', '地址三'],
            productInOrder:[],
        }
    },
    created(){
        this.getOrder();
    },
    methods: {
        getOrder(){
            let _this = this;
            _this.productInOrder = this.$route.params.productPass;
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
</style>