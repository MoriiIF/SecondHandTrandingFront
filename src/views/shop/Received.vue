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
    }
}
</script>

<style lang="scss" scoped>

</style>