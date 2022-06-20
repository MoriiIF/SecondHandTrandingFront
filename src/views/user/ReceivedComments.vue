<template>
    <div class="receivedComments">
        <h3>我收到的评价</h3>
        <el-divider></el-divider>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品" width="500">
                <template slot-scope="scope">
                    <img :src="scope.row.productImg" alt="" width="100px" height="100px">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="评价人（卖家）" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.shop}}</span>
                </template>
            </el-table-column>
            <el-table-column label="收到的评价" width="400">
                <template slot-scope="scope">
                    <span>{{scope.row.receivedcomment}}</span>
                    <br>
                    <span style="color: #999;">{{scope.row.commentTime}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'receivedComments',
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
            import('@/mock/receivedComments.json').then((res) => {
                this.tableData = res.data;
                this.dataLoading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>