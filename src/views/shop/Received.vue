<template>
    <div class="received">
        <h3>买家已收货订单</h3>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品" width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.productImg" alt="" width="100px" height="100px">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="买家" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.buyer}}</span>
                </template>
            </el-table-column>
            <el-table-column label="买家ID" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.buyerID}}</span>
                </template>
            </el-table-column>
            <el-table-column label="交易状态" width="130">
                <template>
                    <!-- <span>{{scope.row.tradingStatus}}</span> -->
                    <span>买家已收货</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="130">
                <el-button size="small">评价</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'received',
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        getOrderList(){
            var url = 'http://49.232.81.174:8080/commodity/getOrderList'
            this.axios.get(url, {
                params: {
                    shop: this.shop,
                    status: this.tradingStatus
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    this.$router.push({
                        name: 'shoppingRecord',
                        params:{products: this.productInOrder}
                    })
                }
            })
        },
        setOrderList(){
            var url = 'http://49.232.81.174:8080/commodity/setOrderList'
            this.axios.get(url, {
                params: {
                    orderId: this.orderId,
                    status: 3
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    this.$router.push({
                        name: 'shipped',
                        params: {proShipped: this.productInOrder}
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>