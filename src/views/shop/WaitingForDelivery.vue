<template>
    <div class="shipped">
        <h3>待发货订单</h3>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品" width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.picture" alt="" width="100px" height="100px">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="买家" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="交易状态" width="130">
                <template>
                    <span>{{scope.row.tradingStatus}}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                    <el-button size="small" @click="confirmSend(scope.row, 2)">确定发货</el-button>
                    <el-button size="small" type="danger" @click="confirmSend(scope.row, 0)">拒绝发货</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'shipped',
    data(){
        return {
            tableData: [],
        }
    },
    created() {
        this.getOrderList()
    },
    methods: {
        getOrderList(){
            var url = 'http://49.232.81.174:8080/commodity/getOrderList'
            this.axios.get(url, {
                params: {
                    shop: localStorage.getItem('userId'),
                    status: 1
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    this.tableData = res.data['data']
                }
            })
        },
        confirmSend(row, result){
            console.log(row)
            var url = 'http://49.232.81.174:8080/commodity/setOrderList'
            this.axios.get(url, {
                params: {
                    orderId: row.orderId,
                    status: result
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    console.log(res.data['data'])
                    location.reload()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>