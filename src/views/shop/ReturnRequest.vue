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


// //1已下单 2已发货 3已完成 4退货中 5完成退货
// http://49.232.81.174:8080/commodity/getOrderList 两个参数 shop=localstorage.getItem(‘userId’) status=4 获取退货清单

// http://49.232.81.174:8080/commodity/setOrderList 两个参数 orderId status=5 退货成功 拒绝退货的status=3

// 注意：举个例子 你会拿到这样的数据
// {
//     "status": 100,
//     "message": "操作成功",
//     "data": [
//         {
//             "orderId": "3fd24bc19fa44d3ba142c9112b1a0c2b",
//             "id": "789456",
//             "sku": "c15deba7193c4dee9fcbaa5d1990fc2c",
//             "count": 1,
//             "price": 1,
//             "payment": 0,
//             "purchaseTime": "2022-06-24T00:00:00.000+00:00",
//             "status": 1,
//             "shop": "789456",
//             "picture": "http://49.232.81.174:8080/pic/2207b049486348a9b28e71c7be1ef1d5.jpg"
//         }
//     ],
//     "timestamp": 1656095501932
// }

// 你会通过this.param = res.data['data']来获取到的是
// [
//         {
//             "orderId": "3fd24bc19fa44d3ba142c9112b1a0c2b",
//             "id": "789456",
//             "sku": "c15deba7193c4dee9fcbaa5d1990fc2c",
//             "count": 1,
//             "price": 1,
//             "payment": 0,
//             "purchaseTime": "2022-06-24T00:00:00.000+00:00",
//             "status": 1,
//             "shop": "789456",
//             "picture": "http://49.232.81.174:8080/pic/2207b049486348a9b28e71c7be1ef1d5.jpg"
//         }
//     ]

//     比如你要用到订单号 一定注意键值对对应 param['orderId']也可以param.orderId <-这个应该可以 我忘记了