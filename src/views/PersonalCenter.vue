<template>
    <div class="center">
        <el-container>
            <el-header>
                <Top></Top>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <template>
                        <div class="header-title">
                            <img width="35px" height="35px" src="../assets/logo.png" style="border-radius: 5px">
                            <span style="font-weight: bold">二手商品交易平台</span>
                        </div>
                    </template>
                    <el-menu :default-openeds="['1', '4']" default-active="this.$route.path" router>
                        <el-submenu index="1" style="background-color: #c3d1e3">
                            <template slot="title"><i class="el-icon-message"></i>我的信息</template>
                            <!-- <router-link class="el-menu-item index='1-1'" active-class="active" to="/userInfo">个人信息</router-link> -->
                            <el-menu-item index="/userInfo">个人信息</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2" style="background-color: #c3d1e3">
                            <template slot="title"><i class="el-icon-menu"></i>我的钱包</template>
                            <el-menu-item index="/balance">余额</el-menu-item>
                            <el-menu-item index="/rechargeRecord">交易记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3" style="background-color: #c3d1e3">
                            <template slot="title"><i class="el-icon-setting"></i>我的交易</template>
                            <el-menu-item index="/cart">购物车</el-menu-item>
                            <el-menu-item index="/shoppingRecord">订单列表</el-menu-item>
                        </el-submenu>
                        <!-- <el-submenu index="4" style="background-color: #c3d1e3">
                            <template slot="title"><i class="el-icon-setting"></i>评价管理</template>
                            <el-menu-item index="/myComments">我评价的</el-menu-item>
                            <el-menu-item index="/ReceivedComments">评价我的</el-menu-item>
                        </el-submenu> -->
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                                <el-footer>
                <Bottom></Bottom>
            </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Top from "../views/page/top.vue"
import Bottom from "../views/page/bottom.vue"
export default{
    components: {Top, Bottom},
    data() {
        return{

        }
    },

    methods: {
        goto(path){
            this.$router.push(path);
        }
    }
}
</script>

<style lang="scss" scoped>
.center{
    padding: 0px;
    margin: 0px;
    height: 100%;
}
.header-title{
    padding-left: 10px;
    height: 60px;
    font-weight: 300;
    display: flex;
    font-size: 20px;
    align-items: center;
    cursor: pointer;
    color: black;
    margin-left: 10px;
}
.el-container {
    height: 100%;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    //background-color: #D3DCE6;
    background-color: #F8F8FF;
    color: #333;
    text-align: center;
    line-height: 50px;
    margin-top: 0px;
  }
</style>