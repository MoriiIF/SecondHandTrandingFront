<template>
    <div class="orderList">
        <h3>订单列表</h3>
        <el-divider></el-divider>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品" width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.picture" alt="" width="100px" height="100px">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="卖家" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.shop}}</span>
                </template>
            </el-table-column>
            <el-table-column label="单价" width="100">
                <template slot-scope="scope">
                    <span>￥ {{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label="数量" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.count}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="商品操作" width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="applyForReturn(scope.$index, scope.row)" v-if="clickReturn" >{{scope.row.productOperationMessage}}</el-button>
                    <span v-show="flag">{{scope.row.productOperationMessage}}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="实付款" width="100">
                <template slot-scope="scope">
                    <span>￥ {{scope.row.price * scope.row.count}}</span>
                </template>
            </el-table-column>
            <el-table-column label="交易状态" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">已下单</span>
                    <span v-else-if="scope.row.status == 2">已下单</span>
                    <span v-else-if="scope.row.status == 3">已下单</span>
                    <span v-else-if="scope.row.status == 4">已下单</span>
                    <span v-else-if="scope.row.status == 5">已下单</span>
                    <span v-else>订单出错</span>
                </template>
            </el-table-column>
            <el-table-column label="交易操作" width="100">
                <template slot-scope="scope">
                    <el-button size="small" @click="goto(scope.row)" v-if="scope.row.status === 3">评价</el-button>
                    <el-button type="danger" size="small" @click="confirmReceive(scope.row)" v-else-if="scope.row.status === 2" >确认收货</el-button>
                    <el-button type="danger" size="small" @click="applyForReturn(scope.row)" v-else-if="scope.row.status === 3" >申请退货</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'orderList',
    data(){
        return {
            userId: localStorage.getItem('userId'),
            tableData: [],
            clickReturn: true,
            flag: false,
        }
    },
    created(){
        this.getOrder();
    },
    methods: {
        applyForReturn(row){
            this.$confirm('是否申请退货？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.get("http://49.232.81.174:8080/commodity/setOrderList",{
               params: {
                    orderId: row.orderId,
                    status: 4
               }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    console.log(result.data)
                }
            })
            })
        },
        confirmReceive(row){
            this.axios.get("http://49.232.81.174:8080/commodity/setOrderList",{
               params: {
                    orderId: row.orderId,
                    status: 3
               }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    console.log(result.data)
                }
            })
            // this.$router.push('/comment');
        },
        getOrder(){
            this.axios.get("http://49.232.81.174:8080/users/purchaseHistory/",{
               params: {
                    userId: localStorage.getItem('userId')
               }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.tableData = result.data['data']
                }
            })
        },
        
    }
}
</script>

<style lang="scss" scoped>

</style>