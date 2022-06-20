<template>
    <div class="returnRequest">
        <h3>退货申请</h3>
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
                    <span>申请退货</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <el-button size="small" v-if="btnAgree" @click="agree">同意</el-button>
                <el-button size="small" type="danger" v-if="btnRefuse" @click="dialogVisible = true">拒绝</el-button>
                <span v-if="waiting">已同意，等待买家处理</span>
                <span v-if="reject">已驳回申请</span>
            </el-table-column>
        </el-table>
        <el-dialog title="请填写驳回申请的理由" :visible.sync="dialogVisible">
            <el-input type="textarea" :rows="5" placeholder="请输入驳回理由" v-model="reason">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="(dialogVisible = false) && refuse">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default{
    name: 'returnRequest',
    data(){
        return{
            tableData: [],
            btnAgree: true,
            btnRefuse: true,
            waiting: false,
            reject: false,
            reason: '',
            dialogVisible: false,
        }
    },
    created() {
        this.getReturn();
    },
    methods: {
        agree(){
            this.btnAgree = false;
            this.btnRefuse = false;
            this.waiting = true;
        },
        refuse(){
            this.btnAgree = false;
            this.btnRefuse = false;
            this.reject = true;
        },
        getReturn(){
            this.dataLoading = true;
            import('@/mock/returnApplication.json').then((res) => {
                this.tableData = res.data;
                this.dataLoading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>