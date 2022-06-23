<template>
    <div class="product">
        <el-card :body-style="{padding: '0px'}" shadow="hover">
            <router-link :to="'/productDetails/' + p.sku">
                <img :src="p.picture" class="image">
            </router-link>
            <div style="padding: 14px">
                <div class="info">
                    <span style="color: red; float: left;">￥ {{p.price}}</span>
                    <span style="color: gray; display: inline-block; right: 4px;">销量：{{p.sales}}</span>
                </div>
                <div class="pro-name" style="padding: 10px">
                    <router-link :to="'/productDetails/' + p.sku" style="text-decoration: none;">
                        <span class="name-title" style="color: black;">{{p.name}}</span>
                    </router-link>
                </div>
                <div class="pro-shop">
                    <span style="color: gray; float: left; padding: 5px">卖家：{{p.shop}}</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
            p: Object       //product对象数据
        },
    data() {
        return {
        }
    },
    // mounted(){
    //     var url = "http://49.232.81.174:8080/commodity/listAll"
    //     this.axios.get(url).then(result => {
    //         if (result.data['message'] == '操作成功') {
    //             this.p = result.data['data']
    //         }
    //     })
    // },
    // methods: {
    //     getPro() {
    //         var url = "http://49.232.81.174:8080/commodity/listAll"
    //         this.axios.get(url).then(result => {
    //             if (result.data['message'] == '操作成功') {
    //                 this.p = result.data['data']
    //                 this.reload()
    //             }
    //         })
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.image{
    width: 100%;
    display: block;
}
.name-title:hover{
    color: orangered;
}
</style>