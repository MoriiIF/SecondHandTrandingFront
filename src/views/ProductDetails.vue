<template>
    <div class="productDetails">
        <el-container>
            <el-header style="background: #3e3e3e; font-size: 14px; height: 30px">
                <div style="width: 60%; height: 30px; margin: 0 auto; display: flex;">
                    <div style="text-align: left; display: flex; flex: 1;">
                        <div class="active">校园二手交易平台</div>
                    </div>
                    <div style="width: 258px; text-align: right; display: flex;">
                        <div class="active" @click="goLogin()">登录</div>
                        <div class="active" @click="goRegister()">注册</div>
                    </div>
                </div>
            </el-header>

            <el-main>
                <div class="col-md-offset-1 col-md-10">
                    <div class="col-md-6">
                        <div data="1" class="img-big move-img col-md-12">
                            <img id="product-img-1-big" src="../assets/img/productimg1.jpg" class="img-responsive" />
                        </div>
                        <div data="2" class="img-big move-img col-md-12">
                            <img id="product-img-2-big" src="../assets/img/productimg2.png" class="img-responsive" />
                        </div>
                        <div data="3" class="img-big move-img col-md-12">
                            <img id="product-img-3-big" src="../assets/img/productimg3.png" class="img-responsive" />
                        </div>
                        <div data="4" class="img-big move-img col-md-12">
                            <img id="product-img-4-big" src="../assets/img/productimg4.png" class="img-responsive" />
                        </div>
                        <div data="5" class="img-big move-img col-md-12">
                            <img id="product-img-5-big" src="../assets/img/productimg5.png" class="img-responsive" />
                        </div>
                    </div>
                </div>
            </el-main>






        </el-container>
    </div>
</template>

<script>
export default{
    data(){
        return {
            search: ''
        }
    },
    methods: {
        goLogin(){
            this.$router.replace('/login')
        },
        goRegister(){
            this.$router.replace('/register')
        },
    }

}
</script>


<style lang="scss" scoped>
.el-header{
    background-color: #b3c0d1;
    color: #333;
    //text-align: center;
    height: 30px;
    line-height: 60px;
    justify-content: space-between;
    .active{
        line-height: 40px;
        color: #cfcfcf;
        margin-right: 20px;
        font-size: 12px;
    }
    .active:hover{
        cursor: pointer;
        color: #ffffff;
    }
}
</style>