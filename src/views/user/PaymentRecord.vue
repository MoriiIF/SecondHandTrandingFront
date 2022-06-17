<template>
    <div class="rechargeRecord">
        <el-row>
            <el-col span="2">
                <h3>支付记录</h3>
            </el-col>
        </el-row>
        
        <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
            <el-table-column prop="date" label="支付日期" sortable width="180" column-key="date" :filter-method="filterHandler">
            </el-table-column>
            <el-table-column prop="usage" label="支付用途" width="150">
            </el-table-column>
            <el-table-column prop="money" label="支付金额" width="100">
            </el-table-column>
            <el-table-column prop="way" label="支付方式" width="100">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default{
    data(){
        return {
            tableData: [
                {
                    date: '2022-04-01',
                    usage: '123456',
                    money: '￥100.00',
                    way: '微信充值'
                },
                {
                    date: '2022-04-05',
                    usage: '78946',
                    money: '￥100.00',
                    way: '支付宝充值'
                }
            ]
        }
    },
    methods: {
        filterHandler(value, row, column){
            const property = column['property'];
            return row[property] === value;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>