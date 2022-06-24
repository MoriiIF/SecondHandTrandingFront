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
                        <span class="list-order-item" @click="defaultSort">默认</span>
                        <span class="list-order-item" @click="priceSort">价格</span>
                        <span class="list-order-item" @click="scoreSort">评分</span>
                        <span class="list-order-item" @click="salesSort">销量</span>
                    </div>
                </div>
                <div class="case" v-if="isReloadData">
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
            sort: 0,
            isReloadData: true,
            priceBtnVal: 1,
            scoreBtnVal: 3,
            salesBtnVal: 5
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
        // this.getCommodityList()
    },
    methods: {
        reload() {
            this.isReloadData = false
            this.$nextTick(() => {
                this.isReloadData = true
            })
        },
        getSortedCommodityList() {
            console.log(this.sort)
            var url = "http://49.232.81.174:8080/commodity/searchByName"
            this.axios.get(url, {
                params: {
                    name: this.keyword,
                    sort: this.sort
                }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.searchResult = result.data['data']
                    this.reload()
                }
            })
        },
        getSort(){
            var _this = this
            _this.sort = this.$route.query.sort;
        },
        defaultSort(){
            var so = this.sort
            if(so !== 0){
                this.sort = 0;
                this.getSortedCommodityList()
            }
        },
        priceSort(){
            var so = this.sort
            if (so !== 1){
                this.sort = 1;
                this.getSortedCommodityList()
            }else if(so == 1){
                this.sort = 2
                this.getSortedCommodityList()
            }else if(so == 2){
                this.sort = 1
                this.getSortedCommodityList()
            }
            
        },
        scoreSort(){
            var so = this.sort
            if (so !== 3){
                this.sort = 3;
                this.getSortedCommodityList()
            }else if(so == 4){
                this.sort = 3
                this.getSortedCommodityList()
            }else if(so == 3){
                this.sort = 4
                this.getSortedCommodityList()
            }
        },
        salesSort(){
            var so = this.sort
            if (so !== 5){
                this.sort = 5;
                this.getSortedCommodityList()
            }else if(so == 5){
                this.sort = 6
                this.getSortedCommodityList()
            }else if(so == 6){
                this.sort = 5
                this.getSortedCommodityList()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list-control{
    background: #F0F8FF;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0px 1.3px 1.3px #d0e7fb;
}
.list-order-item{
    cursor: pointer;
    display: inline-block;
    border: 1px solid #d0e7fb;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
}
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