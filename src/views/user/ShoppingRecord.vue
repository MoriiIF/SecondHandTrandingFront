<template>
    <div class="orderList">
        <h3>订单列表</h3>
        <el-divider></el-divider>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品" width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.productImg" alt="" width="100px" height="100px">
                    <span>{{scope.row.name}}</span>
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
            <el-table-column label="商品操作" width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="applyForReturn(scope.$index, scope.row)" v-if="clickReturn" >{{scope.row.productOperationMessage}}</el-button>
                    <span v-show="flag">正在退货</span>
                </template>
            </el-table-column>
            <el-table-column label="实付款" width="100">
                <template slot-scope="scope">
                    <span>￥ {{scope.row.cost}}</span>
                </template>
            </el-table-column>
            <el-table-column label="交易状态" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.tradingStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column label="交易操作" width="100">
                <template slot-scope="scope">
                    <el-button>评价</el-button>
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
            tableData: [],
            clickReturn: true,
            flag: false,
            // tableData:[
            //     {
            //         productImg: '',
            //         name: '',
            //         price: '',
            //         count: '',
            //         productOperation: '',
            //         cost: '',
            //         tradingStatus: '',
            //         tradingOperation: '',
            //     }
            // ]
        }
    },
    created(){
        this.getOrder();
    },
    methods: {
        getOrder(){
            this.dataLoading = true;
            import('@/mock/order.json').then((res) => {
                this.tableData = res.data;
                this.dataLoading = false;
            });
        },
        applyForReturn(index, row){
            this.$confirm('是否申请退货？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '已发起退货，等待商家处理...'
                });
                row.tradingStatus = "正在退货";
                //row.productOperationMessage = '正在退货';
                this.clickReturn = false;
                this.flag = true;
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>