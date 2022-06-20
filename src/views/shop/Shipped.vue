<template>
    <div class="shipped">
        <h3>已发货订单</h3>
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
                    <span>已发货</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" width="150">
                <el-button size="small" v-if="btnAgree" @click="agree">同意</el-button>
                <el-button size="small" type="danger" v-if="btnRefuse" @click="dialogVisible = true">拒绝</el-button>
                <span v-if="waiting">已同意，等待买家处理</span>
                <span v-if="reject">已驳回申请</span>
            </el-table-column> -->
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
    }
}
</script>

<style lang="scss" scoped>

</style>