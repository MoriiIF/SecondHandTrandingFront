<template>
    <div class="productDetails">
        <el-container>
            <el-header>
                <top></top>
            </el-header>
            <el-main>
                <div class="attribute" style="display: flex;">
                    <div class="details-img" style="flex: 1; min-width: 0">
                        <div class="pro-img">
                            <img :src="attributes.productImg" alt="" width="350px" height="350px">
                        </div>
                    </div>
                    <div class="details-text" style="flex: 1; min-width: 0">
                        <div class="details-head">
                            <h4 class="title">{{attributes.name}}</h4>
                            <p class="shopName">{{attributes.shop}}</p>
                        </div>
                        <div class="details-price">
                            <dl class="price-panel">
                                <dt class="price-title">价 格</dt>
                                <dd>
                                    <span class="price">￥ {{attributes.price}}</span>
                                </dd>
                            </dl>
                        </div>
                        <div class="details-sales">
                            <span class="sales">销量 {{attributes.sales}}件</span>
                        </div>
                        <div class="details-sku">
                            <dl class="sku">
                                <dt class="sku-title">商品介绍</dt>
                                <dd style="width: 420px; float: left;">
                                    <p class="description">{{attributes.description}}</p>
                                </dd>
                            </dl>
                            <br><br><br><br><br><br><br><br>
                            <dl class="sku">
                                <dt class="sku-title">数量</dt>
                                <dd style="width: 420px; float: left;">
                                    <el-input-number v-model="num" controls-position="right" :min="1" :max="99"></el-input-number>
                                    <span style="display: inline;"> 有货</span>
                                </dd>
                            </dl>
                            <div class="btn">
                                <el-button type="danger" plain>立即购买</el-button>
                                <el-button type="danger">加入购物车</el-button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Top from './page/top.vue'
export default{
    components: {Top},
    data(){
        return {
            attributes: [],
            num: 1,
            search: '',
            id: null,
            sku: null,
        }
    },
    mounted(){
        this.getProduct();
    },
    methods: {
        // getProduct(){
        //     this.dataLoading = true;
        //     import('@/mock/product.json').then((res) => {
        //         this.attributes = res.data;
        //         this.dataLoading = false;
        //         this.id = parseInt(this.attributes.id);
        //     });
        // },
        getProduct(){
            let _this = this;
            _this.sku = this.$route.params.sku;
            
        }
    }

}
</script>


<style lang="scss" scoped>
.attribute{
    float: left;
    width: 100%;
    justify-content: center;
}
.details-img{
    position: relative;
    display: table;
    table-layout: fixed;
    z-index: 1;
    width: 380px;
    height: 380px;
    margin: 20px auto 0;
}
.pro-img{
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
    border: 0;
}
.details-text{
    //margin: 0 0 0 460px;
    color: #666;
    padding: 0 0 10px;
}
.details-head{
    padding: 20px 10px 12px;
    color: #000;
}
.title{
    font-size: 20px;
    font-weight: 700;
    color: black;
    padding-bottom: .2em;
    line-height: 1;
}
.shopName{
    font-size: 14px;
    font-weight: 550;
    color: #ff0026;
}
.details-price{
    background-color: #e9e9e9;
    position: relative;
    left: 0;
    z-index: 10;
    padding-bottom: 5px;
    padding-top: 5px;
    margin-right: 20px;
}
.price-panel{
    display: block;
    margin: 0;
    padding: 0;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.price-title{
    color: #999;
    font-size: 17px;
    text-align: left;
    float: left;
    width: 69px;
    margin: 0 0 0 8px;
    line-height: 36px;
}
.price{
    line-height: 24px;
    font-size: 25px;
    position: relative;
    vertical-align: middle;
    color: #ff0026;
}
.details-sales{
    border: 1px dotted #c9c9c9;
    border-width: 1px 0;
    margin: -1px 20px 0 0;
    padding: 10px 0;
    position: relative;
    overflow: hidden;
    clear: both;
}
.sales{
    line-height: 16px;
    height: 16px;
    color: #000;
    font-weight: 500;
}
.details-sku{
    padding: 10px 0 12px;
    position: relative;
}
.description{
    border: #c9c9c9 solid 1px;
}
.sku{
    padding-bottom: 6px;
}
.sku-title{
    width: 66px;
    text-align: left;
    float: left;
}
.btn{
    padding-top: 50px;
}
</style>