<template>
    <div class="searchRes">
        <el-container>
            <el-header>
                <top></top>
            </el-header>
            <el-main>
                <div class="list-control">
                    <div class="list-order">
                        
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Top from './page/top.vue'
export default {
  components: { Top },
    name: 'searchRes',
    data() {
        return {

        }
    },
    mounted(){
        var url = "http://49.232.81.174:8080/commodity/listAll"
        this.axios.get(url).then(result => {
            if (result.data['message'] == '操作成功') {
                this.list = result.data['data']
            }
        })
    },
    methods: {
        getCommodityList() {
            var url = "http://49.232.81.174:8080/commodity/listAll"
            this.axios.get(url).then(result => {
                if (result.data['message'] == '操作成功') {
                    this.list = result.data['data']
                    this.reload()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.list-control .list-order{
    background: #F8F8FF;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0px 1.3px 1.3px blanchedalmond;
}
.list-order-item{
    cursor: pointer;
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
}
.list-order-item.on{
    background: orangered;
    border: 1px solid orangered;
    color: white;
}
.product-not-found{
    text-align: center;
    padding: 32px;
}
</style>