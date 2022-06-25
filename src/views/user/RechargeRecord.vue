<template>
    <div class="rechargeRecord">
        <el-row>
            <el-col span="2">
                <h3>交易记录</h3>
            </el-col>
        </el-row>
        <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100% text-align: center"
            >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="tradeId" label="交易流水号" width="300"></el-table-column>
            <el-table-column prop="moneyTrade" label="金钱交易" width="100"></el-table-column>
            <el-table-column prop="pointTrade" label="积分交易" width="100"></el-table-column>
            <el-table-column prop="time" label="交易时间" width="300"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default{
    data(){
        return {
            tableData: []
        }
    },
    mounted() {
        this.getTradeRecord()
    },
    methods: {
        getTradeRecord() {
            this.axios.get("http://49.232.81.174:8080/users/getTradeRecord", {
                params: {
                    userId: localStorage.getItem('userId')
                }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.tableData = result.data['data']
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>