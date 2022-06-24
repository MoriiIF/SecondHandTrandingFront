<template>
    <div class="homepage">
        <el-container>
            <Top></Top>
            <el-main style="width: 100% font-size: 14px; padding: 20px 0;">
                <div style="background: #ffffff; width: 80%; margin: 0 auto; ">
                    <div style="display: flex; border-radius: 6px;">
                        <div style="display: flex; flex: 1">
                            <div class="title-top">物品1</div>
                            <div class="title-top">物品2</div>
                            <div class="title-top">物品3</div>
                            <div class="title-top">物品4</div>
                            <div class="title-top">物品5</div>
                            <div class="title-top">物品6</div>
                            <div class="title-top">物品7</div>
                            <div class="title-top">物品8</div>
                        </div>
                        <div style="line-height: 50px;">
                            <el-input placeholder="请输入内容" v-model="search">
                                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                            </el-input>
                        </div>
                    </div>

                    <div style="display: flex; margin-top: 20px;">
                        <div style="width: 240px; background-color: #5686BF;">
                            <div class="item">
                                <div class="item-middle">手机</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">图书音像</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">服饰衣物</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">食品饮料</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">个护化妆</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">玩具乐器</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">生活用品</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">文具用品</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">笔记本 平板</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                            <div class="item">
                                <div class="item-middle">其它配件</div>
                                <div class="item-nav"> ＞ </div>
                            </div>
                        </div>

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
                        什么东西
                    </div>
                    <div style="display: flex; height: 400px; margin-top: 20px;">
                        <div class="product" style="width: calc(20% -16px); border-top: 1px solid #5E86C1; background-color: #fafafa;">
                            <div style="text-align: center; height: 7%">
                                <span style="background-color: #5E86C1; color: #FFFFFF; padding: 0 20px;">商品</span>
                            </div>
                            <div style="height: 250px; display: flex; text-align: center;">
                                <img src="../assets/img/product1.png" style="width: 100%" />
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px;">
                                荣耀70 5G系列 8GB+256GB
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px; color: gray;">
                                IMX800三主摄 | 旗舰芯片 | 100W超级快充
                            </div>
                            <div style="text-align: center; line-height: 40px;">
                                <span style="color: red;">2699元</span>
                                <span style="color: gray; text-decoration: line-through;">2999元</span>
                            </div>
                        </div>
                        <div class="product" style="width: calc(20% -16px); border-top: 1px solid #5E86C1; background-color: #fafafa; margin-left: 20px;">
                            <div style="text-align: center; height: 7%">
                                <span style="background-color: #5E86C1; color: #FFFFFF; padding:0 20px;">商品</span>
                            </div>
                            <div style="height: 250px; display: flex; text-align: center;">
                                <img src="../assets/img/product1.png" style="width: 100%" />
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px;">
                                荣耀70 5G系列 8GB+256GB
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px; color: gray;">
                                IMX800三主摄 | 旗舰芯片 | 100W超级快充
                            </div>
                            <div style="text-align: center; line-height: 40px;">
                                <span style="color: red;">2699元</span>
                                <span style="color: gray; text-decoration: line-through;">2999元</span>
                            </div>
                        </div>
                        <div class="product" style="width: calc(20% -16px); border-top: 1px solid #5E86C1; background-color: #fafafa; margin-left: 20px;">
                            <div style="text-align: center; height: 7%">
                                <span style="background-color: #5E86C1; color: #FFFFFF; padding:0 20px;">商品</span>
                            </div>
                            <div style="height: 250px; display: flex; text-align: center;">
                                <img src="../assets/img/product1.png" style="width: 100%" />
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px;">
                                荣耀70 5G系列 8GB+256GB
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px; color: gray;">
                                IMX800三主摄 | 旗舰芯片 | 100W超级快充
                            </div>
                            <div style="text-align: center; line-height: 40px;">
                                <span style="color: red;">2699元</span>
                                <span style="color: gray; text-decoration: line-through;">2999元</span>
                            </div>
                        </div>
                        <div class="product" style="width: calc(20% -16px); border-top: 1px solid #5E86C1; background-color: #fafafa; margin-left: 20px;">
                            <div style="text-align: center; height: 7%">
                                <span style="background-color: #5E86C1; color: #FFFFFF; padding:0 20px;">商品</span>
                            </div>
                            <div style="height: 250px; display: flex; text-align: center;">
                                <img src="../assets/img/product1.png" style="width: 100%" />
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px;">
                                荣耀70 5G系列 8GB+256GB
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px; color: gray;">
                                IMX800三主摄 | 旗舰芯片 | 100W超级快充
                            </div>
                            <div style="text-align: center; line-height: 40px;">
                                <span style="color: red;">2699元</span>
                                <span style="color: gray; text-decoration: line-through;">2999元</span>
                            </div>
                        </div>
                        <div class="product" style="width: calc(20% -16px); border-top: 1px solid #5E86C1; background-color: #fafafa; margin-left: 20px;">
                            <div style="text-align: center; height: 7%">
                                <span style="background-color: #5E86C1; color: #FFFFFF; padding:0 20px;">商品</span>
                            </div>
                            <div style="height: 250px; display: flex; text-align: center;">
                                <img src="../assets/img/product1.png" style="width: 100%" />
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px;">
                                荣耀70 5G系列 8GB+256GB
                            </div>
                            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px; color: gray;">
                                IMX800三主摄 | 旗舰芯片 | 100W超级快充
                            </div>
                            <div style="text-align: center; line-height: 40px;">
                                <span style="color: red;">2699元</span>
                                <span style="color: gray; text-decoration: line-through;">2999元</span>
                            </div>
                        </div>
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
export default{
    components: {Top, Bottom},
    data(){
        return {
            userId: localStorage.getItem('userId'),
            fit: 'cover',
            imgs: [
                'http://49.232.81.174:8080/slide/1.jpg',
                'http://49.232.81.174:8080/slide/2.jpg',
                'http://49.232.81.174:8080/slide/3.jpg',
                'http://49.232.81.174:8080/slide/4.jpg',
                'http://49.232.81.174:8080/slide/5.jpg'
            ],
            search: ''
        }
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
            let s = this.search
            let searchVal = ""
            if(s == ""){
                return;
            }else {
                var url = 'http://49.232.81.174:8080/commodity/searchByName'
                this.axios.get(url,{
                    params: {
                        name: s
                    }
                }).then(res => {
                    if((res.data['message'] == "操作成功") && (res.data['data']['name'] == s)){
                        this.$router.push({path: '/searchRes'})
                    }
                })
            }
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
</style>