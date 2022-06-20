<template>
    <div class="myComments">
        <h3>我发出的评价</h3>
        <el-divider></el-divider>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品" width="500">
                <template slot-scope="scope">
                    <img :src="scope.row.productImg" alt="" width="100px" height="100px">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="卖家" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.shop}}</span>
                </template>
            </el-table-column>
            <el-table-column label="我的评价" width="400">
                <template slot-scope="scope">
                    <span>{{scope.row.mycomment}}</span>
                    <br>
                    <span style="color: #999;">{{scope.row.commentTime}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'myComments',
    data() {
        return {
            tableData: []
        }
    },
    created(){
        this.getComments();
    },
    methods: {
        getComments(){
            this.dataLoading = true;
            import('@/mock/myComments.json').then((res) => {
                this.tableData = res.data;
                this.dataLoading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>