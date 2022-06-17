<template>
    <div class="myCart">
        <h3>购物车</h3>
        <el-divider></el-divider>
        <el-table ref="cart" :data="tableData" style="width: 100%" @select="beSelected" @selection-change="handleSelectionChange">
            <el-table-column type="selection" label="选择" width="55">
            </el-table-column>
            <el-table-column label="商品" width="400">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.goods_info" :key="item">{{item}}</div>
                </template>
                <!-- <template slot-scope="scope">{{scope.row.goods_info}}</template> -->
                <!-- <template>
                    <div class="goods_img">
                        <img :src="goods_img">
                    </div>
                    <div class="goods_info">
                        <p>{{goods_name}}</p>
                        <ul>
                            <li>{{goods_specification}}</li>
                        </ul>
                    </div>
                </template> -->
                
            </el-table-column>
            <el-table-column prop="goods_price" label="单价（元）" width="120">
            </el-table-column>
            <el-table-column label="数量" width="200">
                <template slot-scope="scope">
                    <el-input-number size="small" v-model="num" @change="handleChange(scope.$index, scope.row)" :min="1" :max="999"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额（元）" width="120">
                <template>{{sum}}</template>
            </el-table-column>
        </el-table>
        <div>
            <el-row>
                <el-col span="3">
                    <el-button type="text" style="color: red" @click="deleteGoods(selectedGoods)">删除</el-button>
                </el-col>
                <el-col span="15">
                    <span>合计：</span>
                </el-col>
                <el-col span="17">
                    <el-button type="primary">立即结算</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            num: undefined,
            selectedGoods: [], //被选中的商品
            selectedIds: [],
            tableData:[
                {
                    // goods_img: '../assets/img/product1.png',
                    // goods_name: '123',
                    // goods_specification: '456',
                    //goods_num: 1,
                    goods_price: '100.00',
                    amount: "",
                    //select: false,
                }
            ],
            goods_info:[{
                        goods_img: '2333',
                        goods_name: '',
                        goods_specification: '',
                    }],
        };
    },
    computed: {
        sum: function(){
            return this.num * this.goods_price;
        },
        totalSum: function(){
            var totalPrice = 0;
            if(this.beSelected){
                for(var i = 0; i < rows.length; i++){
                    totalPrice += row.sum;
                }
                return totalPrice.toFixed(2);
            }
        }
    },
    methods: {
        handleChange(i, r){
            this.$set(this.curcustiomers, i, r);
            //console.log(value);
        },
        handleSelectionChange(val){
            this.selectedGoods = val;
        },
        // deleteGoods(index, rows){
        //     rows.splice(index, 1);
        // },
        beSelected(rows, row){
            let selected = rows.length && rows.indexOf(row) !== -1;
            console.log(selected);
        },
        deleteGoods(rows){
            var _this = this;
            _this.$confirm('是否删除？', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rows.forEach(element => {
                    _this.selectedIds.push()
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>