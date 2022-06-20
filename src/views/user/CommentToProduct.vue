<template>
    <div class="comment">
        <div class="comment-header">
            <h3 class="title">评价商品</h3>
            <div class="merchant">
            卖家：<span>{{someProductInfo.shop}}</span>
            </div>
        </div>
        <div class="comment-main">
            <div class="comment-text">
                <div class="pro-detail">
                    <div class="pro-img">
                        <img :src="someProductInfo.productImg" alt="" width="130px" height="130px">
                    </div>
                    <div class="pro-title">{{someProductInfo.name}}</div>
                </div>
                <div class="msg">
                    <el-input class="comment-msg" type="textarea" :rows="5" placeholder="请输入对该商品的评价" v-model="textarea" maxlength="500"></el-input>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="comment-star">
                <h2 class="star-title">
                    <span>店铺动态评分</span>
                </h2>
                <div class="stars">
                    <!-- <span class="star-one">商品与描述相符 </span> -->
                    <div class="star-one">
                        <label>商品与描述相符 </label>
                        <el-rate class="star-one" v-model="star1" show-text ></el-rate>
                    </div>
                    <div class="star-two">
                    <!-- <span class="star-two">卖家的服务态度 </span> -->
                        <label>卖家的服务态度 </label>
                        <el-rate class="star-two" v-model="star2" show-text></el-rate>
                    </div>
                    <div class="star-three">
                    <!-- <span class="star-three">卖家的发货速度 </span> -->
                        <label>卖家的发货速度 </label>
                        <el-rate class="star-three" v-model="star3" show-text></el-rate>
                    </div>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="submit">
                <el-button type="primary" @click="submitComment()">发表评论</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'comment',
    data(){
        return{
            someProductInfo: [],
            textarea: '',
            star1: null,
            star2: null,
            star3: null

        }
    },
    created() {
        this.getOrder();
    },
    methods: {
        getOrder(){
            this.dataLoading = true;
            import('@/mock/order.json').then((res) => {
                this.someProductInfo = res.data;
                this.dataLoading = false;
            });
        },
        submitComment(){

        }
    }
}
</script>

<style lang="scss" scoped>
.comment-header{
    background: #efefef;
    border-bottom: 2px solid orangered;
    position: relative;
    vertical-align: middle;
    line-height: 35px;
    z-index: 1;
}
.title{
    float: left;
    background: orangered;
    padding: 0 2.4em;
    margin: 0 .4em 0 0;
    min-width: 4em;
    text-align: center;
    color: white;
    font-size: 1.4em;
    font-weight: 300;
}
.merchant{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    float: left;
    margin-left: 2em;
}
.comment-text{
    padding-top: 20px;
    padding-bottom: 70px;
    clear: both;
}
.pro-detail{
    margin-left: 100px;
    width: 130px;
    color: #999;
    float: left;
    position: relative;
}
.pro-img{
    display: block;
    background: #f2f2f2;
    border: 1px solid #e6e6e6;
    width: 128px;
    height: 130px;
    line-height: 127px;
    text-align: center;
    overflow: hidden;
}
.pro-title{
    height: 18px;
    line-height: 18px;
    overflow: hidden;
    margin-top: 5px;
    width: 123px;
    word-wrap: break-word;
    word-break: break-all;
}
.msg{
    width: 190px;
    margin-left: 300px;
}
.comment-msg{
    padding: 8px;
    right: 5;
    width: 544px;
    //border: 1px solid #ccc;
    //height: 110px;
    outline: 0;
    display: block;
    resize: vertical;
}
.comment-star{
    position: relative;
    padding: 40px 0 40px 264px;
}
.star-title{
    padding: 15px 0;
    color: #999;
    background: #f3f3f3;
    width: 130px;
    line-height: 48px;
    text-align: center;
    position: absolute;
    left: 98px;
    top: 65px;
    font-size: 100%;
}
.stars{
    padding: 20px;
}
.star-one,
.star-two,
.star-three{
    display: inline-block;
}

</style>