<template>
    <div class="shipped">
        <h3>已发货订单</h3>
        <el-table :data="tableData" style="width: 100%">
        <el-table-column label="订单号" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.orderId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品图片" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.picture" alt="" width="100px" height="100px">
                </template>
            </el-table-column>
            <el-table-column label="商品sku" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.sku}}</span>
                </template>
            </el-table-column>
            <el-table-column label="数量" width="50">
                <template slot-scope="scope">
                    <span>{{scope.row.count}}</span>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="50">
                <template slot-scope="scope">
                    <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label="买家" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column label="购买时间" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.purchaseTime}}</span>
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
    mounted() {
        this.getOrderList()
    },
    methods: {
        getOrderList(){
            var url = 'http://49.232.81.174:8080/commodity/getOrderList'
            this.axios.get(url, {
                params: {
                    shop: localStorage.getItem('userId'),
                    status: 2
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    this.tableData = res.data['data']
                }
            })
        },
        setOrderList(){
            var url = 'http://49.232.81.174:8080/commodity/setOrderList'
            this.axios.get(url, {
                params: {
                    orderId: this.orderId,
                    status: 2
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