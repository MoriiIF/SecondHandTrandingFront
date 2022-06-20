<template>
    <div class="product">
        <div class="product" style="width: calc(20% -16px); background-color: #fafafa;">
            <div style="height: 250px; display: flex; text-align: center;">
                <router-link :to="'/product/' + info.id" class="product-main">
                    <img :src="info.image" style="width: 100%" />
                </router-link>
            </div>
            <div style="text-align: center; line-height: 40px;">
                <span style="color: red;">￥{{info.price}}</span>
                <span style="color: gray;">销量：{{info.sales}}</span>
            </div>
            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px;">
                {{info.name}}
            </div>
            <div style="text-align: center; text-overflow: ellipsis; line-height: 25px; color: gray;">
                {{info.shop}}
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        info: Object
    },
    data() {
        return {
            proForm: {
                id: '',
                image: '',
                name: '',
                price: '',
                sales: '',
                shop: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>