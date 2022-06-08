<template>
    <el-container>
        <el-footer>
                <div style="font-size: 14px;">
                    <div style="width: 80%; margin: 0 auto; margin-bottom: 30px;">
                        <div style="display: flex;">
                            <div style="flex: 1;">
                                <div class="foot-title">帮助中心</div>
                                <div class="foot-item">账户管理</div>
                                <div class="foot-item">购物指南</div>
                                <div class="foot-item">订单操作</div>
                            </div>
                            <div style="flex: 1;">
                                <div class="foot-title">服务支持</div>
                                <div class="foot-item">账户管理</div>
                                <div class="foot-item">购物指南</div>
                                <div class="foot-item">订单操作</div>
                            </div>
                            <div style="flex: 1;">
                                <div class="foot-title">线下门店</div>
                                <div class="foot-item">账户管理</div>
                                <div class="foot-item">购物指南</div>
                                <div class="foot-item">订单操作</div>
                            </div>
                            <div style="flex: 1;">
                                <div class="foot-title">关于平台</div>
                                <div class="foot-item">账户管理</div>
                                <div class="foot-item">购物指南</div>
                                <div class="foot-item">订单操作</div>
                            </div>
                                <div style="flex: 1;">
                                <div class="foot-title">关于我们</div>
                                <div class="foot-item">账户管理</div>
                                <div class="foot-item">购物指南</div>
                                <div class="foot-item">订单操作</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-footer>
    </el-container>
</template>

<script>

</script>

<style lang="scss" scoped>
.el-footer{
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
    .foot-title{
        height: 40px;
        line-height: 40px;
    }
    .foot-item{
        height: 25px;
        line-height: 25px;
        color: gray;
    }
    .foot-item:hover{
        cursor: pointer;
        color: orangered;
    }
}
</style>