<template>
    <div class="goods">
        <el-card class="goodsList" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>商品列表</span>
            <el-button class="btn-add" size="mini" @click="gotoLink()">添加</el-button>
        </el-card>
        <div class="goodsTable">
            <el-table ref="productTable" :data="list" style="width: 100%" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="sku" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sku}}</template>
                </el-table-column>
                <el-table-column label="商品图片" width="120" align="center">
                    <template slot-scope="scope"><img style="height: 80px" :src="scope.row.picture"></template>
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="价格" width="120" align="center">
                    <template slot-scope="scope">
                        <p>￥{{scope.row.price}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="库存" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.stock}}</template>
                </el-table-column>
                <el-table-column label="销量" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sales}}</template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="">
                        <p>
                            <el-button size="mime">查看</el-button>
                            <el-button type="danger" size="mime">下架</el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { result } from 'lodash'
import AddProduct from './AddProduct.vue'
export default {
    name: 'goodsList',
    components: {AddProduct},
    data(){
        return {
            list: null
        }
    },
    methods: {
        gotoLink(){
            this.$router.replace('/addProduct')
        },
        getCommodityList() {
            var url = "http://49.232.81.174:8080/commodity/listAll"
            this.axios.get(url).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.list = result.data['data']
                    this.reload()
                }
            })
        }
    },
    mounted: function() {
        var url = "http://49.232.81.174:8080/commodity/listAll"
        this.axios.get(url).then(result => {
            if (result.data['message'] == '操作成功') {
                this.list = result.data['data']
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>