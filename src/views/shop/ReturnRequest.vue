<template>
    <div class="returnRequest">
        <h3>退货申请</h3>
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
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                <el-button size="small" v-if="btnAgree" @click="agree(scope.row)">同意</el-button>
                <el-button size="small" type="danger" v-if="btnRefuse" @click="refuse(scope.row)">拒绝</el-button>
                <span v-if="waiting">已同意，等待买家处理</span>
                <span v-if="reject">已驳回申请</span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="请填写驳回申请的理由" :visible.sync="dialogVisible">
            <el-input type="textarea" :rows="5" placeholder="请输入驳回理由" v-model="reason">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'returnRequest',
    data() {
        return {
            tableData: [],
            btnAgree: true,
            btnRefuse: true,
            waiting: false,
        }
    },
    created() {
        this.getOrderList()
    },
    methods: {
        agree(row){
            this.btnAgree = false;
            this.btnRefuse = false;
            this.waiting = true;
            var url = 'http://49.232.81.174:8080/commodity/setOrderList'
            this.axios.get(url, {
                params: {
                    orderId: row.orderId,
                    status: 5
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    location.reload()
                }
            })
        },
        refuse(row){
            this.btnAgree = false;
            this.btnRefuse = false;
            this.reject = true;
            this.dialogVisible = true;
            var url = 'http://49.232.81.174:8080/commodity/setOrderList'
            this.axios.get(url, {
                params: {
                    orderId: row.orderId,
                    status: 3
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    location.reload()
                }
            })
        },
        getOrderList(){
            console.log('进入页面')
            var url = 'http://49.232.81.174:8080/commodity/getOrderList'
            this.axios.get(url, {
                params: {
                    shop: localStorage.getItem('userId'),
                    status: 4
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    this.tableData = res.data['data']
                    console.log(this.tableData)
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