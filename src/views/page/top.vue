<template>
    <el-container>
            <el-header style="background: #3e3e3e; font-size: 14px; height: 30px">
                <div style="width: 60%; height: 30px; margin: 0 auto; display: flex;">
                    <div style="text-align: left; display: flex; flex: 1;">
                        <div class="active" @click="goHome">二手商品交易平台</div>
                    </div>
                    <div v-if="userId" style="width: 258px; text-align: right; display: flex;">
                        <div class="active" @click="goCenter">{{userId}}</div>
                        <div class="active" @click="logOut">登出</div>
                    </div>
                    <div v-else style="width: 258px; text-align: right; display: flex;">
                        <div class="active" @click="goLogin()">登录</div>
                        <div class="active" @click="goRegister()">注册</div>
                    </div>
                </div>
            </el-header>
    </el-container>
</template>

<script>
export default{
    data(){
        return {
            userId: localStorage.getItem('userId'),
            userInfo: "",
        }
    },

    methods: {
        goLogin(){
            this.$router.replace('/login')
        },
        goRegister(){
            this.$router.replace('/register')
        },
        goCenter(){
            var url = "http://49.232.81.174:8080/users/getUserInfo"
            this.axios.get(url, {
                params: {
                    id: this.userId,
                }
            }).then(res => {
                if(res.data['message'] == "操作成功"){
                    this.userInfo = res.data['data']
                    if (this.userInfo.admin == true) {
                        this.$router.push('/adminCenter')
                    } else if (this.userInfo.type == 2){
                        this.$router.push('/merchant')
                    } else {
                        this.$router.push('/personalCenter')
                    }
                }
            })
        },
        logOut() {
            localStorage.setItem('userId', '')
            this.$router.push('/login')
        },
        goHome() {
            this.$router.push('/')
        }
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