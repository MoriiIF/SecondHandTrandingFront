<template>
    <div class="balance">
        <el-row>
            <el-col span="2">
                <h3>账户余额</h3>
                <span style="display: inline-block">金额{{money}}</span>
                <br>
                <span style="display: inline-block">积分{{point}}</span>
            </el-col>

            <el-form  :model="formInline">
            <el-form-item  label="">
                <el-input v-model="formInline.money" placeholder="请输入充值金额"></el-input>
                <el-button @click="rechargeBalance">充值金额</el-button>
            </el-form-item>
            </el-form>
        </el-row>
    
    </div>
</template>

<script>
export default{
    data(){
        return {
            userId: '',
            money: '',
            point: '',
            formInline: {
                money: ''
            }
        }
    },
    methods: {
        queryBalance() {
            this.userId = localStorage.getItem('userId')
            var url = 'http://49.232.81.174:8080/users/queryBalance'
            this.axios.get(url, {
                params: {
                    'userId': this.userId
                }
            }).then(result => {
                console.log(result)
                if(result.data['message'] == '操作成功') {
                    this.money = result.data['data']['balance']
                    this.point = result.data['data']['point'] 
                }
            })
        },
        rechargeBalance() {
            var url = "http://49.232.81.174:8080/users/rechargeBalance"
            this.axios.get(url, {
                params: {
                    'userId': localStorage.getItem('userId'),
                    'money': this.formInline.money
                }
            }).then(result => {
                if(result.data['message'] == '操作成功') {
                    location.reload()
                }
            })
        }
    },
    mounted() {
        this.queryBalance()
    }
}
</script>

<style lang="scss" scoped>

</style>