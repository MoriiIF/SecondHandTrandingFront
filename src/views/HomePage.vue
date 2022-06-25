<template>
    <div class="homepage">
        <el-container>
            <Top></Top>
            <el-main style="width: 100% font-size: 14px; padding: 20px 0;">
                <div style="background: #ffffff; width: 80%; margin: 0 auto; ">
                    <div style="display: flex; border-radius: 6px;">
                        <div style="display: flex; flex: 1">
                            <el-button type="text" @click="getCategoryList('数码')">数码</el-button>
                            <el-button type="text" @click="getCategoryList('生活')">生活</el-button>
                            <el-button type="text" @click="getCategoryList('家用电器')">家用电器</el-button>
                            <el-button type="text" @click="getCategoryList('男/女装')">男/女装</el-button>
                            <el-button type="text" @click="getCategoryList('食品')">食品</el-button>
                            <el-button type="text" @click="getCategoryList('医药保健')">医药保健</el-button>
                            <el-button type="text" @click="getCategoryList('图书')">图书</el-button>
                        </div>
                        <div style="line-height: 50px;">
                            <el-input placeholder="请输入内容" v-model="search">
                                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <div style="display: flex; margin-top: 20px;">
                        <div style="flex: 1;">
                            <el-carousel style="height: 100%">
                                <el-carousel-item v-for="url in imgs" :key="url">
                                    <el-image
                                        style="width: 100%; height: 100%;"
                                        :src="url"
                                        :fit="fit">
                                    </el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>

                <div style="background-color: #eeeeee; width: 80%; margin: 0 auto;">
                    <div style="height: 50px; line-height: 50px; margin-top: 50px; font-size: 25px; color: gray; float:">
                        在售商品
                    </div>

                    <div class="case" v-if="isReloadData">
                    <product-showcase class="pr" v-for="item in searchResult" :p="item" :key="item.sku"></product-showcase>
                    </div>
                </div>
            </el-main>

            <el-footer>
                <Bottom></Bottom>
            </el-footer>
            
        </el-container>
    </div>
    
</template>

<script>
import Top from "./page/top.vue"
import Bottom from "./page/bottom.vue"
import ProductShowcase from './ProductShowcase.vue'
export default{
    components: {Top, Bottom, ProductShowcase},
    data(){
        return {
            searchResult: [],
            isReloadData: true,
            userId: localStorage.getItem('userId'),
            fit: 'cover',
            imgs: [
                'http://49.232.81.174:8080/slide/1.jpg',
                'http://49.232.81.174:8080/slide/2.jpg',
                'http://49.232.81.174:8080/slide/3.jpg',
                'http://49.232.81.174:8080/slide/4.jpg',
                'http://49.232.81.174:8080/slide/5.jpg'
            ],
            search: '',
            category: 1
        }
    },
    mounted() {
        this.getCommodityList()
    },
    methods: {
        handleSizeChange(val){
            console.log('每页${val}条');
        },
        handleCurrentChange(val){
            console.log('当前页:${val}');
        },
        handleClick(tab, event){
            console.log(tab, event);
        },
        searchBtn(){
            var s = this.search
            if(s == ""){
                return;
            }else {
                var url = 'http://49.232.81.174:8080/commodity/searchByName'
                this.axios.get(url,{
                    params: {
                        name: s,
                        sort: 0,
                    }
                }).then(res => {
                    if(res.data['message'] == "操作成功"){
                        console.log(res.data)
                        this.$router.push({
                            path: '/searchRes',
                            query: {
                                search: this.search,
                                params: res.data['data'],
                                sort: 0
                            }
                        })
                    }
                })
            }
        },
        getCommodityList() {
            var url = "http://49.232.81.174:8080/commodity/listAll"
            this.axios.get(url, {
                params: {
                    sort: 0
                }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.searchResult = result.data['data']
                }
            })
        },
        getCategoryList(category) {
            var url = "http://49.232.81.174:8080/commodity/searchCommodityByCategory"
            this.axios.get(url, {
                params: {
                    category: category,
                    sort: 0
                }
            }).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.searchResult = result.data['data']
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.el-main{
    background-color: white;
    color: #333;
    width: 100%;
    //text-align: center;
    line-height: 160px;
    .title-top{
        cursor: pointer;
        font-size: 16px;
        line-height: 50px;
        color: #8a8a8a;
        margin-left: 20px;
    }
    .title-top:hover{
        color: orangered;
    }
    .item{
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        padding: 0 0 0 20px;
        color: #ffffff;
        display: flex;
    }
    .item:hover{
        background-color: #004D99;
    }
    .item-middle{
        flex: 1;
    }
    .item-nav{
        width: 10px;
        margin-right: 20px;
    }
    .el-carousel_container{
        height: 500px;
    }
    .product{
        //vertical-align: top;
        line-height: 110%;
        transition: transform 2s ease 1s;
    }
    .product:hover{
        cursor: pointer;
        margin-top: -10px;
    }
    .more:hover{
        cursor: pointer;
        color: orangered;
    }
    img{
        cursor: pointer;
    }
}
.homepage{
    padding: 0px;
    margin: 0px;
    height: 100%;
}
.el-container{
    height: 100%;
    //margin-bottom: 40px;
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