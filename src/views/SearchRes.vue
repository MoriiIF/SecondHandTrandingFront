<template>
    <div class="searchRes">
        <el-container>
            <el-header>
                <top></top>
            </el-header>
            <el-main>
                <div class="list-control">
                    <div class="list-order">
                        <span>排序：</span>
                    </div>
                </div>
                <div class="case">
                    <product-showcase class="pr" v-for="item in searchResult" :p="item" :key="item.sku"></product-showcase>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import convertShapeToPath from 'vue-svg-icon/lib/convertShapeToPath'
import Top from './page/top.vue'
import ProductShowcase from './ProductShowcase.vue'
export default {
  components: { Top, ProductShowcase },
    name: 'searchRes',
    data() {
        return {
            list: [],
            searchResult: [],
            keyword: '',
        }
    },
    created() {
        this.searchResult = this.$route.query.params
        this.keyword = this.$route.query.search
        console.log(this.searchResult)
        console.log(this.keyword)
    },
    mounted(){
        // var url = "http://49.232.81.174:8080/commodity/listAll"
        // this.axios.get(url).then(result => {
        //     if (result.data['message'] == '操作成功') {
        //         this.list = result.data['data']
        //     }
        // })
        this.getCommodityList()
    },
    methods: {
        getCommodityList() {
            var url = "http://49.232.81.174:8080/commodity/listAll"
            this.axios.get(url).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.list = result.data['data']
                    this.reload()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.case{
    margin-left: -10px;

}
.pr{
    width: 25%;
    float: left;
    padding-left: 13px;
    box-sizing: border-box;
    margin-bottom: 50px;
}
</style>