<template>
    <el-container>
        <el-footer>
                <div style="font-size: 14px;">
                    <div style="width: 80%; margin: 0 auto; margin-bottom: 30px;">
                        <div style="display: flex;">
                            <div style="flex: 1;">
                                <div class="foot-title">找到我</div>
                                <div class="foot-item" onclick="window.open('http://kan1as.com/')">个人网站</div>
                                <div class="foot-item" onclick="window.open('https://github.com/Kan1aSorata')">Github</div>
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